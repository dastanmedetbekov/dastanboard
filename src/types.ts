// TypeScript type definitions for Vault Dashboard plugin

export interface VaultStatistics {
	// General stats
	totalNotes: number;
	totalFiles: number;
	totalFolders: number;
	totalWords: number;
	totalCharacters: number;
	totalParagraphs: number;
	averageWordsPerNote: number;
	medianWordsPerNote: number;
	longestNote: NoteInfo | null;
	shortestNote: NoteInfo | null;

	// Link stats
	totalInternalLinks: number;
	totalExternalLinks: number;
	linkDensity: number;
	connectivityScore: number;
	orphanNotes: number;
	hubNotes: NoteInfo[];
	
	// Tag stats
	totalTags: number;
	uniqueTags: string[];
	tagDistribution: TagInfo[];
	notesWithoutTags: number;
	
	// Time stats
	notesCreatedThisWeek: number;
	notesCreatedThisMonth: number;
	notesCreatedThisYear: number;
	mostActiveDay: string;
	creationsByDate: DateCount[];
	modificationsByDate: DateCount[];
	
	// File type stats
	fileTypeDistribution: FileTypeInfo[];
	
	// Folder stats
	folderDistribution: FolderInfo[];
}

export interface NoteInfo {
	path: string;
	name: string;
	wordCount: number;
	linkCount: number;
	createdAt: number;
	modifiedAt: number;
}

export interface TagInfo {
	tag: string;
	count: number;
	percentage: number;
}

export interface DateCount {
	date: string;
	count: number;
}

export interface FileTypeInfo {
	extension: string;
	count: number;
	percentage: number;
}

export interface FolderInfo {
	path: string;
	noteCount: number;
	percentage: number;
}

export interface LinkInfo {
	source: string;
	target: string;
	type: 'internal' | 'external';
}

export interface ActivityData {
	date: string;
	level: 0 | 1 | 2 | 3 | 4;
	count: number;
}

export interface DashboardSettings {
	language: 'en' | 'ru';
	timeRange: 'all' | 'year' | 'month' | 'week';
	theme: 'auto' | 'light' | 'dark';
	layout: 'grid' | 'list' | 'compact';
	showGeneralStats: boolean;
	showLinkStats: boolean;
	showTagStats: boolean;
	showTimeStats: boolean;
	showHeatmap: boolean;
	showFileTypes: boolean;
	showFolders: boolean;
	heatmapStyle: 'github' | 'gradient';
	excludePatterns: string[];
	refreshInterval: number;
	heatmapMonths: number;
}

export const DEFAULT_SETTINGS: DashboardSettings = {
	language: 'en',
	timeRange: 'all',
	theme: 'auto',
	layout: 'grid',
	showGeneralStats: true,
	showLinkStats: true,
	showTagStats: true,
	showTimeStats: true,
	showHeatmap: true,
	showFileTypes: true,
	showFolders: true,
	heatmapStyle: 'github',
	excludePatterns: [],
	refreshInterval: 0,
	heatmapMonths: 12,
};
