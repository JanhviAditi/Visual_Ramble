import { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';
import Masonry from 'react-masonry-css';

const ImageGallery = ({ images, onImageClick }) => {
  const [favorites, setFavorites] = useState([]);
  const [loadedImages, setLoadedImages] = useState(new Set());

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(saved);
  }, []);

  const toggleFavorite = (e, img) => {
    e.stopPropagation();
    const updated = favorites.some((f) => f.id === img.id)
      ? favorites.filter((f) => f.id !== img.id)
      : [...favorites, img];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => new Set([...prev, id]));
  };

  const breakpoints = {
    default: 4,
    1280: 3,
    900: 2,
    640: 2,
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Masonry
        breakpointCols={breakpoints}
        className="flex -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {images.map((img, index) => {
          const isFav = favorites.some((f) => f.id === img.id);
          return (
            <div
              key={img.id}
              className="mb-4 group relative rounded-xl overflow-hidden cursor-pointer animate-fade-in"
              style={{ animationDelay: `${(index % 20) * 30}ms` }}
              onClick={() => onImageClick(img)}
            >
              {/* Skeleton loader */}
              {!loadedImages.has(img.id) && (
                <div className="absolute inset-0 bg-linen animate-pulse rounded-xl aspect-[3/4]" />
              )}

              <img
                src={img.urls.regular}
                alt={img.alt_description || 'Image'}
                className={`w-full block rounded-xl transition-all duration-500
                  ${loadedImages.has(img.id) ? 'opacity-100' : 'opacity-0'}
                  group-hover:scale-[1.02]`}
                onLoad={() => handleImageLoad(img.id)}
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

              {/* Favorite button */}
              <button
                onClick={(e) => toggleFavorite(e, img)}
                className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center
                  transition-all duration-200
                  ${isFav
                    ? 'bg-white text-rose-500 shadow-md'
                    : 'bg-white/0 text-white opacity-0 group-hover:opacity-100 group-hover:bg-white/80 group-hover:text-charcoal hover:!text-rose-500'
                  }`}
                title={isFav ? 'Remove from favorites' : 'Add to favorites'}
              >
                <FiHeart size={15} fill={isFav ? 'currentColor' : 'none'} />
              </button>

              {/* Photo credit */}
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs truncate drop-shadow-sm">
                  {img.user?.name}
                </p>
              </div>
            </div>
          );
        })}
      </Masonry>
    </div>
  );
};

export default ImageGallery;
