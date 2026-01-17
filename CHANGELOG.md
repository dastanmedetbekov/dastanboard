# Changelog

All notable changes to Dastanboard will be documented in this file.

## [0.1.0-beta] - 2026-01-17

### 🎉 Beta Release

Initial beta release of Dastanboard (formerly Vault Dashboard).

### ✨ Features

#### Statistics & Analytics
- 📊 **General Statistics** - Total notes, files, folders, word counts, longest/shortest notes
- 🔗 **Link Analysis** - Internal/external links, connectivity score (0-100%), orphan notes, hub notes
- 📅 **Activity Heatmap** - GitHub-style contribution graph with current & longest streak tracking
- 🏷️ **Tag Statistics** - Interactive tag cloud, top tags bar chart, untagged notes count
- ⏱️ **Time Analytics** - Notes created per week/month/year, most active day of the week
- 📁 **File Type Distribution** - Pie chart showing Markdown, images, PDFs, etc.
- 📂 **Folder Distribution** - Bar chart of notes per folder (top 10)

#### Customization
- 🌍 **Localization** - English (default) and Russian languages
- 🎨 **Three Layouts** - Grid, List, and Compact card arrangements
- 🌓 **Theme Support** - Auto, Light, and Dark modes
- 🔧 **Toggle Sections** - Show/hide individual dashboard sections
- 📊 **Heatmap Styles** - GitHub green or warm gradient color schemes
- ⏰ **Auto-open Base** - Configure a Base file to open automatically on startup

#### Advanced
- 🚫 **Exclude Patterns** - Filter out templates, daily notes, etc.
- 🔄 **Real-time Updates** - Dashboard refreshes with vault changes
- 📱 **Responsive Design** - Works on all screen sizes

### 🐛 Bug Fixes
- Fixed heatmap calendar showing December instead of current month (January 2026)
- Fixed date range calculation to properly end at today
- Added future date handling in heatmap (grayed out with reduced opacity)

### 📄 License
- Changed from MIT to **GPL-3.0**

### Technical
- Built with TypeScript + esbuild
- Uses Obsidian Bases API (v1.10.0+)
- Efficient vault analysis engine
- Modular component architecture
