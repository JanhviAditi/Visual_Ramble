import { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import ImageModal from './components/ImageModal';
import Header from './components/Header';
import Collections from './pages/Collections';
import Favorites from './pages/Favorites';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FiCopy, FiCheck, FiSearch } from 'react-icons/fi';

function App() {
  const [images, setImages] = useState([]);
  const [userPrompt, setUserPrompt] = useState('');
  const [generatedKeywords, setGeneratedKeywords] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [keywordHistory, setKeywordHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState('search');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setKeywordHistory(JSON.parse(localStorage.getItem('keywordHistory')) || []);
  }, []);

  const fetchImages = useCallback(async (keywords, pageNumber, { signal } = {}) => {
    const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    if (!apiKey) {
      console.error(
        'Unsplash API key not configured. Copy .env.example to .env and add your key.'
      );
      return false;
    }
    const query = keywords.replace(/\n/g, ',').trim();
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${pageNumber}&per_page=20&client_id=${apiKey}`;

    try {
      const res = await fetch(url, { signal });
      const data = await res.json();
      if (data.results?.length > 0) {
        setImages((prev) =>
          pageNumber === 1 ? data.results : [...prev, ...data.results]
        );
        setHasMore(data.results.length === 20);
        return true;
      } else {
        if (pageNumber === 1) setImages([]);
        setHasMore(false);
        return true;
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error fetching images:', error);
      }
      setHasMore(false);
      return false;
    }
  }, []);

  const handleSearch = async (userInput) => {
    setIsSearching(true);
    setUserPrompt(userInput);
    setShowResults(true);
    setPage(1);
    setHasMore(false); // prevent InfiniteScroll loader while searching
    setImages([]);

    // Update history
    const newHistory = [...new Set([userInput, ...keywordHistory])].slice(0, 15);
    setKeywordHistory(newHistory);
    localStorage.setItem('keywordHistory', JSON.stringify(newHistory));

    const aiKey = import.meta.env.VITE_AI_API_KEY;
    let searchKeywords = userInput;

    if (aiKey) {
      // AI-enhanced keyword extraction
      try {
        const response = await fetch(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${aiKey}`,
              'HTTP-Referer': window.location.origin,
              'X-Title': 'Visual Ramble',
            },
            body: JSON.stringify({
              model: 'meta-llama/llama-3.1-8b-instruct:free',
              messages: [
                {
                  role: 'user',
                  content: `Extract 5-7 clean, comma-separated image search keywords from: "${userInput}". Return ONLY the keywords, nothing else.`,
                },
              ],
            }),
          }
        );

        const data = await response.json();
        if (data.choices?.[0]?.message?.content) {
          const keywords = data.choices[0].message.content.trim();
          searchKeywords = keywords
            .replace(/\d+\.\s*/g, '')
            .replace(/\n/g, ', ')
            .replace(/"/g, '')
            .trim();
        }
      } catch {
        // AI failed — fall through with original input
      }
    }

    setGeneratedKeywords(searchKeywords);
    await fetchImages(searchKeywords, 1);
    setIsSearching(false);
  };

  const loadMoreImages = () => {
    if (hasMore && generatedKeywords) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchImages(generatedKeywords, nextPage);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedKeywords).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const handleDeleteHistoryItem = (item) => {
    const updated = keywordHistory.filter((k) => k !== item);
    setKeywordHistory(updated);
    localStorage.setItem('keywordHistory', JSON.stringify(updated));
  };

  const handleClearHistory = () => {
    setKeywordHistory([]);
    localStorage.removeItem('keywordHistory');
  };

  const handleNavigate = (targetPage) => {
    setCurrentPage(targetPage);
    if (targetPage === 'search') {
      setShowResults(false);
      setImages([]);
      setSelectedImage(null);
      setPage(1);
      setHasMore(true);
      setGeneratedKeywords('');
    }
  };

  // ── Home page ──
  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] px-4">
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-charcoal mb-3 tracking-tight">
          Visual Ramble
        </h1>
        <p className="text-ash text-base sm:text-lg max-w-md mx-auto leading-relaxed">
          Discover images that match your mood
        </p>
      </div>

      <div className="w-full max-w-xl animate-slide-up">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Describe your aesthetic..."
          history={keywordHistory}
          onDeleteHistoryItem={handleDeleteHistoryItem}
          onClearHistory={handleClearHistory}
        />
      </div>

      <p className="mt-8 text-xs text-stone-400 animate-fade-in">
        Try: &ldquo;cozy rainy afternoon&rdquo; or &ldquo;minimal Scandinavian&rdquo;
      </p>
    </div>
  );

  // ── Results page ──
  const renderResults = () => (
    <div className="min-h-screen">
      {/* Sticky search header */}
      <div className="sticky top-[53px] z-30 bg-cream/80 backdrop-blur-md border-b border-cloud/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search again..."
            history={keywordHistory}
            onDeleteHistoryItem={handleDeleteHistoryItem}
            onClearHistory={handleClearHistory}
            compact
          />

          {/* Keywords bar */}
          {generatedKeywords && generatedKeywords !== userPrompt && (
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="text-xs text-ash">Keywords:</span>
              {generatedKeywords.split(',').map((kw, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 bg-mist-50 text-mist-600 rounded-full"
                >
                  {kw.trim()}
                </span>
              ))}
              <button
                onClick={handleCopy}
                className="text-xs px-2 py-0.5 rounded-full bg-sage-50 text-sage-600 hover:bg-sage-100 transition-colors flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <FiCheck size={10} /> Copied
                  </>
                ) : (
                  <>
                    <FiCopy size={10} /> Copy
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <p className="text-xs text-ash">
          {images.length > 0
            ? `Showing ${images.length} results for "${userPrompt}"`
            : ''}
        </p>
      </div>

      {/* Gallery */}
      <InfiniteScroll
        dataLength={images.length}
        next={loadMoreImages}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 border-2 border-cloud border-t-sage-400 rounded-full animate-spin" />
          </div>
        }
        endMessage={
          images.length > 0 ? (
            <div className="text-center py-10">
              <p className="text-sm text-ash">You&apos;ve seen it all ✨</p>
            </div>
          ) : null
        }
      >
        <div className="px-4 sm:px-6 py-4">
          {isSearching ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-cloud border-t-mist-400 rounded-full animate-spin mb-4" />
              <p className="text-sm text-ash">Finding beautiful images...</p>
            </div>
          ) : images.length > 0 ? (
            <ImageGallery images={images} onImageClick={setSelectedImage} />
          ) : (
            <div className="text-center py-20">
              <FiSearch className="mx-auto text-cloud mb-3" size={32} />
              <h3 className="text-base font-medium text-charcoal mb-1">
                No images found
              </h3>
              <p className="text-sm text-ash">Try different search terms</p>
            </div>
          )}
        </div>
      </InfiniteScroll>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'collections':
        return <Collections onBack={() => handleNavigate('search')} />;
      case 'favorites':
        return <Favorites onBack={() => handleNavigate('search')} />;
      default:
        return showResults ? renderResults() : renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        showNav={showResults || currentPage !== 'search'}
      />
      {renderCurrentPage()}
    </div>
  );
}

export default App;
