// Dashboard View - Main Bases View for Vault Statistics

import { App, BasesView, HoverPopover, Keymap } from 'obsidian';
import { VaultStatistics, DashboardSettings } from '../types';
import { Translations, getTranslations } from '../locales';
import { VaultAnalyzer } from '../analytics/VaultAnalyzer';
import { createStatsCard, createStatsCardGrid } from '../components/StatsCard';
import { createHeatmapCalendar } from '../components/HeatmapCalendar';
import { createTagCloud, createTagList } from '../components/TagCloud';
import { 
	createProgressBar, 
	createPieChart, 
	createBarChart,
	createFileTypeDistribution,
	createFolderDistribution,
	createTopNotesList
} from '../components/Charts';
import { formatNumber, formatPercent } from '../utils/helpers';

export const DASHBOARD_VIEW_TYPE = 'vault-dashboard-view';

interface QueryController {
	// Minimal interface for Bases controller
}

export class DashboardView extends BasesView {
	readonly type = DASHBOARD_VIEW_TYPE;
	private containerEl: HTMLElement;
	private settings: DashboardSettings;
	private stats: VaultStatistics | null = null;
	private t: Translations;
	private isLoading = false;
	
	hoverPopover: HoverPopover | null = null;

	constructor(
		controller: QueryController,
		parentEl: HTMLElement,
		app: App,
		settings: DashboardSettings
	) {
		super(controller as any);
		this.settings = settings;
		this.t = getTranslations(settings.language);
		this.containerEl = parentEl.createDiv({ cls: 'vd-dashboard-container' });
		
		// Apply theme class
		this.updateTheme();
	}

	updateSettings(settings: DashboardSettings) {
		this.settings = settings;
		this.t = getTranslations(settings.language);
		this.updateTheme();
	}

	private updateTheme() {
		this.containerEl.removeClass('vd-theme-light', 'vd-theme-dark', 'vd-theme-auto');
		this.containerEl.addClass(`vd-theme-${this.settings.theme}`);
		this.containerEl.removeClass('vd-layout-grid', 'vd-layout-list', 'vd-layout-compact');
		this.containerEl.addClass(`vd-layout-${this.settings.layout}`);
	}

	public async onDataUpdated(): Promise<void> {
		if (this.isLoading) return;
		this.isLoading = true;
		
		this.containerEl.empty();
		
		// Show loading state
		const loadingEl = this.containerEl.createDiv({ cls: 'vd-loading' });
		loadingEl.createDiv({ cls: 'vd-loading-spinner' });
		loadingEl.createDiv({ cls: 'vd-loading-text', text: 'Analyzing vault...' });
		
		try {
			// Analyze vault
			const analyzer = new VaultAnalyzer(this.app, this.settings);
			this.stats = await analyzer.analyze();
			
			// Render dashboard
			this.containerEl.empty();
			this.render();
		} catch (error) {
			console.error('Dashboard error:', error);
			this.containerEl.empty();
			this.containerEl.createDiv({ 
				cls: 'vd-error',
				text: `Error loading dashboard: ${error}`
			});
		} finally {
			this.isLoading = false;
		}
	}

	private render() {
		if (!this.stats) return;
		
		const { settings, t, stats } = this;
		
		// Dashboard header
		const header = this.containerEl.createDiv({ cls: 'vd-header' });
		header.createEl('h2', { text: t.dashboard, cls: 'vd-title' });
		
		// Main content area
		const content = this.containerEl.createDiv({ cls: 'vd-content' });
		
		// General Statistics Section
		if (settings.showGeneralStats) {
			this.renderGeneralStats(content);
		}
		
		// Link Analysis Section
		if (settings.showLinkStats) {
			this.renderLinkStats(content);
		}
		
		// Activity Heatmap Section
		if (settings.showHeatmap) {
			this.renderHeatmap(content);
		}
		
		// Tag Statistics Section
		if (settings.showTagStats) {
			this.renderTagStats(content);
		}
		
		// Time Statistics Section
		if (settings.showTimeStats) {
			this.renderTimeStats(content);
		}
		
		// File Types Section
		if (settings.showFileTypes) {
			this.renderFileTypes(content);
		}
		
		// Folder Distribution Section
		if (settings.showFolders) {
			this.renderFolderStats(content);
		}
	}

	private renderGeneralStats(container: HTMLElement) {
		const { t, stats } = this;
		if (!stats) return;
		
		const section = this.createSection(container, t.generalStats, 'bar-chart');
		const grid = createStatsCardGrid(section);
		
		createStatsCard(grid, {
			title: t.totalNotes,
			value: formatNumber(stats.totalNotes),
			icon: 'file',
			color: '#4CAF50'
		});
		
		createStatsCard(grid, {
			title: t.totalFiles,
			value: formatNumber(stats.totalFiles),
			icon: 'files',
			color: '#2196F3'
		});
		
		createStatsCard(grid, {
			title: t.totalFolders,
			value: formatNumber(stats.totalFolders),
			icon: 'folder',
			color: '#FF9800'
		});
		
		createStatsCard(grid, {
			title: t.totalWords,
			value: formatNumber(stats.totalWords),
			icon: 'text',
			color: '#9C27B0'
		});
		
		createStatsCard(grid, {
			title: t.averageWords,
			value: formatNumber(stats.averageWordsPerNote),
			icon: 'activity',
			subtitle: t.linksPerNote,
			color: '#00BCD4'
		});
		
		createStatsCard(grid, {
			title: t.medianWords,
			value: formatNumber(stats.medianWordsPerNote),
			icon: 'bar-chart',
			color: '#607D8B'
		});
		
		// Longest/Shortest notes
		if (stats.longestNote) {
			createStatsCard(grid, {
				title: t.longestNote,
				value: stats.longestNote.name,
				subtitle: `${formatNumber(stats.longestNote.wordCount)} ${t.words}`,
				icon: 'award',
				color: '#E91E63',
				onClick: () => this.openFile(stats.longestNote!.path)
			});
		}
		
		if (stats.shortestNote && stats.shortestNote.wordCount > 0) {
			createStatsCard(grid, {
				title: t.shortestNote,
				value: stats.shortestNote.name,
				subtitle: `${formatNumber(stats.shortestNote.wordCount)} ${t.words}`,
				icon: 'file',
				color: '#795548',
				onClick: () => this.openFile(stats.shortestNote!.path)
			});
		}
	}

	private renderLinkStats(container: HTMLElement) {
		const { t, stats } = this;
		if (!stats) return;
		
		const section = this.createSection(container, t.linkStats, 'link');
		const grid = createStatsCardGrid(section);
		
		createStatsCard(grid, {
			title: t.internalLinks,
			value: formatNumber(stats.totalInternalLinks),
			icon: 'link',
			color: '#4CAF50'
		});
		
		createStatsCard(grid, {
			title: t.externalLinks,
			value: formatNumber(stats.totalExternalLinks),
			icon: 'external-link',
			color: '#2196F3'
		});
		
		createStatsCard(grid, {
			title: t.linkDensity,
			value: stats.linkDensity.toFixed(2),
			icon: 'network',
			subtitle: t.linkDensityDesc,
			color: '#FF9800'
		});
		
		createStatsCard(grid, {
			title: t.connectivityScore,
			value: `${stats.connectivityScore}%`,
			icon: 'activity',
			subtitle: t.connectivityScoreDesc,
			color: stats.connectivityScore > 70 ? '#4CAF50' : stats.connectivityScore > 40 ? '#FF9800' : '#F44336'
		});
		
		createStatsCard(grid, {
			title: t.orphanNotes,
			value: formatNumber(stats.orphanNotes),
			icon: 'unlink',
			subtitle: t.orphanNotesDesc,
			color: '#F44336'
		});
		
		// Hub notes
		if (stats.hubNotes.length > 0) {
			const hubSection = section.createDiv({ cls: 'vd-hub-notes' });
			hubSection.createDiv({ cls: 'vd-subsection-title', text: t.hubNotes });
			hubSection.createDiv({ cls: 'vd-subsection-desc', text: t.hubNotesDesc });
			
			createTopNotesList(hubSection, stats.hubNotes, '', 'links', t);
		}
	}

	private renderHeatmap(container: HTMLElement) {
		const { t, stats, settings } = this;
		if (!stats) return;
		
		const section = this.createSection(container, t.activityHeatmap, 'calendar');
		
		// Combine creation and modification data
		const activityData = [...stats.creationsByDate];
		for (const mod of stats.modificationsByDate) {
			const existing = activityData.find(d => d.date === mod.date);
			if (existing) {
				existing.count += mod.count;
			} else {
				activityData.push(mod);
			}
		}
		
		createHeatmapCalendar(section, {
			data: activityData,
			months: settings.heatmapMonths,
			style: settings.heatmapStyle,
			t,
			onCellClick: (date, count) => {
				// Could open search for files modified on this date
				console.log(`Activity on ${date}: ${count}`);
			}
		});
	}

	private renderTagStats(container: HTMLElement) {
		const { t, stats } = this;
		if (!stats) return;
		
		const section = this.createSection(container, t.tagStats, 'tag');
		const grid = createStatsCardGrid(section);
		
		createStatsCard(grid, {
			title: t.totalTags,
			value: formatNumber(stats.totalTags),
			icon: 'tag',
			color: '#9C27B0'
		});
		
		createStatsCard(grid, {
			title: t.uniqueTags,
			value: formatNumber(stats.uniqueTags.length),
			icon: 'tag',
			color: '#00BCD4'
		});
		
		createStatsCard(grid, {
			title: t.notesWithoutTags,
			value: formatNumber(stats.notesWithoutTags),
			icon: 'file',
			color: '#FF9800'
		});
		
		// Tag cloud
		if (stats.tagDistribution.length > 0) {
			const cloudSection = section.createDiv({ cls: 'vd-tag-section' });
			
			// Top tags list
			const topTagsSection = cloudSection.createDiv({ cls: 'vd-top-tags' });
			topTagsSection.createDiv({ cls: 'vd-subsection-title', text: t.topTags });
			createTagList(topTagsSection, { 
				tags: stats.tagDistribution, 
				maxTags: 10, 
				t,
				onTagClick: (tag) => this.searchTag(tag)
			});
			
			// Tag cloud
			const tagCloudSection = cloudSection.createDiv({ cls: 'vd-tag-cloud-section' });
			tagCloudSection.createDiv({ cls: 'vd-subsection-title', text: t.tagCloud });
			createTagCloud(tagCloudSection, { 
				tags: stats.tagDistribution, 
				maxTags: 30,
				t,
				onTagClick: (tag) => this.searchTag(tag)
			});
		}
	}

	private renderTimeStats(container: HTMLElement) {
		const { t, stats } = this;
		if (!stats) return;
		
		const section = this.createSection(container, t.timeStats, 'clock');
		const grid = createStatsCardGrid(section);
		
		createStatsCard(grid, {
			title: t.createdThisWeek,
			value: formatNumber(stats.notesCreatedThisWeek),
			icon: 'calendar',
			color: '#4CAF50'
		});
		
		createStatsCard(grid, {
			title: t.createdThisMonth,
			value: formatNumber(stats.notesCreatedThisMonth),
			icon: 'calendar',
			color: '#2196F3'
		});
		
		createStatsCard(grid, {
			title: t.createdThisYear,
			value: formatNumber(stats.notesCreatedThisYear),
			icon: 'calendar',
			color: '#FF9800'
		});
		
		createStatsCard(grid, {
			title: t.mostActiveDay,
			value: stats.mostActiveDay,
			icon: 'fire',
			color: '#F44336'
		});
	}

	private renderFileTypes(container: HTMLElement) {
		const { t, stats } = this;
		if (!stats) return;
		
		const section = this.createSection(container, t.fileTypes, 'pie-chart');
		createFileTypeDistribution(section, stats.fileTypeDistribution, t);
	}

	private renderFolderStats(container: HTMLElement) {
		const { t, stats } = this;
		if (!stats) return;
		
		const section = this.createSection(container, t.folderStats, 'folder');
		createFolderDistribution(section, stats.folderDistribution, t);
	}

	private createSection(container: HTMLElement, title: string, icon: string): HTMLElement {
		const section = container.createDiv({ cls: 'vd-section' });
		
		const header = section.createDiv({ cls: 'vd-section-header' });
		header.createDiv({ cls: 'vd-section-icon' }).innerHTML = this.getIcon(icon);
		header.createDiv({ cls: 'vd-section-title', text: title });
		
		return section.createDiv({ cls: 'vd-section-content' });
	}

	private openFile(path: string) {
		this.app.workspace.openLinkText(path, '', false);
	}

	private searchTag(tag: string) {
		// Open search with tag query
		(this.app as any).internalPlugins?.getPluginById('global-search')?.instance?.openGlobalSearch(`tag:${tag}`);
	}

	private getIcon(name: string): string {
		const icons: Record<string, string> = {
			'bar-chart': '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>',
			'link': '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
			'calendar': '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
			'tag': '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>',
			'clock': '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
			'pie-chart': '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>',
			'folder': '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>'
		};
		return icons[name] || '';
	}
}
