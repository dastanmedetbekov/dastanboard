// Progress Bar and Chart Components

import { FileTypeInfo, FolderInfo, NoteInfo } from '../types';
import { Translations } from '../locales';
import { formatNumber, truncate } from '../utils/helpers';

export interface ProgressBarOptions {
	value: number;
	max: number;
	label?: string;
	showPercentage?: boolean;
	color?: string;
	size?: 'small' | 'medium' | 'large';
}

export function createProgressBar(container: HTMLElement, options: ProgressBarOptions): HTMLElement {
	const { value, max, label, showPercentage = true, color, size = 'medium' } = options;
	
	const wrapper = container.createDiv({ cls: `vd-progress-wrapper vd-progress-${size}` });
	
	if (label) {
		const labelEl = wrapper.createDiv({ cls: 'vd-progress-label' });
		labelEl.createSpan({ text: label });
		if (showPercentage) {
			const percentage = max > 0 ? ((value / max) * 100).toFixed(1) : 0;
			labelEl.createSpan({ cls: 'vd-progress-percentage', text: `${percentage}%` });
		}
	}
	
	const barContainer = wrapper.createDiv({ cls: 'vd-progress-bar-container' });
	const bar = barContainer.createDiv({ cls: 'vd-progress-bar' });
	
	const width = max > 0 ? (value / max) * 100 : 0;
	bar.style.width = `${width}%`;
	
	if (color) {
		bar.style.backgroundColor = color;
	}
	
	return wrapper;
}

export interface PieChartOptions {
	data: { label: string; value: number; color?: string }[];
	size?: number;
	showLegend?: boolean;
}

export function createPieChart(container: HTMLElement, options: PieChartOptions): HTMLElement {
	const { data, size = 150, showLegend = true } = options;
	
	const chartContainer = container.createDiv({ cls: 'vd-pie-chart-container' });
	
	const total = data.reduce((sum, d) => sum + d.value, 0);
	if (total === 0) {
		chartContainer.createDiv({ cls: 'vd-pie-chart-empty', text: 'No data' });
		return chartContainer;
	}
	
	// Create SVG pie chart
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('width', String(size));
	svg.setAttribute('height', String(size));
	svg.setAttribute('viewBox', `-1 -1 2 2`);
	svg.style.transform = 'rotate(-90deg)';
	svg.classList.add('vd-pie-chart');
	
	let cumulativePercent = 0;
	const colors = [
		'#4CAF50', '#2196F3', '#FF9800', '#9C27B0', 
		'#F44336', '#00BCD4', '#FFEB3B', '#795548',
		'#607D8B', '#E91E63'
	];
	
	data.forEach((item, index) => {
		const percent = item.value / total;
		const startAngle = cumulativePercent * 2 * Math.PI;
		const endAngle = (cumulativePercent + percent) * 2 * Math.PI;
		
		const x1 = Math.cos(startAngle);
		const y1 = Math.sin(startAngle);
		const x2 = Math.cos(endAngle);
		const y2 = Math.sin(endAngle);
		
		const largeArc = percent > 0.5 ? 1 : 0;
		
		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		const d = `M ${x1} ${y1} A 1 1 0 ${largeArc} 1 ${x2} ${y2} L 0 0`;
		path.setAttribute('d', d);
		path.setAttribute('fill', item.color || colors[index % colors.length]);
		path.classList.add('vd-pie-slice');
		
		// Tooltip
		path.setAttribute('data-label', item.label);
		path.setAttribute('data-value', String(item.value));
		path.setAttribute('data-percent', `${(percent * 100).toFixed(1)}%`);
		
		svg.appendChild(path);
		cumulativePercent += percent;
	});
	
	chartContainer.appendChild(svg);
	
	// Legend
	if (showLegend) {
		const legend = chartContainer.createDiv({ cls: 'vd-pie-legend' });
		
		data.forEach((item, index) => {
			const percent = ((item.value / total) * 100).toFixed(1);
			const legendItem = legend.createDiv({ cls: 'vd-pie-legend-item' });
			
			const colorBox = legendItem.createDiv({ cls: 'vd-pie-legend-color' });
			colorBox.style.backgroundColor = item.color || colors[index % colors.length];
			
			legendItem.createSpan({ 
				cls: 'vd-pie-legend-label',
				text: `${item.label} (${percent}%)`
			});
		});
	}
	
	return chartContainer;
}

export interface BarChartOptions {
	data: { label: string; value: number }[];
	maxBars?: number;
	horizontal?: boolean;
	showValues?: boolean;
}

export function createBarChart(container: HTMLElement, options: BarChartOptions): HTMLElement {
	const { data, maxBars = 10, horizontal = true, showValues = true } = options;
	
	const chartContainer = container.createDiv({ 
		cls: `vd-bar-chart ${horizontal ? 'vd-bar-horizontal' : 'vd-bar-vertical'}` 
	});
	
	const displayData = data.slice(0, maxBars);
	const maxValue = Math.max(...displayData.map(d => d.value));
	
	if (maxValue === 0) {
		chartContainer.createDiv({ cls: 'vd-bar-chart-empty', text: 'No data' });
		return chartContainer;
	}
	
	for (const item of displayData) {
		const barItem = chartContainer.createDiv({ cls: 'vd-bar-item' });
		
		// Label
		barItem.createDiv({ 
			cls: 'vd-bar-label',
			text: truncate(item.label, 20)
		});
		
		// Bar
		const barWrapper = barItem.createDiv({ cls: 'vd-bar-wrapper' });
		const bar = barWrapper.createDiv({ cls: 'vd-bar' });
		const percentage = (item.value / maxValue) * 100;
		
		if (horizontal) {
			bar.style.width = `${percentage}%`;
		} else {
			bar.style.height = `${percentage}%`;
		}
		
		// Value
		if (showValues) {
			barItem.createDiv({ 
				cls: 'vd-bar-value',
				text: formatNumber(item.value)
			});
		}
	}
	
	return chartContainer;
}

export function createFileTypeDistribution(
	container: HTMLElement, 
	data: FileTypeInfo[], 
	t: Translations
): HTMLElement {
	const section = container.createDiv({ cls: 'vd-file-types' });
	
	// Map extensions to labels
	const labelMap: Record<string, string> = {
		'md': t.markdown,
		'png': t.images,
		'jpg': t.images,
		'jpeg': t.images,
		'gif': t.images,
		'svg': t.images,
		'pdf': t.pdfs
	};
	
	// Aggregate by category
	const categories: Record<string, number> = {};
	for (const item of data) {
		const label = labelMap[item.extension] || t.other;
		categories[label] = (categories[label] || 0) + item.count;
	}
	
	const pieData = Object.entries(categories).map(([label, value]) => ({
		label,
		value
	}));
	
	createPieChart(section, { data: pieData, size: 120 });
	
	return section;
}

export function createFolderDistribution(
	container: HTMLElement,
	data: FolderInfo[],
	t: Translations
): HTMLElement {
	const section = container.createDiv({ cls: 'vd-folder-dist' });
	
	const barData = data.map(f => ({
		label: f.path === '' ? '/' : f.path,
		value: f.noteCount
	}));
	
	createBarChart(section, { data: barData, maxBars: 8 });
	
	return section;
}

export function createTopNotesList(
	container: HTMLElement,
	notes: NoteInfo[],
	title: string,
	metric: 'words' | 'links',
	t: Translations
): HTMLElement {
	const section = container.createDiv({ cls: 'vd-top-notes' });
	
	section.createDiv({ cls: 'vd-top-notes-title', text: title });
	
	const list = section.createDiv({ cls: 'vd-top-notes-list' });
	
	for (const note of notes.slice(0, 5)) {
		const item = list.createDiv({ cls: 'vd-top-note-item' });
		
		item.createSpan({ 
			cls: 'vd-top-note-name',
			text: truncate(note.name, 25)
		});
		
		const value = metric === 'words' ? note.wordCount : note.linkCount;
		const unit = metric === 'words' ? t.words : 'links';
		
		item.createSpan({ 
			cls: 'vd-top-note-value',
			text: `${formatNumber(value)} ${unit}`
		});
	}
	
	return section;
}
