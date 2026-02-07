import { useState, useEffect } from 'react';
import { FiX, FiDownload, FiHeart, FiFolder, FiExternalLink } from 'react-icons/fi';
import CollectionsModal from './CollectionsModal';

const ImageModal = ({ image, onClose }) => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [showCollections, setShowCollections] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const isFav = favorites.some((f) => f.id === image.id);

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const toggleFavorite = () => {
    const updated = isFav
      ? favorites.filter((f) => f.id !== image.id)
      : [...favorites, image];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const link = document.createElement('a');
      link.href = image.urls.full;
      link.download = `visual-ramble-${image.id}.jpg`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setTimeout(() => setDownloading(false), 1500);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        onClick={onClose}
      >
        <div
          className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between p-4 border-b border-cloud">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFavorite}
                className={`p-2 rounded-lg transition-all duration-200
                  ${isFav
                    ? 'bg-rose-50 text-rose-500'
                    : 'hover:bg-linen text-ash hover:text-charcoal'
                  }`}
                title={isFav ? 'Unfavorite' : 'Favorite'}
              >
                <FiHeart size={18} fill={isFav ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={() => setShowCollections(true)}
                className="p-2 rounded-lg hover:bg-linen text-ash hover:text-charcoal transition-all duration-200"
                title="Save to collection"
              >
                <FiFolder size={18} />
              </button>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="p-2 rounded-lg hover:bg-linen text-ash hover:text-charcoal transition-all duration-200"
                title="Download"
              >
                <FiDownload size={18} />
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-linen text-ash hover:text-charcoal transition-all duration-200"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Image */}
          <div className="flex items-center justify-center bg-linen overflow-hidden">
            <img
              src={image.urls.regular}
              alt={image.alt_description || 'Image'}
              className="max-h-[65vh] w-auto object-contain"
            />
          </div>

          {/* Info */}
          <div className="p-4 border-t border-cloud">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-charcoal font-medium truncate">
                  {image.alt_description || 'Untitled'}
                </p>
                <p className="text-xs text-ash mt-0.5">
                  Photo by {image.user?.name || 'Unknown'} on Unsplash
                </p>
              </div>
              {image.links?.html && (
                <a
                  href={image.links.html}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ash hover:text-mist-500 transition-colors ml-3 flex-shrink-0"
                  title="View on Unsplash"
                >
                  <FiExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {showCollections && (
        <CollectionsModal
          isOpen={showCollections}
          onClose={() => setShowCollections(false)}
          image={image}
          onSave={() => setShowCollections(false)}
        />
      )}
    </>
  );
};

export default ImageModal;
