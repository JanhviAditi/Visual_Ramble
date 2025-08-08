import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiHeart, FiTrash2 } from 'react-icons/fi';
import ImageModal from '../components/ImageModal';
import Masonry from 'react-masonry-css';
import '../components/ImageGallery.css';

const Favorites = ({ onBack }) => {
  const [favorites, setFavorites] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (imageId) => {
    const updatedFavorites = favorites.filter(img => img.id !== imageId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const breakpointColumnsObj = {
    default: 4,
    1400: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className="min-h-screen bg-[#fcdedc] transition-colors duration-300">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-pink-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors font-fredoka"
            >
              <FiArrowLeft size={20} />
              Back to Search
            </button>
            <h1 className="text-2xl font-caveat text-gray-900">
              My Favorites
            </h1>
            <div className="w-8"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <FiHeart size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-caveat text-gray-600 mb-2">
              No Favorites Yet
            </h3>
            <p className="text-gray-500 font-fredoka">
              Start hearting images to see them here!
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-caveat text-gray-700">
                {favorites.length} favorite{favorites.length !== 1 ? 's' : ''}
              </h2>
            </div>
            
            <div className="image-gallery-container">
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {favorites.map((img) => (
                  <div key={img.id} className="image-item">
                    <img
                      src={img.urls.regular}
                      alt={img.alt_description}
                      onClick={() => setSelectedImage(img)}
                      className="image-tile"
                    />
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <button
                        onClick={() => removeFavorite(img.id)}
                        className="favorite-button bg-red-500 hover:bg-red-600"
                        title="Remove from favorites"
                      >
                        <FiTrash2 size={18} />
                      </button>
                      <div className="favorite-button bg-pink-500">
                        <FiHeart size={18} fill="white" />
                      </div>
                    </div>
                  </div>
                ))}
              </Masonry>
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default Favorites; 