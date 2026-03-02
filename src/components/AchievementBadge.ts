// AchievementBadge – renders unlockable achievement badges

import { Achievement } from '../types';
import { Translations } from '../locales';

const TIER_COLORS: Record<string, string> = {
	bronze:   '#cd7f32',
	silver:   '#a8a9ad',
	gold:     '#ffd700',
	platinum: '#e5e4e2',
};

const TIER_BG: Record<string, string> = {
	bronze:   'rgba(205,127,50,0.12)',
	silver:   'rgba(168,169,173,0.12)',
	gold:     'rgba(255,215,0,0.12)',
	platinum: 'rgba(229,228,226,0.15)',
};

/**
 * Render the full achievements section.
 */
export function createAchievementsSection(
	container: HTMLElement,
	achievements: Achievement[],
	t: Translations
): void {
	const section = container.createDiv({ cls: 'vd-achievements' });

	const header = section.createDiv({ cls: 'vd-achievements-header' });
	header.createSpan({ cls: 'vd-achievements-title', text: t.achievements });

	const unlocked = achievements.filter(a => a.unlocked).length;
	header.createSpan({
		cls: 'vd-achievements-count',
		text: `${unlocked} / ${achievements.length}`
	});

	const grid = section.createDiv({ cls: 'vd-achievements-grid' });

	for (const badge of achievements) {
		renderBadge(grid, badge, t);
	}
}

function renderBadge(container: HTMLElement, badge: Achievement, t: Translations): void {
	const el = container.createDiv({
		cls: `vd-badge ${badge.unlocked ? 'vd-badge-unlocked' : 'vd-badge-locked'} vd-badge-${badge.tier}`
	});

	// Tier glow color
	el.style.setProperty('--badge-color', TIER_COLORS[badge.tier]);
	el.style.setProperty('--badge-bg', TIER_BG[badge.tier]);

	// Icon
	el.createDiv({ cls: 'vd-badge-icon', text: badge.unlocked ? badge.icon : '🔒' });

	// Text
	const info = el.createDiv({ cls: 'vd-badge-info' });
	info.createDiv({ cls: 'vd-badge-name', text: badge.name });
	info.createDiv({ cls: 'vd-badge-desc', text: badge.description });

	// Tier label
	el.createDiv({ cls: `vd-badge-tier vd-badge-tier-${badge.tier}`, text: badge.tier });
}
