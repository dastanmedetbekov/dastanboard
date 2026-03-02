// ShareCard – generates a beautiful shareable stats summary
// Users copy a text card to share on social media, stories, etc.

import { Notice } from 'obsidian';
import { VaultStatistics } from '../types';
import { Translations } from '../locales';
import { formatNumber } from '../utils/helpers';

/**
 * Determine the emoji tier for the vault health score.
 */
function healthEmoji(score: number): string {
	if (score >= 80) return '💎';
	if (score >= 60) return '⚡';
	if (score >= 40) return '🌱';
	return '🔧';
}

/**
 * Build the plain-text card that users paste into stories / tweets.
 */
export function buildShareText(stats: VaultStatistics, vaultName: string): string {
	const health = healthEmoji(stats.vaultHealthScore);
	const lines = [
		`📊 My Obsidian Vault — ${vaultName}`,
		`${'─'.repeat(36)}`,
		`📝 ${formatNumber(stats.totalNotes)} notes       📚 ${formatNumber(stats.totalWords)} words`,
		`🔗 ${formatNumber(stats.totalInternalLinks)} links      🏷️  ${formatNumber(stats.uniqueTags.length)} unique tags`,
		`🔥 ${stats.writingStreak.current} day streak  ⏱️  ~${formatNumber(stats.estimatedReadingMinutes)} min read`,
		`${health} Vault Health: ${stats.vaultHealthScore}/100`,
		`${'─'.repeat(36)}`,
		`Built with Dastanboard for Obsidian`,
		`#Obsidian #PKM #Dastanboard #SecondBrain #NoteTaking`,
	];
	return lines.join('\n');
}

/**
 * Render the share panel inside a given container element.
 */
export function createSharePanel(
	container: HTMLElement,
	stats: VaultStatistics,
	vaultName: string,
	t: Translations
): void {
	const panel = container.createDiv({ cls: 'vd-share-panel' });

	// Title row
	const titleRow = panel.createDiv({ cls: 'vd-share-title-row' });
	titleRow.createSpan({ cls: 'vd-share-title-icon', text: '🚀' });
	titleRow.createSpan({ cls: 'vd-share-title-text', text: t.shareTitle });

	// Preview card
	const preview = panel.createDiv({ cls: 'vd-share-preview' });
	const text = buildShareText(stats, vaultName);
	const pre = preview.createEl('pre', { cls: 'vd-share-text', text });

	// Action buttons row
	const actions = panel.createDiv({ cls: 'vd-share-actions' });

	// Copy to clipboard
	const copyBtn = actions.createEl('button', { cls: 'vd-share-btn vd-share-btn-primary', text: t.copyStats });
	copyBtn.addEventListener('click', async () => {
		try {
			await navigator.clipboard.writeText(text);
			copyBtn.setText('✅ ' + t.copied);
			copyBtn.addClass('vd-share-btn-success');
			setTimeout(() => {
				copyBtn.setText(t.copyStats);
				copyBtn.removeClass('vd-share-btn-success');
			}, 2500);
		} catch {
			new Notice('Could not copy to clipboard.');
		}
	});

	// Share hashtag hint
	const hint = panel.createDiv({ cls: 'vd-share-hint', text: t.shareHint });
}
