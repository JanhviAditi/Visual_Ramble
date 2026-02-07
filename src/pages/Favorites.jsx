import { useState, useEffect } from 'react';
import { FiArrowLeft, FiHeart, FiTrash2 } from 'react-icons/fi';
import ImageModal from '../components/ImageModal';
import Masonry from 'react-masonry-css';

const Favorites = ({ onBack }) => {
  const [favorites, setFavorites] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorites')) || []);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((img) => img.id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const breakpoints = { default: 4, 1280: 3, 900: 2, 640: 2 };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-linen text-ash hover:text-charcoal transition-colors"
          >
            <FiArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-charcoal">Favorites</h1>
            <p className="text-sm text-ash">
              {favorites.length} image{favorites.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-linen flex items-center justify-center mx-auto mb-4">
              <FiHeart className="text-ash" size={24} />
            </div>
            <h3 className="text-base font-medium text-charcoal mb-1">
              No favorites yet
            </h3>
            <p className="text-sm text-ash">
              Heart images to save them here
            </p>
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpoints}
            className="flex -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {favorites.map((img) => (
              <div
                key={img.id}
                className="mb-4 relative group rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img.urls.regular}
                  alt={img.alt_description}
                  className="w-full block rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(img.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 text-ash hover:text-red-400 hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm"
                  title="Remove from favorites"
                >
                  <FiTrash2 size={14} />
                </button>
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FiHeart
                    size={14}
                    className="text-rose-400"
                    fill="currentColor"
                  />
                </div>
              </div>
            ))}
          </Masonry>
        )}
      </div>

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