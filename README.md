Visual Ramble – AI-Enhanced Image Search Application
Overview

Visual Ramble is a responsive, AI-powered image search application designed to enhance user prompts and generate high-quality visual results.
The system integrates OpenRouter’s AI API for intelligent prompt enhancement and Unsplash API for fetching aesthetic, high-resolution images.
It offers an intuitive interface, modern UI design, and advanced personalization features such as favorites, collections, and theme management.

Features
Core Functionalities

AI-Powered Prompt Enhancement: Refines user input to generate contextually rich and optimized search queries.

Keyword Extraction: Produces a concise list of relevant keywords for improved image retrieval.

Unsplash API Integration: Fetches high-quality images corresponding to enhanced prompts.

Responsive Masonry Grid: Displays images in a visually balanced, responsive layout.

Keyword Copying: Allows quick copying of generated keywords for reuse.

Advanced Functionalities

Light/Dark Mode: User-selectable themes with persistent storage across sessions.

Search History: Displays recent searches as interactive, reusable keyword chips.

Favorites Management: Enables saving and organizing of preferred images.

Custom Collections: Allows creation of user-defined collections for better categorization.

Wallpaper Cropping and Download: Offers image download options in desktop and mobile formats.

Fullscreen Image Modal: Provides an immersive viewing experience for selected images.

Design and Aesthetics

Theme: Minimal, peach-toned UI featuring soft gradients and glassmorphism.

Typography: Fredoka (body), Caveat (titles), and Quicksand (accents).

Responsiveness: Optimized layouts for mobile, tablet, and desktop viewports.

Animation: Smooth transitions and hover effects to improve visual interactivity.

Dark Mode: Complete alternate color scheme with consistent aesthetic detailing.

Technology Stack
Layer	Technologies Used
Frontend	React 19, Tailwind CSS
APIs	OpenRouter API (AI Prompt Enhancement), Unsplash API (Image Search)
State Management	React Hooks, Context API
Utilities & Libraries	React Icons, React Modal, React Masonry CSS
Storage	Local Storage (Theme, Favorites, Collections, Search History)
Project Structure
src/
├── App.jsx                   # Main application component
├── main.jsx                  # Application entry point
├── assets/                   # Static assets and images
├── components/               # Reusable UI components
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── ImageGallery.jsx
│   ├── ImageModal.jsx
│   ├── CollectionsModal.jsx
│   └── KeywordHistory.jsx
├── pages/                    # Dedicated pages for features
│   ├── Collections.jsx
│   └── Favorites.jsx
├── context/                  # Context and theme management
│   ├── ThemeContext.js
│   └── ThemeContext.jsx
├── utils/                    # Utility functions and helpers
│   └── localStorageHelpers.js
└── index.css                 # Global styles and font imports

Setup Instructions
Prerequisites

Node.js (v16 or higher)

npm or yarn package manager

API keys from OpenRouter and Unsplash

Installation Steps

Clone the Repository

git clone <repository-url>
cd visual-ramble


Install Dependencies

npm install


Set Up Environment Variables
Create a .env file in the root directory and add:

VITE_AI_API_KEY=your_openrouter_api_key
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key


Start the Development Server

npm run dev


Access the Application
Open your browser and navigate to http://localhost:5173

Usage
Performing a Search

Enter a descriptive phrase or keyword in the search bar.

Optionally enable “Enhance my prompt” for AI optimization.

View generated keywords and corresponding image results.

Copy keywords or browse images directly in the gallery.

Image Management

Favorites: Click the heart icon to save images.

Collections: Add images to named collections for organization.

Downloads: Choose wallpaper or original image formats.

Modal View: Click any image to view it in fullscreen mode.

Development and Maintenance
Available Scripts
Command	Description
npm run dev	Start the development server
npm run build	Build the project for production
npm run preview	Preview the production build
npm run lint	Run ESLint checks
Customization

Colors: Defined in tailwind.config.js (peach color palette).

Fonts: Managed through Google Fonts in index.css.

Components: Modular structure allows easy feature extension.

Future Enhancements

Integration of react-easy-crop for advanced image cropping

Social media sharing for saved collections

User authentication and cloud sync

Advanced filters and sort options

Offline support / PWA capabilities

Export collections as PDF

License

This project is licensed under the MIT License.

Acknowledgments

Unsplash
 — Image resources

OpenRouter
 — AI-based text enhancement

Tailwind CSS
 — Utility-first CSS framework

React Icons
 — Icon components
