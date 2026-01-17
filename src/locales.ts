// Localization strings for Vault Dashboard

export interface Translations {
	// General
	pluginName: string;
	dashboard: string;
	refresh: string;
	settings: string;
	
	// Section titles
	generalStats: string;
	linkStats: string;
	tagStats: string;
	timeStats: string;
	activityHeatmap: string;
	fileTypes: string;
	folderStats: string;
	
	// General stats
	totalNotes: string;
	totalFiles: string;
	totalFolders: string;
	totalWords: string;
	totalCharacters: string;
	averageWords: string;
	medianWords: string;
	longestNote: string;
	shortestNote: string;
	words: string;
	
	// Link stats
	internalLinks: string;
	externalLinks: string;
	linkDensity: string;
	linkDensityDesc: string;
	connectivityScore: string;
	connectivityScoreDesc: string;
	orphanNotes: string;
	orphanNotesDesc: string;
	hubNotes: string;
	hubNotesDesc: string;
	linksPerNote: string;
	
	// Tag stats
	totalTags: string;
	uniqueTags: string;
	topTags: string;
	notesWithoutTags: string;
	tagCloud: string;
	
	// Time stats
	createdThisWeek: string;
	createdThisMonth: string;
	createdThisYear: string;
	mostActiveDay: string;
	currentStreak: string;
	longestStreak: string;
	days: string;
	
	// Heatmap
	lessActive: string;
	moreActive: string;
	contributions: string;
	noActivity: string;
	
	// File types
	markdown: string;
	images: string;
	pdfs: string;
	other: string;
	
	// Settings
	language: string;
	languageDesc: string;
	timeRange: string;
	timeRangeDesc: string;
	allTime: string;
	lastYear: string;
	lastMonth: string;
	lastWeek: string;
	theme: string;
	themeDesc: string;
	auto: string;
	light: string;
	dark: string;
	layout: string;
	layoutDesc: string;
	grid: string;
	list: string;
	compact: string;
	sections: string;
	sectionsDesc: string;
	heatmapStyle: string;
	heatmapStyleDesc: string;
	github: string;
	gradient: string;
	excludePatterns: string;
	excludePatternsDesc: string;
	heatmapMonths: string;
	heatmapMonthsDesc: string;
	autoOpenBase: string;
	autoOpenBaseDesc: string;
	
	// Days of week
	monday: string;
	tuesday: string;
	wednesday: string;
	thursday: string;
	friday: string;
	saturday: string;
	sunday: string;
	
	// Months
	jan: string;
	feb: string;
	mar: string;
	apr: string;
	may: string;
	jun: string;
	jul: string;
	aug: string;
	sep: string;
	oct: string;
	nov: string;
	dec: string;
}

export const EN: Translations = {
	// General
	pluginName: 'Vault Dashboard',
	dashboard: 'Dashboard',
	refresh: 'Refresh',
	settings: 'Settings',
	
	// Section titles
	generalStats: 'General Statistics',
	linkStats: 'Link Analysis',
	tagStats: 'Tag Statistics',
	timeStats: 'Time Analytics',
	activityHeatmap: 'Activity Heatmap',
	fileTypes: 'File Types',
	folderStats: 'Folder Distribution',
	
	// General stats
	totalNotes: 'Total Notes',
	totalFiles: 'Total Files',
	totalFolders: 'Total Folders',
	totalWords: 'Total Words',
	totalCharacters: 'Total Characters',
	averageWords: 'Avg. Words/Note',
	medianWords: 'Median Words',
	longestNote: 'Longest Note',
	shortestNote: 'Shortest Note',
	words: 'words',
	
	// Link stats
	internalLinks: 'Internal Links',
	externalLinks: 'External Links',
	linkDensity: 'Link Density',
	linkDensityDesc: 'Average links per note',
	connectivityScore: 'Connectivity',
	connectivityScoreDesc: 'How well your vault is connected',
	orphanNotes: 'Orphan Notes',
	orphanNotesDesc: 'Notes with no links',
	hubNotes: 'Hub Notes',
	hubNotesDesc: 'Most connected notes',
	linksPerNote: 'links/note',
	
	// Tag stats
	totalTags: 'Total Tags',
	uniqueTags: 'Unique Tags',
	topTags: 'Top Tags',
	notesWithoutTags: 'Untagged Notes',
	tagCloud: 'Tag Cloud',
	
	// Time stats
	createdThisWeek: 'Created This Week',
	createdThisMonth: 'Created This Month',
	createdThisYear: 'Created This Year',
	mostActiveDay: 'Most Active Day',
	currentStreak: 'Current Streak',
	longestStreak: 'Longest Streak',
	days: 'days',
	
	// Heatmap
	lessActive: 'Less',
	moreActive: 'More',
	contributions: 'contributions',
	noActivity: 'No activity',
	
	// File types
	markdown: 'Markdown',
	images: 'Images',
	pdfs: 'PDFs',
	other: 'Other',
	
	// Settings
	language: 'Language',
	languageDesc: 'Choose the interface language',
	timeRange: 'Time Range',
	timeRangeDesc: 'Period for time-based statistics',
	allTime: 'All Time',
	lastYear: 'Last Year',
	lastMonth: 'Last Month',
	lastWeek: 'Last Week',
	theme: 'Theme',
	themeDesc: 'Dashboard color theme',
	auto: 'Auto',
	light: 'Light',
	dark: 'Dark',
	layout: 'Layout',
	layoutDesc: 'Dashboard layout style',
	grid: 'Grid',
	list: 'List',
	compact: 'Compact',
	sections: 'Visible Sections',
	sectionsDesc: 'Choose which sections to display',
	heatmapStyle: 'Heatmap Style',
	heatmapStyleDesc: 'Visual style of the activity heatmap',
	github: 'GitHub',
	gradient: 'Gradient',
	excludePatterns: 'Exclude Patterns',
	excludePatternsDesc: 'Folder/file patterns to exclude (comma-separated)',
	heatmapMonths: 'Heatmap Months',
	heatmapMonthsDesc: 'Number of months to show in heatmap',	autoOpenBase: 'Auto-open Base on startup',
	autoOpenBaseDesc: 'Path to Base file to open automatically (leave empty to disable)',	
	// Days of week
	monday: 'Mon',
	tuesday: 'Tue',
	wednesday: 'Wed',
	thursday: 'Thu',
	friday: 'Fri',
	saturday: 'Sat',
	sunday: 'Sun',
	
	// Months
	jan: 'Jan',
	feb: 'Feb',
	mar: 'Mar',
	apr: 'Apr',
	may: 'May',
	jun: 'Jun',
	jul: 'Jul',
	aug: 'Aug',
	sep: 'Sep',
	oct: 'Oct',
	nov: 'Nov',
	dec: 'Dec',
};

export const RU: Translations = {
	// General
	pluginName: 'Дашборд Хранилища',
	dashboard: 'Дашборд',
	refresh: 'Обновить',
	settings: 'Настройки',
	
	// Section titles
	generalStats: 'Общая Статистика',
	linkStats: 'Анализ Связей',
	tagStats: 'Статистика Тегов',
	timeStats: 'Временная Аналитика',
	activityHeatmap: 'Тепловая Карта Активности',
	fileTypes: 'Типы Файлов',
	folderStats: 'Распределение по Папкам',
	
	// General stats
	totalNotes: 'Всего Заметок',
	totalFiles: 'Всего Файлов',
	totalFolders: 'Всего Папок',
	totalWords: 'Всего Слов',
	totalCharacters: 'Всего Символов',
	averageWords: 'Сред. Слов/Заметку',
	medianWords: 'Медиана Слов',
	longestNote: 'Самая Длинная',
	shortestNote: 'Самая Короткая',
	words: 'слов',
	
	// Link stats
	internalLinks: 'Внутренние Ссылки',
	externalLinks: 'Внешние Ссылки',
	linkDensity: 'Плотность Ссылок',
	linkDensityDesc: 'Среднее количество ссылок на заметку',
	connectivityScore: 'Связанность',
	connectivityScoreDesc: 'Насколько связано ваше хранилище',
	orphanNotes: 'Заметки-Сироты',
	orphanNotesDesc: 'Заметки без связей',
	hubNotes: 'Узловые Заметки',
	hubNotesDesc: 'Самые связанные заметки',
	linksPerNote: 'ссылок/заметку',
	
	// Tag stats
	totalTags: 'Всего Тегов',
	uniqueTags: 'Уникальных Тегов',
	topTags: 'Топ Тегов',
	notesWithoutTags: 'Без Тегов',
	tagCloud: 'Облако Тегов',
	
	// Time stats
	createdThisWeek: 'За Эту Неделю',
	createdThisMonth: 'За Этот Месяц',
	createdThisYear: 'За Этот Год',
	mostActiveDay: 'Самый Активный День',
	currentStreak: 'Текущая Серия',
	longestStreak: 'Лучшая Серия',
	days: 'дней',
	
	// Heatmap
	lessActive: 'Меньше',
	moreActive: 'Больше',
	contributions: 'активности',
	noActivity: 'Нет активности',
	
	// File types
	markdown: 'Markdown',
	images: 'Изображения',
	pdfs: 'PDF',
	other: 'Другое',
	
	// Settings
	language: 'Язык',
	languageDesc: 'Выберите язык интерфейса',
	timeRange: 'Период',
	timeRangeDesc: 'Период для временной статистики',
	allTime: 'Всё Время',
	lastYear: 'Последний Год',
	lastMonth: 'Последний Месяц',
	lastWeek: 'Последняя Неделя',
	theme: 'Тема',
	themeDesc: 'Цветовая тема дашборда',
	auto: 'Авто',
	light: 'Светлая',
	dark: 'Тёмная',
	layout: 'Разметка',
	layoutDesc: 'Стиль разметки дашборда',
	grid: 'Сетка',
	list: 'Список',
	compact: 'Компактный',
	sections: 'Видимые Секции',
	sectionsDesc: 'Выберите какие секции отображать',
	heatmapStyle: 'Стиль Тепловой Карты',
	heatmapStyleDesc: 'Визуальный стиль тепловой карты',
	github: 'GitHub',
	gradient: 'Градиент',
	excludePatterns: 'Исключить Паттерны',
	excludePatternsDesc: 'Паттерны папок/файлов для исключения (через запятую)',
	heatmapMonths: 'Месяцев в Тепловой Карте',
	heatmapMonthsDesc: 'Количество месяцев для отображения',
	autoOpenBase: 'Автооткрытие Base при запуске',
	autoOpenBaseDesc: 'Путь к Base файлу для автооткрытия (оставьте пустым, чтобы отключить)',
	
	// Days of week
	monday: 'Пн',
	tuesday: 'Вт',
	wednesday: 'Ср',
	thursday: 'Чт',
	friday: 'Пт',
	saturday: 'Сб',
	sunday: 'Вс',
	
	// Months
	jan: 'Янв',
	feb: 'Фев',
	mar: 'Мар',
	apr: 'Апр',
	may: 'Май',
	jun: 'Июн',
	jul: 'Июл',
	aug: 'Авг',
	sep: 'Сен',
	oct: 'Окт',
	nov: 'Ноя',
	dec: 'Дек',
};

export function getTranslations(lang: 'en' | 'ru'): Translations {
	return lang === 'ru' ? RU : EN;
}
