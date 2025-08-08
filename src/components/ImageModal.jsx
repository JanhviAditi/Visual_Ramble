import React, { useState } from 'react';
import { FiX, FiDownload, FiHeart, FiFolder } from 'react-icons/fi';
import CollectionsModal from './CollectionsModal';
import './ImageModal.css';

const ImageModal = ({ image, onClose }) => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [showCollectionsModal, setShowCollectionsModal] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState('');

  const isFavorited = favorites.some(f => f.id === image.id);

  const toggleFavorite = () => {
    const updated = isFavorited
      ? favorites.filter(f => f.id !== image.id)
      : [...favorites, image];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const downloadImage = async (type = 'original') => {
    try {
      setDownloadStatus('downloading');
      
      // Use the direct download method for better compatibility
      const link = document.createElement('a');
      
      if (type === 'desktop') {
        link.download = `wallpaper-desktop-${image.id}.jpg`;
      } else if (type === 'mobile') {
        link.download = `wallpaper-mobile-${image.id}.jpg`;
      } else {
        link.download = `image-${image.id}.jpg`;
      }
      
      // Use the full resolution image URL
      link.href = image.urls.full;
      link.target = '_blank';
      
      // Add to DOM, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus(''), 2000);
      
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadStatus('error');
      setTimeout(() => setDownloadStatus(''), 2000);
    }
  };

  const handleSaveToCollection = (collection) => {
    // The collection is already saved in CollectionsModal
    // This callback can be used for additional actions if needed
    console.log(`Image saved to collection: ${collection.name}`);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button
              onClick={toggleFavorite}
              className="modal-btn"
              title={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <FiHeart fill={isFavorited ? "hotpink" : "none"} />
            </button>
            <button
              onClick={() => setShowCollectionsModal(true)}
              className="modal-btn"
              title="Save to collection"
            >
              <FiFolder />
            </button>
            <button onClick={onClose} className="modal-btn">
              <FiX />
            </button>
          </div>

          {/* Main Image */}
          <img 
            src={image.urls.full} 
            alt={image.alt_description} 
            className="modal-image" 
          />

          {/* Download Buttons */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
            <button
              onClick={() => downloadImage('original')}
              className="bg-white/90 hover:bg-white text-gray-700 px-4 py-2 rounded-full font-fredoka text-sm transition-colors shadow-lg flex items-center"
              disabled={downloadStatus === 'downloading'}
            >
              <FiDownload className="mr-2" />
              {downloadStatus === 'downloading' ? 'Downloading...' : 'Download Image'}
            </button>
            <button
              onClick={() => downloadImage('desktop')}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full font-fredoka text-sm transition-colors shadow-lg"
              disabled={downloadStatus === 'downloading'}
            >
              Desktop Wallpaper
            </button>
            <button
              onClick={() => downloadImage('mobile')}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full font-fredoka text-sm transition-colors shadow-lg"
              disabled={downloadStatus === 'downloading'}
            >
              Mobile Wallpaper
            </button>
          </div>

          {/* Download Status */}
          {downloadStatus && (
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <p className="text-sm font-fredoka">
                {downloadStatus === 'success' ? '✅ Downloaded successfully!' : 
                 downloadStatus === 'error' ? '❌ Download failed' : 
                 '⏳ Downloading...'}
              </p>
            </div>
          )}

          {/* Image Info */}
          <div className="absolute bottom-16 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4">
            <p className="text-gray-700 font-fredoka text-sm">
              {image.alt_description || "Beautiful image"}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Photo by {image.user?.name || "Unknown"} on Unsplash
            </p>
          </div>
        </div>
      </div>

      {/* Collections Modal */}
      {showCollectionsModal && (
        <CollectionsModal
          isOpen={showCollectionsModal}
          onClose={() => setShowCollectionsModal(false)}
          image={image}
          onSave={handleSaveToCollection}
        />
      )}
    </>
  );
};

export default ImageModal;
