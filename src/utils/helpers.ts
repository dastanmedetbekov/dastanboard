// Utility functions for Vault Dashboard

/**
 * Format a number with thousand separators
 */
export function formatNumber(num: number): string {
	return num.toLocaleString();
}

/**
 * Format a number as percentage
 */
export function formatPercent(num: number, decimals: number = 1): string {
	return `${num.toFixed(decimals)}%`;
}

/**
 * Calculate median of an array
 */
export function median(arr: number[]): number {
	if (arr.length === 0) return 0;
	const sorted = [...arr].sort((a, b) => a - b);
	const mid = Math.floor(sorted.length / 2);
	return sorted.length % 2 !== 0
		? sorted[mid]
		: (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Count words in text
 */
export function countWords(text: string): number {
	return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Count paragraphs in text
 */
export function countParagraphs(text: string): number {
	return text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
}

/**
 * Get date string in YYYY-MM-DD format
 */
export function formatDateKey(date: Date): string {
	return date.toISOString().split('T')[0];
}

/**
 * Get start of day timestamp
 */
export function getStartOfDay(date: Date): Date {
	const d = new Date(date);
	d.setHours(0, 0, 0, 0);
	return d;
}

/**
 * Get days between two dates
 */
export function daysBetween(date1: Date, date2: Date): number {
	const oneDay = 24 * 60 * 60 * 1000;
	return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
}

/**
 * Check if path matches any exclude pattern
 */
export function matchesExcludePattern(path: string, patterns: string[]): boolean {
	return patterns.some(pattern => {
		const regex = new RegExp(
			pattern.replace(/\*/g, '.*').replace(/\?/g, '.'),
			'i'
		);
		return regex.test(path);
	});
}

/**
 * Get file extension
 */
export function getFileExtension(filename: string): string {
	const ext = filename.split('.').pop();
	return ext ? ext.toLowerCase() : '';
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
	if (str.length <= maxLength) return str;
	return str.substring(0, maxLength - 3) + '...';
}

/**
 * Generate activity level (0-4) based on count
 */
export function getActivityLevel(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
	if (count === 0) return 0;
	if (max === 0) return 0;
	const ratio = count / max;
	if (ratio <= 0.25) return 1;
	if (ratio <= 0.5) return 2;
	if (ratio <= 0.75) return 3;
	return 4;
}

/**
 * Calculate streak (consecutive days)
 */
export function calculateStreak(dates: string[]): { current: number; longest: number } {
	if (dates.length === 0) return { current: 0, longest: 0 };
	
	const sortedDates = [...new Set(dates)].sort().reverse();
	const today = formatDateKey(new Date());
	const yesterday = formatDateKey(new Date(Date.now() - 86400000));
	
	let current = 0;
	let longest = 0;
	let streak = 0;
	let lastDate: string | null = null;
	
	// Check if streak is current
	const isCurrentStreak = sortedDates[0] === today || sortedDates[0] === yesterday;
	
	for (const date of sortedDates) {
		if (lastDate === null) {
			streak = 1;
		} else {
			const prevDate = new Date(lastDate);
			const currDate = new Date(date);
			const diff = daysBetween(prevDate, currDate);
			
			if (diff === 1) {
				streak++;
			} else {
				if (isCurrentStreak && current === 0) {
					current = streak;
				}
				longest = Math.max(longest, streak);
				streak = 1;
			}
		}
		lastDate = date;
	}
	
	longest = Math.max(longest, streak);
	if (isCurrentStreak && current === 0) {
		current = streak;
	}
	
	return { current, longest };
}

/**
 * Group items by a key function
 */
export function groupBy<T, K extends string | number>(
	items: T[],
	keyFn: (item: T) => K
): Record<K, T[]> {
	return items.reduce((acc, item) => {
		const key = keyFn(item);
		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push(item);
		return acc;
	}, {} as Record<K, T[]>);
}

/**
 * Get day of week name from date
 */
export function getDayOfWeek(date: Date): number {
	return date.getDay();
}

/**
 * Parse frontmatter from markdown content
 */
export function parseFrontmatter(content: string): Record<string, unknown> {
	const match = content.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return {};
	
	const yaml = match[1];
	const result: Record<string, unknown> = {};
	
	const lines = yaml.split('\n');
	for (const line of lines) {
		const colonIndex = line.indexOf(':');
		if (colonIndex > 0) {
			const key = line.substring(0, colonIndex).trim();
			const value = line.substring(colonIndex + 1).trim();
			result[key] = value;
		}
	}
	
	return result;
}

/**
 * Extract tags from content
 */
export function extractTags(content: string): string[] {
	const tagRegex = /#[\w\u0400-\u04FF\/-]+/g;
	const matches = content.match(tagRegex) || [];
	return [...new Set(matches.map(tag => tag.toLowerCase()))];
}

/**
 * Extract internal links from content
 */
export function extractInternalLinks(content: string): string[] {
	const linkRegex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
	const links: string[] = [];
	let match;
	while ((match = linkRegex.exec(content)) !== null) {
		links.push(match[1]);
	}
	return links;
}

/**
 * Extract external links from content
 */
export function extractExternalLinks(content: string): string[] {
	const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
	const links: string[] = [];
	let match;
	while ((match = linkRegex.exec(content)) !== null) {
		links.push(match[2]);
	}
	return links;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => void>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	return (...args: Parameters<T>) => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}

/**
 * Create color gradient for heatmap
 */
export function getHeatmapColor(level: 0 | 1 | 2 | 3 | 4, style: 'github' | 'gradient'): string {
	if (style === 'github') {
		const colors = [
			'var(--background-secondary)',
			'#9be9a8',
			'#40c463',
			'#30a14e',
			'#216e39'
		];
		return colors[level];
	} else {
		const colors = [
			'var(--background-secondary)',
			'#fef3c7',
			'#fcd34d',
			'#f59e0b',
			'#d97706'
		];
		return colors[level];
	}
}
