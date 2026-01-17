// Tag Cloud Component

import { TagInfo } from '../types';
import { Translations } from '../locales';

export interface TagCloudOptions {
	tags: TagInfo[];
	maxTags?: number;
	t: Translations;
	onTagClick?: (tag: string) => void;
}

export function createTagCloud(container: HTMLElement, options: TagCloudOptions): HTMLElement {
	const { tags, maxTags = 30, t, onTagClick } = options;
	
	const cloudContainer = container.createDiv({ cls: 'vd-tag-cloud' });
	
	if (tags.length === 0) {
		cloudContainer.createDiv({ 
			cls: 'vd-tag-cloud-empty',
			text: 'No tags found'
		});
		return cloudContainer;
	}
	
	// Get min and max counts for scaling
	const displayTags = tags.slice(0, maxTags);
	const counts = displayTags.map(t => t.count);
	const minCount = Math.min(...counts);
	const maxCount = Math.max(...counts);
	const range = maxCount - minCount || 1;
	
	// Shuffle tags for visual variety (but keep some structure)
	const shuffledTags = [...displayTags].sort(() => Math.random() - 0.5);
	
	for (const tag of shuffledTags) {
		const tagEl = cloudContainer.createSpan({ cls: 'vd-tag-item' });
		
		// Calculate size (0.8em to 2em based on count)
		const normalizedSize = (tag.count - minCount) / range;
		const fontSize = 0.8 + normalizedSize * 1.2;
		tagEl.style.fontSize = `${fontSize}em`;
		
		// Calculate opacity (0.6 to 1 based on count)
		const opacity = 0.6 + normalizedSize * 0.4;
		tagEl.style.opacity = String(opacity);
		
		// Color variation based on hash
		const hue = hashString(tag.tag) % 360;
		tagEl.style.setProperty('--tag-hue', String(hue));
		
		tagEl.setText(tag.tag);
		tagEl.setAttribute('data-count', String(tag.count));
		tagEl.setAttribute('title', `${tag.tag}: ${tag.count} notes (${tag.percentage}%)`);
		
		if (onTagClick) {
			tagEl.addClass('vd-tag-clickable');
			tagEl.addEventListener('click', () => onTagClick(tag.tag));
		}
	}
	
	return cloudContainer;
}

export function createTagList(container: HTMLElement, options: TagCloudOptions): HTMLElement {
	const { tags, maxTags = 10, t, onTagClick } = options;
	
	const listContainer = container.createDiv({ cls: 'vd-tag-list' });
	
	if (tags.length === 0) {
		listContainer.createDiv({ 
			cls: 'vd-tag-list-empty',
			text: 'No tags found'
		});
		return listContainer;
	}
	
	const displayTags = tags.slice(0, maxTags);
	const maxCount = Math.max(...displayTags.map(t => t.count));
	
	for (const tag of displayTags) {
		const item = listContainer.createDiv({ cls: 'vd-tag-list-item' });
		
		// Tag name
		const nameEl = item.createSpan({ cls: 'vd-tag-list-name' });
		nameEl.setText(tag.tag);
		
		if (onTagClick) {
			nameEl.addClass('vd-tag-clickable');
			nameEl.addEventListener('click', () => onTagClick(tag.tag));
		}
		
		// Bar
		const barContainer = item.createDiv({ cls: 'vd-tag-list-bar-container' });
		const bar = barContainer.createDiv({ cls: 'vd-tag-list-bar' });
		const percentage = (tag.count / maxCount) * 100;
		bar.style.width = `${percentage}%`;
		
		// Count
		item.createSpan({ 
			cls: 'vd-tag-list-count',
			text: String(tag.count)
		});
	}
	
	return listContainer;
}

// Simple hash function for consistent colors
function hashString(str: string): number {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash = hash & hash;
	}
	return Math.abs(hash);
}
