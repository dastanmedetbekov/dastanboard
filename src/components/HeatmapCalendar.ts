// Heatmap Calendar Component - GitHub-style activity visualization

import { Translations } from '../locales';
import { DateCount, ActivityData, DashboardSettings } from '../types';
import { formatDateKey, getActivityLevel, calculateStreak, getHeatmapColor } from '../utils/helpers';

export interface HeatmapOptions {
	data: DateCount[];
	months: number;
	style: 'github' | 'gradient';
	t: Translations;
	onCellClick?: (date: string, count: number) => void;
}

export function createHeatmapCalendar(container: HTMLElement, options: HeatmapOptions): HTMLElement {
	const { data, months, style, t, onCellClick } = options;
	
	const heatmap = container.createDiv({ cls: 'vd-heatmap' });
	
	// Create date map for quick lookup
	const dateMap = new Map<string, number>();
	let maxCount = 0;
	
	for (const item of data) {
		dateMap.set(item.date, item.count);
		if (item.count > maxCount) maxCount = item.count;
	}
	
	// Calculate date range
	const endDate = new Date();
	const startDate = new Date();
	startDate.setMonth(startDate.getMonth() - months);
	startDate.setDate(startDate.getDate() - startDate.getDay()); // Start from Sunday
	
	// Calculate streaks
	const activeDates = data.filter(d => d.count > 0).map(d => d.date);
	const { current: currentStreak, longest: longestStreak } = calculateStreak(activeDates);
	
	// Header with stats
	const header = heatmap.createDiv({ cls: 'vd-heatmap-header' });
	
	const totalContributions = data.reduce((sum, d) => sum + d.count, 0);
	header.createDiv({ 
		cls: 'vd-heatmap-total',
		text: `${totalContributions.toLocaleString()} ${t.contributions}`
	});
	
	const streaks = header.createDiv({ cls: 'vd-heatmap-streaks' });
	streaks.createSpan({ 
		cls: 'vd-streak',
		text: `🔥 ${t.currentStreak}: ${currentStreak} ${t.days}`
	});
	streaks.createSpan({ 
		cls: 'vd-streak',
		text: `⭐ ${t.longestStreak}: ${longestStreak} ${t.days}`
	});
	
	// Month labels
	const monthLabels = heatmap.createDiv({ cls: 'vd-heatmap-months' });
	const monthNames = [t.jan, t.feb, t.mar, t.apr, t.may, t.jun, t.jul, t.aug, t.sep, t.oct, t.nov, t.dec];
	
	// Calculate which months to show
	const currentDate = new Date(startDate);
	let lastMonth = -1;
	const weeksData: { date: Date; month: number }[] = [];
	
	while (currentDate <= endDate) {
		const month = currentDate.getMonth();
		weeksData.push({ date: new Date(currentDate), month });
		currentDate.setDate(currentDate.getDate() + 7);
	}
	
	// Render month labels
	let weekIndex = 0;
	for (const week of weeksData) {
		if (week.month !== lastMonth) {
			const monthLabel = monthLabels.createSpan({ 
				cls: 'vd-heatmap-month-label',
				text: monthNames[week.month]
			});
			monthLabel.style.gridColumnStart = String(weekIndex + 2); // +2 for day labels column
			lastMonth = week.month;
		}
		weekIndex++;
	}
	
	// Grid container
	const gridContainer = heatmap.createDiv({ cls: 'vd-heatmap-grid-container' });
	
	// Day labels
	const dayLabels = gridContainer.createDiv({ cls: 'vd-heatmap-day-labels' });
	const dayNames = [t.sunday, t.monday, t.tuesday, t.wednesday, t.thursday, t.friday, t.saturday];
	
	// Only show Mon, Wed, Fri
	for (let i = 0; i < 7; i++) {
		const label = dayLabels.createDiv({ cls: 'vd-heatmap-day-label' });
		if (i === 1 || i === 3 || i === 5) {
			label.setText(dayNames[i]);
		}
	}
	
	// Grid
	const grid = gridContainer.createDiv({ cls: 'vd-heatmap-grid' });
	
	// Generate cells
	currentDate.setTime(startDate.getTime());
	
	while (currentDate <= endDate) {
		const weekColumn = grid.createDiv({ cls: 'vd-heatmap-week' });
		
		for (let day = 0; day < 7; day++) {
			const dateKey = formatDateKey(currentDate);
			const count = dateMap.get(dateKey) || 0;
			const level = getActivityLevel(count, maxCount);
			
			const cell = weekColumn.createDiv({ 
				cls: `vd-heatmap-cell vd-level-${level}` 
			});
			
			cell.style.backgroundColor = getHeatmapColor(level, style);
			
			// Tooltip
			const tooltipText = count > 0 
				? `${count} ${t.contributions} on ${dateKey}`
				: `${t.noActivity} on ${dateKey}`;
			cell.setAttribute('aria-label', tooltipText);
			cell.setAttribute('data-date', dateKey);
			cell.setAttribute('data-count', String(count));
			
			// Click handler
			if (onCellClick) {
				cell.addEventListener('click', () => onCellClick(dateKey, count));
			}
			
			// Hover tooltip
			cell.addEventListener('mouseenter', (e) => {
				showTooltip(e.target as HTMLElement, tooltipText);
			});
			
			cell.addEventListener('mouseleave', () => {
				hideTooltip();
			});
			
			currentDate.setDate(currentDate.getDate() + 1);
		}
	}
	
	// Legend
	const legend = heatmap.createDiv({ cls: 'vd-heatmap-legend' });
	legend.createSpan({ text: t.lessActive });
	
	for (let i = 0; i <= 4; i++) {
		const legendCell = legend.createDiv({ 
			cls: `vd-heatmap-cell vd-level-${i}` 
		});
		legendCell.style.backgroundColor = getHeatmapColor(i as 0|1|2|3|4, style);
	}
	
	legend.createSpan({ text: t.moreActive });
	
	return heatmap;
}

// Tooltip management
let tooltipEl: HTMLElement | null = null;

function showTooltip(target: HTMLElement, text: string) {
	if (!tooltipEl) {
		tooltipEl = document.body.createDiv({ cls: 'vd-tooltip' });
	}
	
	tooltipEl.setText(text);
	tooltipEl.addClass('vd-tooltip-visible');
	
	const rect = target.getBoundingClientRect();
	tooltipEl.style.left = `${rect.left + rect.width / 2}px`;
	tooltipEl.style.top = `${rect.top - 8}px`;
}

function hideTooltip() {
	if (tooltipEl) {
		tooltipEl.removeClass('vd-tooltip-visible');
	}
}
