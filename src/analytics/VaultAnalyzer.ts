// Vault Analyzer - Core analytics for Obsidian vault

import { App, TFile, TFolder, CachedMetadata } from 'obsidian';
import { 
	VaultStatistics, 
	NoteInfo, 
	TagInfo, 
	DateCount, 
	FileTypeInfo, 
	FolderInfo,
	DashboardSettings
} from '../types';
import {
	countWords,
	formatDateKey,
	median,
	matchesExcludePattern,
	getFileExtension,
	extractTags,
	extractInternalLinks,
	extractExternalLinks
} from '../utils/helpers';

export class VaultAnalyzer {
	private app: App;
	private settings: DashboardSettings;

	constructor(app: App, settings: DashboardSettings) {
		this.app = app;
		this.settings = settings;
	}

	async analyze(): Promise<VaultStatistics> {
		const vault = this.app.vault;
		const metadataCache = this.app.metadataCache;
		
		const allFiles = vault.getFiles();
		const allFolders = vault.getAllLoadedFiles().filter(f => f instanceof TFolder);
		
		// Filter by exclude patterns
		const files = allFiles.filter(f => 
			!matchesExcludePattern(f.path, this.settings.excludePatterns)
		);
		
		const markdownFiles = files.filter(f => f.extension === 'md');
		
		// Initialize statistics
		const stats: VaultStatistics = {
			totalNotes: markdownFiles.length,
			totalFiles: files.length,
			totalFolders: allFolders.length,
			totalWords: 0,
			totalCharacters: 0,
			totalParagraphs: 0,
			averageWordsPerNote: 0,
			medianWordsPerNote: 0,
			longestNote: null,
			shortestNote: null,
			totalInternalLinks: 0,
			totalExternalLinks: 0,
			linkDensity: 0,
			connectivityScore: 0,
			orphanNotes: 0,
			hubNotes: [],
			totalTags: 0,
			uniqueTags: [],
			tagDistribution: [],
			notesWithoutTags: 0,
			notesCreatedThisWeek: 0,
			notesCreatedThisMonth: 0,
			notesCreatedThisYear: 0,
			mostActiveDay: '',
			creationsByDate: [],
			modificationsByDate: [],
			fileTypeDistribution: [],
			folderDistribution: []
		};

		// Analyze markdown files
		const noteInfos: NoteInfo[] = [];
		const wordCounts: number[] = [];
		const allTags: string[] = [];
		const tagCounts: Map<string, number> = new Map();
		const creationDates: Map<string, number> = new Map();
		const modificationDates: Map<string, number> = new Map();
		const incomingLinks: Map<string, number> = new Map();
		const outgoingLinks: Map<string, number> = new Map();
		
		const now = new Date();
		const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
		const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
		const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

		for (const file of markdownFiles) {
			try {
				const content = await vault.cachedRead(file);
				const metadata = metadataCache.getFileCache(file);
				
				// Word count
				const words = countWords(content);
				wordCounts.push(words);
				stats.totalWords += words;
				stats.totalCharacters += content.length;
				
				// Links from metadata cache
				const internalLinks = metadata?.links?.length || 0;
				const embedLinks = metadata?.embeds?.length || 0;
				const externalLinks = extractExternalLinks(content).length;
				
				stats.totalInternalLinks += internalLinks + embedLinks;
				stats.totalExternalLinks += externalLinks;
				
				// Track link connections
				outgoingLinks.set(file.path, internalLinks + embedLinks);
				
				if (metadata?.links) {
					for (const link of metadata.links) {
						const targetPath = link.link;
						incomingLinks.set(targetPath, (incomingLinks.get(targetPath) || 0) + 1);
					}
				}
				
				// Tags
				const fileTags = this.extractTagsFromFile(content, metadata);
				if (fileTags.length === 0) {
					stats.notesWithoutTags++;
				}
				for (const tag of fileTags) {
					allTags.push(tag);
					tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
				}
				
				// Time stats
				const createdAt = file.stat.ctime;
				const modifiedAt = file.stat.mtime;
				const createdDate = new Date(createdAt);
				
				const dateKey = formatDateKey(createdDate);
				creationDates.set(dateKey, (creationDates.get(dateKey) || 0) + 1);
				
				const modDateKey = formatDateKey(new Date(modifiedAt));
				modificationDates.set(modDateKey, (modificationDates.get(modDateKey) || 0) + 1);
				
				if (createdDate >= weekAgo) stats.notesCreatedThisWeek++;
				if (createdDate >= monthAgo) stats.notesCreatedThisMonth++;
				if (createdDate >= yearAgo) stats.notesCreatedThisYear++;
				
				// Note info
				noteInfos.push({
					path: file.path,
					name: file.basename,
					wordCount: words,
					linkCount: internalLinks + embedLinks,
					createdAt,
					modifiedAt
				});
				
			} catch (e) {
				console.error(`Error analyzing file ${file.path}:`, e);
			}
		}

		// Calculate aggregates
		if (noteInfos.length > 0) {
			stats.averageWordsPerNote = Math.round(stats.totalWords / noteInfos.length);
			stats.medianWordsPerNote = Math.round(median(wordCounts));
			
			// Sort by word count
			const sortedByWords = [...noteInfos].sort((a, b) => b.wordCount - a.wordCount);
			stats.longestNote = sortedByWords[0] || null;
			stats.shortestNote = sortedByWords[sortedByWords.length - 1] || null;
			
			// Link density
			stats.linkDensity = parseFloat((stats.totalInternalLinks / noteInfos.length).toFixed(2));
			
			// Hub notes (top 5 by link count)
			const sortedByLinks = [...noteInfos].sort((a, b) => b.linkCount - a.linkCount);
			stats.hubNotes = sortedByLinks.slice(0, 5);
			
			// Orphan notes
			stats.orphanNotes = noteInfos.filter(n => {
				const outgoing = outgoingLinks.get(n.path) || 0;
				const incoming = incomingLinks.get(n.name) || 0;
				return outgoing === 0 && incoming === 0;
			}).length;
			
			// Connectivity score (0-100)
			const notesWithLinks = noteInfos.filter(n => n.linkCount > 0).length;
			stats.connectivityScore = Math.round((notesWithLinks / noteInfos.length) * 100);
		}

		// Tags
		stats.uniqueTags = [...tagCounts.keys()];
		stats.totalTags = allTags.length;
		
		// Tag distribution (top 10)
		const sortedTags = [...tagCounts.entries()]
			.sort((a, b) => b[1] - a[1])
			.slice(0, 10);
		
		stats.tagDistribution = sortedTags.map(([tag, count]) => ({
			tag,
			count,
			percentage: parseFloat(((count / noteInfos.length) * 100).toFixed(1))
		}));

		// Creation dates
		stats.creationsByDate = [...creationDates.entries()]
			.map(([date, count]) => ({ date, count }))
			.sort((a, b) => a.date.localeCompare(b.date));
		
		stats.modificationsByDate = [...modificationDates.entries()]
			.map(([date, count]) => ({ date, count }))
			.sort((a, b) => a.date.localeCompare(b.date));

		// Most active day
		const dayCounts: Map<number, number> = new Map();
		for (const [date] of creationDates) {
			const day = new Date(date).getDay();
			dayCounts.set(day, (dayCounts.get(day) || 0) + 1);
		}
		
		let maxDay = 0;
		let maxCount = 0;
		for (const [day, count] of dayCounts) {
			if (count > maxCount) {
				maxCount = count;
				maxDay = day;
			}
		}
		
		const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		stats.mostActiveDay = dayNames[maxDay];

		// File type distribution
		const extCounts: Map<string, number> = new Map();
		for (const file of files) {
			const ext = getFileExtension(file.name) || 'unknown';
			extCounts.set(ext, (extCounts.get(ext) || 0) + 1);
		}
		
		stats.fileTypeDistribution = [...extCounts.entries()]
			.map(([extension, count]) => ({
				extension,
				count,
				percentage: parseFloat(((count / files.length) * 100).toFixed(1))
			}))
			.sort((a, b) => b.count - a.count);

		// Folder distribution
		const folderCounts: Map<string, number> = new Map();
		for (const file of markdownFiles) {
			const folder = file.parent?.path || '/';
			folderCounts.set(folder, (folderCounts.get(folder) || 0) + 1);
		}
		
		stats.folderDistribution = [...folderCounts.entries()]
			.map(([path, noteCount]) => ({
				path: path || '/',
				noteCount,
				percentage: parseFloat(((noteCount / markdownFiles.length) * 100).toFixed(1))
			}))
			.sort((a, b) => b.noteCount - a.noteCount)
			.slice(0, 10);

		return stats;
	}

	private extractTagsFromFile(content: string, metadata: CachedMetadata | null): string[] {
		const tags: Set<string> = new Set();
		
		// From metadata cache
		if (metadata?.tags) {
			for (const tagCache of metadata.tags) {
				tags.add(tagCache.tag.toLowerCase());
			}
		}
		
		// From frontmatter
		if (metadata?.frontmatter?.tags) {
			const fmTags = metadata.frontmatter.tags;
			if (Array.isArray(fmTags)) {
				for (const tag of fmTags) {
					tags.add(`#${String(tag).toLowerCase()}`);
				}
			} else if (typeof fmTags === 'string') {
				tags.add(`#${fmTags.toLowerCase()}`);
			}
		}
		
		return [...tags];
	}
}
