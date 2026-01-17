// Vault Dashboard - Main Plugin Entry Point

import { App, Plugin, PluginSettingTab, Setting, Notice } from 'obsidian';
import { DashboardSettings, DEFAULT_SETTINGS } from './types';
import { getTranslations, Translations } from './locales';
import { DashboardView, DASHBOARD_VIEW_TYPE } from './views/DashboardView';

export default class VaultDashboardPlugin extends Plugin {
	settings: DashboardSettings;

	async onload() {
		await this.loadSettings();

		// Register the Bases view
		const registered = this.registerBasesView(DASHBOARD_VIEW_TYPE, {
			name: 'Dashboard',
			icon: 'lucide-layout-dashboard',
			factory: (controller, containerEl) => {
				return new DashboardView(controller, containerEl, this.app, this.settings);
			},
			options: () => this.getViewOptions()
		});

		if (!registered) {
			console.log('Vault Dashboard: Bases not enabled in this vault');
		}

		// Add ribbon icon for quick access
		this.addRibbonIcon('layout-dashboard', 'Vault Dashboard', () => {
			new Notice('Open a Bases file and select Dashboard view');
		});

		// Add settings tab
		this.addSettingTab(new VaultDashboardSettingTab(this.app, this));

		// Add command
		this.addCommand({
			id: 'open-vault-dashboard',
			name: 'Open Vault Dashboard',
			callback: () => {
				new Notice('Create or open a Bases file, then select Dashboard from the view menu');
			}
		});
	}

	onunload() {
		// Cleanup if needed
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	private getViewOptions(): import('obsidian').ViewOption[] {
		const t = getTranslations(this.settings.language);
		
		return [
			{
				type: 'dropdown',
				key: 'language',
				displayName: t.language,
				default: 'en',
				options: {
					'en': 'English',
					'ru': 'Русский'
				}
			},
			{
				type: 'dropdown',
				key: 'timeRange',
				displayName: t.timeRange,
				default: 'all',
				options: {
					'all': t.allTime,
					'year': t.lastYear,
					'month': t.lastMonth,
					'week': t.lastWeek
				}
			},
			{
				type: 'dropdown',
				key: 'layout',
				displayName: t.layout,
				default: 'grid',
				options: {
					'grid': t.grid,
					'list': t.list,
					'compact': t.compact
				}
			},
			{
				type: 'dropdown',
				key: 'heatmapStyle',
				displayName: t.heatmapStyle,
				default: 'github',
				options: {
					'github': t.github,
					'gradient': t.gradient
				}
			},
			{
				type: 'slider',
				key: 'heatmapMonths',
				displayName: t.heatmapMonths,
				default: 12,
				min: 3,
				max: 24,
				step: 1
			}
		];
	}
}

class VaultDashboardSettingTab extends PluginSettingTab {
	plugin: VaultDashboardPlugin;
	t: Translations;

	constructor(app: App, plugin: VaultDashboardPlugin) {
		super(app, plugin);
		this.plugin = plugin;
		this.t = getTranslations(plugin.settings.language);
	}

	display(): void {
		const { containerEl } = this;
		const { settings } = this.plugin;
		this.t = getTranslations(settings.language);

		containerEl.empty();

		// Header
		containerEl.createEl('h1', { text: this.t.pluginName });
		containerEl.createEl('p', { 
			text: 'A comprehensive statistics dashboard for your Obsidian vault.',
			cls: 'setting-item-description'
		});

		// Language Setting
		new Setting(containerEl)
			.setName(this.t.language)
			.setDesc(this.t.languageDesc)
			.addDropdown(dropdown => {
				dropdown
					.addOption('en', 'English')
					.addOption('ru', 'Русский')
					.setValue(settings.language)
					.onChange(async (value: 'en' | 'ru') => {
						settings.language = value;
						await this.plugin.saveSettings();
						this.display(); // Refresh to update language
					});
			});

		// Appearance Section
		containerEl.createEl('h2', { text: 'Appearance' });

		new Setting(containerEl)
			.setName(this.t.theme)
			.setDesc(this.t.themeDesc)
			.addDropdown(dropdown => {
				dropdown
					.addOption('auto', this.t.auto)
					.addOption('light', this.t.light)
					.addOption('dark', this.t.dark)
					.setValue(settings.theme)
					.onChange(async (value: 'auto' | 'light' | 'dark') => {
						settings.theme = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName(this.t.layout)
			.setDesc(this.t.layoutDesc)
			.addDropdown(dropdown => {
				dropdown
					.addOption('grid', this.t.grid)
					.addOption('list', this.t.list)
					.addOption('compact', this.t.compact)
					.setValue(settings.layout)
					.onChange(async (value: 'grid' | 'list' | 'compact') => {
						settings.layout = value;
						await this.plugin.saveSettings();
					});
			});

		// Sections Section
		containerEl.createEl('h2', { text: this.t.sections });
		containerEl.createEl('p', { 
			text: this.t.sectionsDesc,
			cls: 'setting-item-description'
		});

		new Setting(containerEl)
			.setName(this.t.generalStats)
			.addToggle(toggle => {
				toggle
					.setValue(settings.showGeneralStats)
					.onChange(async (value) => {
						settings.showGeneralStats = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName(this.t.linkStats)
			.addToggle(toggle => {
				toggle
					.setValue(settings.showLinkStats)
					.onChange(async (value) => {
						settings.showLinkStats = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName(this.t.activityHeatmap)
			.addToggle(toggle => {
				toggle
					.setValue(settings.showHeatmap)
					.onChange(async (value) => {
						settings.showHeatmap = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName(this.t.tagStats)
			.addToggle(toggle => {
				toggle
					.setValue(settings.showTagStats)
					.onChange(async (value) => {
						settings.showTagStats = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName(this.t.timeStats)
			.addToggle(toggle => {
				toggle
					.setValue(settings.showTimeStats)
					.onChange(async (value) => {
						settings.showTimeStats = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName(this.t.fileTypes)
			.addToggle(toggle => {
				toggle
					.setValue(settings.showFileTypes)
					.onChange(async (value) => {
						settings.showFileTypes = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName(this.t.folderStats)
			.addToggle(toggle => {
				toggle
					.setValue(settings.showFolders)
					.onChange(async (value) => {
						settings.showFolders = value;
						await this.plugin.saveSettings();
					});
			});

		// Heatmap Section
		containerEl.createEl('h2', { text: this.t.activityHeatmap });

		new Setting(containerEl)
			.setName(this.t.heatmapStyle)
			.setDesc(this.t.heatmapStyleDesc)
			.addDropdown(dropdown => {
				dropdown
					.addOption('github', this.t.github)
					.addOption('gradient', this.t.gradient)
					.setValue(settings.heatmapStyle)
					.onChange(async (value: 'github' | 'gradient') => {
						settings.heatmapStyle = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName(this.t.heatmapMonths)
			.setDesc(this.t.heatmapMonthsDesc)
			.addSlider(slider => {
				slider
					.setLimits(3, 24, 1)
					.setValue(settings.heatmapMonths)
					.setDynamicTooltip()
					.onChange(async (value) => {
						settings.heatmapMonths = value;
						await this.plugin.saveSettings();
					});
			});

		// Advanced Section
		containerEl.createEl('h2', { text: 'Advanced' });

		new Setting(containerEl)
			.setName(this.t.excludePatterns)
			.setDesc(this.t.excludePatternsDesc)
			.addTextArea(text => {
				text
					.setPlaceholder('templates/*, daily/*, .obsidian/*')
					.setValue(settings.excludePatterns.join(', '))
					.onChange(async (value) => {
						settings.excludePatterns = value
							.split(',')
							.map(p => p.trim())
							.filter(p => p.length > 0);
						await this.plugin.saveSettings();
					});
				text.inputEl.rows = 3;
				text.inputEl.cols = 40;
			});
	}
}
