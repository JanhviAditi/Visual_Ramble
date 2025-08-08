import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import ImageModal from './components/ImageModal';
import Header from './components/Header';
import KeywordHistory from './components/KeywordHistory';
import Collections from './pages/Collections';
import Favorites from './pages/Favorites';
import vr from './assets/vr.jpeg';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FiHeart, FiFolder } from 'react-icons/fi';

function App() {
  const [images, setImages] = useState([]);
  const [userPrompt, setUserPrompt] = useState('');
  const [generatedKeywords, setGeneratedKeywords] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [keywordHistory, setKeywordHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState('search'); // 'search', 'collections', 'favorites'
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('keywordHistory')) || [];
    setKeywordHistory(history);
  }, []);

  const handleSearch = async (userInput) => {
    const keywordPrompt = `Extract 5-7 clean image search keywords from this sentence: ${userInput}`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_AI_API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Pinterest Keyword Enhancer"
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [{ role: "user", content: keywordPrompt }]
        })
      });

      const data = await response.json();

      if (data.choices?.[0]?.message) {
        const keywords = data.choices[0].message.content;
        const cleaned = keywords.replace(/\d+\.\s*/g, '').replace(/\n/g, ', ').trim();

        setGeneratedKeywords(keywords);
        setUserPrompt(userInput);
        setShowResults(true);
        setPage(1);
        setHasMore(true);
        setImages([]);
        fetchImages(cleaned, 1);

        const newHistory = [...new Set([userInput, ...keywordHistory])].slice(0, 10);
        setKeywordHistory(newHistory);
        localStorage.setItem('keywordHistory', JSON.stringify(newHistory));
      }
    } catch (error) {
      console.error("Error calling OpenRouter API:", error);
    }
  };

  const fetchImages = async (keywords, pageNumber) => {
    const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    const query = keywords.replace(/\n/g, ',');
    const url = `https://api.unsplash.com/search/photos?query=${query}&page=${pageNumber}&per_page=20&client_id=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        setImages(prev => pageNumber === 1 ? data.results : [...prev, ...data.results]);
        setHasMore(data.results.length === 20); // If we get less than 20, we've reached the end
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setHasMore(false);
    }
  };

  const loadMoreImages = () => {
    if (hasMore && generatedKeywords) {
      const nextPage = page + 1;
      setPage(nextPage);
      const cleaned = generatedKeywords.replace(/\d+\.\s*/g, '').replace(/\n/g, ', ').trim();
      fetchImages(cleaned, nextPage);
    }
  };

  const handleCopy = () => {
    const text = generatedKeywords
      .replace(/\d+\.\s*/g, '')
      .replace(/\n/g, ', ')
      .trim();

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const handleKeywordChipClick = (prompt) => {
    handleSearch(prompt);
  };

  const handleBackToSearch = () => {
    setCurrentPage('search');
    setShowResults(false);
    setImages([]);
    setSelectedImage(null);
    setPage(1);
    setHasMore(true);
  };

  const renderSearchPage = () => (
    <>
      {!showResults ? (
        <div
          className="flex items-center justify-center h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${vr})` }}
        >
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-xl text-center max-w-xl mx-auto">
            <h1 className="text-4xl sm:text-5xl mb-8 font-caveat text-black text-center">
              What's your aesthetic today?
            </h1>
            <SearchBar
              onSearch={handleSearch}
              placeholder="Give me a keyword or a whole mood"
            />

            <KeywordHistory 
              history={keywordHistory}
              onKeywordClick={handleKeywordChipClick}
            />
          </div>
        </div>
      ) : (
        <div>
          <div
            className="w-full py-10 px-4 md:px-12 bg-cover bg-center"
            style={{ backgroundImage: `url(${vr})` }}
          >
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              {/* Prompt Card */}
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md w-full md:w-1/2 text-center">
                <h3 className="font-caveat text-xl mb-2 text-gray-900">Entered Prompt</h3>
                <p className="font-fredoka text-gray-700">{userPrompt}</p>
              </div>

              {/* Keywords Card */}
              <div className="bg-[#fcdedc] p-4 rounded-2xl shadow-md w-full md:w-1/2 text-center">
                <h3 className="font-caveat text-xl mb-2 text-gray-900">Generated Keywords</h3>
                <p className="font-fredoka text-gray-700 mb-3">
                  {generatedKeywords.replace(/\d+\.\s*/g, '').replace(/\n/g, ', ')}
                </p>
                <button
                  onClick={handleCopy}
                  className="bg-pink-400 hover:bg-pink-500 text-white text-sm font-semibold px-4 py-2 rounded-full transition duration-300"
                >
                  {copied ? 'Copied!' : 'Copy Keywords'}
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 py-4 bg-white/50 backdrop-blur-sm">
            <button
              onClick={() => setCurrentPage('favorites')}
              className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-colors font-fredoka"
            >
              <FiHeart />
              Favorites
            </button>
            <button
              onClick={() => setCurrentPage('collections')}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors font-fredoka"
            >
              <FiFolder />
              Collections
            </button>
          </div>

          {/* Infinite Scroll Image Gallery */}
          <InfiniteScroll
            dataLength={images.length}
            next={loadMoreImages}
            hasMore={hasMore}
            loader={
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                <p className="mt-2 text-gray-600 font-fredoka">Loading more images...</p>
              </div>
            }
            endMessage={
              <div className="text-center py-8">
                <p className="text-gray-600 font-fredoka">No more images to load</p>
              </div>
            }
          >
            <div className="px-4 py-8">
              {images.length > 0 ? (
                <ImageGallery
                  images={images}
                  onImageClick={(img) => setSelectedImage(img)}
                />
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-caveat text-gray-600 mb-2">
                    No images found
                  </h3>
                  <p className="text-gray-500 font-fredoka">
                    Try adjusting your search terms
                  </p>
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
      )}
    </>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'collections':
        return <Collections onBack={handleBackToSearch} />;
      case 'favorites':
        return <Favorites onBack={handleBackToSearch} />;
      default:
        return renderSearchPage();
    }
  };

  return (
    <div className="min-h-screen bg-[#fcdedc] transition-colors duration-300 text-gray-900">
      <Header />
      {renderCurrentPage()}
    </div>
  );
}

export default App;
