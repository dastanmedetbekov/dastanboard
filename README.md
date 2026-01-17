# Vault Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/Obsidian-v1.10.0+-7c3aed?style=for-the-badge&logo=obsidian&logoColor=white" alt="Obsidian">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/Language-TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
</p>

<p align="center">
  <b>A comprehensive statistics dashboard for your Obsidian vault</b><br>
  <i>GitHub-style activity heatmaps, link analysis, tag clouds, and more!</i>
</p>

---

## ✨ Features

### 📊 General Statistics
- **Total notes, files, and folders** in your vault
- **Word counts** - total, average, and median per note
- **Longest and shortest notes** with direct navigation
- **Character and paragraph counts**

### 🔗 Link Analysis
- **Internal links** count and density
- **External links** tracking
- **Connectivity Score** - see how well your vault is connected (0-100%)
- **Orphan Notes** - find notes with no connections
- **Hub Notes** - discover your most connected notes

### 📅 Activity Heatmap
- **GitHub-style contribution graph**
- Track your note-taking activity over time
- **Current streak** and **longest streak** tracking
- Customizable time range (3-24 months)
- Two visual styles: GitHub green or warm gradient

### 🏷️ Tag Statistics
- **Tag Cloud** visualization
- **Top tags** with bar chart
- Count of **untagged notes**
- Click tags to search

### ⏱️ Time Analytics
- Notes created **this week/month/year**
- **Most active day** of the week
- Creation trends over time

### 📁 File & Folder Distribution
- **Pie chart** of file types (Markdown, images, PDFs, etc.)
- **Bar chart** of notes per folder
- Top 10 folders by note count

### 🌍 Localization
- **English** (default)
- **Русский** (Russian)

### 🎨 Customization
- **Three layouts**: Grid, List, Compact
- **Theme support**: Auto, Light, Dark
- Toggle individual sections on/off
- Exclude patterns for templates, daily notes, etc.

---

## 📸 Screenshots

### Dashboard Overview
```
┌─────────────────────────────────────────────────────────┐
│  📊 Dashboard                                           │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ 📄 Notes │ │ 📁 Files │ │ 📂 Dirs  │ │ 📝 Words │   │
│  │   1,234  │ │   2,456  │ │    123   │ │  456,789 │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                                                         │
│  🔗 Link Analysis                                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Internal: 5,678  │ Connectivity: 78%  │ Orphans: 23│ │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  📅 Activity Heatmap                                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ░░▓▓██░░▓▓░░██▓▓░░▓▓██░░▓▓░░██▓▓░░▓▓██░░▓▓░░██  │  │
│  │ 🔥 Current Streak: 15 days  ⭐ Best: 45 days      │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  🏷️ Tags          │  📁 Folders                        │
│  ┌────────────────┼─────────────────────────────────┐  │
│  │ #project  ████ │ /notes       ████████████       │  │
│  │ #idea     ███  │ /projects    ██████             │  │
│  │ #todo     ██   │ /archive     ████               │  │
│  └────────────────┴─────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Installation

### From Obsidian Community Plugins (Recommended)
1. Open **Settings** → **Community Plugins**
2. Click **Browse** and search for "Vault Dashboard"
3. Click **Install**, then **Enable**

### Manual Installation
1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/dastanmedetbekov/obsidian-vault-dashboard/releases)
2. Create folder: `<vault>/.obsidian/plugins/vault-dashboard/`
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
   - Choose "Dashboard" from the list

3. **Enjoy your statistics!**

### Customizing the Dashboard

#### Via Plugin Settings
Go to **Settings** → **Vault Dashboard** to configure:
- Language (English/Russian)
- Theme preference
- Layout style
- Which sections to show
- Heatmap appearance
- Exclude patterns

#### Via Bases View Options
Click the menu icon in the Bases toolbar to access view-specific options:
- Time range filter
- Layout mode
- Heatmap months

---

## ⚙️ Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Language** | Interface language | English |
| **Theme** | Color theme (Auto/Light/Dark) | Auto |
| **Layout** | Card arrangement style | Grid |
| **Heatmap Style** | GitHub green or warm gradient | GitHub |
| **Heatmap Months** | Time period to display | 12 |
| **Exclude Patterns** | Folders/files to ignore | (empty) |

### Section Toggles
- General Statistics ✓
- Link Analysis ✓
- Activity Heatmap ✓
- Tag Statistics ✓
- Time Analytics ✓
- File Types ✓
- Folder Distribution ✓

---

## 🌐 Localization

Currently supported languages:
- 🇬🇧 **English** (default)
- 🇷🇺 **Русский** (Russian)

Want to add your language? Contributions welcome!

---

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/dastanmedetbekov/obsidian-vault-dashboard.git
cd obsidian-vault-dashboard

# Install dependencies
npm install

# Build for development (watch mode)
npm run dev

# Build for production
npm run build
```

### Project Structure
```
obsidian-vault-dashboard/
├── src/
│   ├── main.ts              # Plugin entry point
│   ├── types.ts             # TypeScript types
│   ├── locales.ts           # Translations
│   ├── analytics/
│   │   └── VaultAnalyzer.ts # Core statistics engine
│   ├── components/
│   │   ├── StatsCard.ts     # Stat cards
│   │   ├── HeatmapCalendar.ts # Activity heatmap
│   │   ├── TagCloud.ts      # Tag cloud
│   │   └── Charts.ts        # Charts & graphs
│   ├── views/
│   │   └── DashboardView.ts # Main Bases view
│   └── utils/
│       └── helpers.ts       # Utility functions
├── styles.css               # Styling
├── manifest.json            # Plugin manifest
└── package.json
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💖 Support

If you find this plugin useful, consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs or suggesting features
- 🌍 Contributing translations
- ☕ [Buying me a coffee](https://buymeacoffee.com/dastan)

---

## 🙏 Acknowledgments

- [Obsidian](https://obsidian.md) team for the amazing app and API
- The Obsidian community for inspiration and feedback
- All contributors and users!

---

<p align="center">
  Made with ❤️ for the Obsidian community
</p>
