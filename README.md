# 📊 Dastanboard

<p align="center">
  <img src="https://img.shields.io/badge/Obsidian-v1.10.0+-7c3aed?style=for-the-badge&logo=obsidian&logoColor=white" alt="Obsidian">
  <img src="https://img.shields.io/badge/License-GPL--3.0-blue?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/Language-TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Version-0.1.0--beta-orange?style=for-the-badge" alt="Version">
</p>

<p align="center">
  <b>🚀 A powerful statistics dashboard for your Obsidian vault</b><br>
  <i>GitHub-style activity heatmaps • Link analysis • Tag clouds • Writing analytics</i>
</p>

---

## ✨ Features

### 📊 General Statistics
- Total notes, files, and folders
- Word counts — total, average, and median per note
- Longest and shortest notes with quick navigation
- Character and paragraph counts

### 🔗 Link Analysis
- Internal/external links count and density
- **Connectivity Score** — measure how well your vault is connected (0-100%)
- **Orphan Notes** — find isolated notes with no connections
- **Hub Notes** — discover your most connected notes

### 📅 Activity Heatmap
- **GitHub-style contribution graph**
- Track your note-taking activity over time
- **Current streak** & **longest streak** tracking
- Customizable time range (3-24 months)
- Two styles: GitHub green or warm gradient

### 🏷️ Tag Statistics
- **Tag Cloud** visualization
- Top tags with bar chart
- Count of untagged notes
- Click tags to search

### ⏱️ Time Analytics
- Notes created this week/month/year
- Most active day of the week
- Creation trends over time

### 📁 File & Folder Distribution
- Pie chart of file types (Markdown, images, PDFs, etc.)
- Bar chart of notes per folder
- Top folders by note count

### 🌍 Localization
- 🇬🇧 **English** (default)
- 🇷🇺 **Русский** (Russian)

### 🎨 Customization
- **Three layouts**: Grid, List, Compact
- **Theme support**: Auto, Light, Dark
- Toggle individual sections on/off
- Exclude patterns for templates, daily notes, etc.
- **Auto-open Base** on Obsidian startup

---

## 🚀 Installation

### Manual Installation
1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/dastanmedetbekov/dastanboard/releases)
2. Create folder: `<vault>/.obsidian/plugins/dastanboard/`
3. Copy the downloaded files into this folder
4. Reload Obsidian and enable the plugin

---

## 📖 Usage

### Opening the Dashboard

1. **Create a Bases file** (or open an existing one)
   - Use command palette: `Create new Base`
   - Or create a file with `.base` extension

2. **Select Dashboard view**
   - Click the view selector in the Bases toolbar
   - Choose "Dastanboard" from the list

3. **Enjoy your statistics!**

### Settings

Go to **Settings** → **Dastanboard** to configure:

| Setting | Description | Default |
|---------|-------------|---------|
| **Language** | Interface language | English |
| **Theme** | Color theme (Auto/Light/Dark) | Auto |
| **Layout** | Card arrangement style | Grid |
| **Heatmap Style** | GitHub green or warm gradient | GitHub |
| **Heatmap Months** | Time period to display | 12 |
| **Auto-open Base** | Open specific Base on startup | (none) |
| **Exclude Patterns** | Folders/files to ignore | (empty) |

---

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/dastanmedetbekov/dastanboard.git
cd dastanboard

# Install dependencies
npm install

# Build for development (watch mode)
npm run dev

# Build for production
npm run build
```

### Project Structure
```
dastanboard/
├── src/
│   ├── main.ts              # Plugin entry point
│   ├── types.ts             # TypeScript types
│   ├── locales.ts           # Translations
│   ├── analytics/
│   │   └── VaultAnalyzer.ts # Statistics engine
│   ├── components/
│   │   ├── StatsCard.ts     # Stat cards
│   │   ├── HeatmapCalendar.ts # Activity heatmap
│   │   ├── TagCloud.ts      # Tag cloud
│   │   └── Charts.ts        # Charts & graphs
│   ├── views/
│   │   └── DashboardView.ts # Main Bases view
│   └── utils/
│       └── helpers.ts       # Utilities
├── styles.css
├── manifest.json
└── package.json
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **GNU General Public License v3.0** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Obsidian](https://obsidian.md) team for the amazing app and API
- The Obsidian community for inspiration

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/dastanmedetbekov">Dastan Medetbekov</a>
</p>
