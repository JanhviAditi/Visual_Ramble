# 🌸 Dreamy Image Search Enhancer

A beautiful, peach-themed image search web app that enhances your prompts using AI and displays stunning aesthetic images in a responsive masonry grid.

## ✨ Features

### 🌟 Core Features
- **AI-Powered Prompt Enhancement**: Uses OpenRouter API to enhance your search prompts
- **Keyword Extraction**: Automatically extracts 5-7 clean image search keywords
- **Unsplash Integration**: Fetches high-quality images based on generated keywords
- **Responsive Masonry Grid**: Beautiful image display with hover effects
- **Copy Keywords**: One-click copy of generated keywords to clipboard

### 🔥 Advanced Features
- **🌓 Light/Dark Mode**: Toggle between light and dark themes with persistent storage
- **Keyword History**: Remembers and displays your previous searches as clickable chips
- **❤️ Favorites System**: Heart images to save them to your favorites
- **📁 Collections**: Create named collections to organize your saved images
- **📐 Wallpaper Cropping**: Download images as desktop or mobile wallpapers
- **Fullscreen Modal**: Click any image for a beautiful fullscreen view

## 🎨 Design & Aesthetics

- **Dreamy Peach Theme**: Soft, aesthetic colors with glassmorphism effects
- **Custom Fonts**: Fredoka for body text, Caveat for titles, Quicksand for accents
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Dark Mode Support**: Complete dark theme with custom scrollbars

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **OpenRouter API** - AI-powered prompt enhancement
- **Unsplash API** - High-quality image search
- **React Icons** - Beautiful icon library
- **React Masonry CSS** - Responsive masonry grid
- **React Modal** - Fullscreen image modals

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd visram
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_AI_API_KEY=your_openrouter_api_key
   VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔑 API Keys Setup

### OpenRouter API
1. Visit [OpenRouter](https://openrouter.ai/)
2. Create an account and get your API key
3. Add it to your `.env` file as `VITE_AI_API_KEY`

### Unsplash API
1. Visit [Unsplash Developers](https://unsplash.com/developers)
2. Create an application to get your access key
3. Add it to your `.env` file as `VITE_UNSPLASH_ACCESS_KEY`

## 📁 Project Structure

```
src/
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
├── assets/
│   └── vr.jpeg           # Background image
├── components/
│   ├── Header.jsx        # Theme toggle header
│   ├── SearchBar.jsx     # Search input component
│   ├── ImageGallery.jsx  # Masonry image grid
│   ├── ImageModal.jsx    # Fullscreen image modal
│   ├── CollectionsModal.jsx # Collections management
│   └── KeywordHistory.jsx # Search history chips
├── context/
│   ├── ThemeContext.js   # Context creation
│   └── ThemeContext.jsx  # Dark/light theme provider
├── pages/
│   ├── Collections.jsx   # Collections page
│   └── Favorites.jsx    # Favorites page
├── utils/
│   └── localStorageHelpers.js # Local storage utilities
└── index.css             # Global styles and fonts
```

## 🎯 Usage Guide

### Basic Search
1. Enter a keyword or mood in the search bar
2. Optionally check "Enhance my prompt before searching"
3. Press Enter or click to search
4. View generated keywords and copy them if needed
5. Browse images in the masonry grid

### Saving Images
- **Favorites**: Click the heart icon on any image
- **Collections**: Click the folder icon in the modal to save to collections
- **Download**: Use the download buttons in the modal for different formats

### Navigation
- **Favorites**: Click the heart button to view all favorited images
- **Collections**: Click the folder button to manage your collections
- **Back to Search**: Use the back button to return to the main search

## 🎨 Customization

### Colors
The app uses a custom peach color palette defined in `tailwind.config.js`:
- Primary: `#fcdedc` (peach-100)
- Secondary: `#fbb6ce` (peach-200)
- Accent: `#ec4899` (peach-500)

### Fonts
- **Fredoka**: Main body text
- **Caveat**: Titles and headings
- **Quicksand**: Accent text

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features
1. Create new components in the `components/` directory
2. Add new pages in the `pages/` directory
3. Update the main App.jsx to include new routes
4. Add any new utilities to `utils/` directory

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- **Mobile**: 1 column layout
- **Tablet**: 2-3 column layout
- **Desktop**: 4 column layout

## 🌟 Future Enhancements

- [ ] Advanced image cropping with react-easy-crop
- [ ] Social sharing functionality
- [ ] User accounts and cloud sync
- [ ] Advanced filters and sorting
- [ ] Image editing tools
- [ ] Export collections as PDF
- [ ] Keyboard shortcuts
- [ ] Progressive Web App (PWA) features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com/) for beautiful images
- [OpenRouter](https://openrouter.ai/) for AI capabilities
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Icons](https://react-icons.github.io/react-icons/) for icons

---

Made with ❤️ and lots of ☕
