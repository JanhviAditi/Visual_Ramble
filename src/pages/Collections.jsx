import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiFolder, FiTrash2, FiEye } from 'react-icons/fi';
import ImageModal from '../components/ImageModal';
import '../components/ImageGallery.css';

const Collections = ({ onBack }) => {
  const [collections, setCollections] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const savedCollections = JSON.parse(localStorage.getItem('collections')) || [];
    setCollections(savedCollections);
  }, []);

  const deleteCollection = (collectionId) => {
    const updatedCollections = collections.filter(col => col.id !== collectionId);
    setCollections(updatedCollections);
    localStorage.setItem('collections', JSON.stringify(updatedCollections));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
              My Collections
            </h1>
            <div className="w-8"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {collections.length === 0 ? (
          <div className="text-center py-16">
            <FiFolder size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-caveat text-gray-600 mb-2">
              No Collections Yet
            </h3>
            <p className="text-gray-500 font-fredoka">
              Start saving images to create your first collection!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-200"
              >
                {/* Collection Header */}
                <div className="p-6 border-b border-pink-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-caveat text-gray-900 mb-1">
                        {collection.name}
                      </h3>
                      <p className="text-sm text-gray-500 font-fredoka">
                        {collection.images.length} images • {formatDate(collection.createdAt)}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteCollection(collection.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      title="Delete collection"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Images Grid */}
                <div className="p-6">
                  {collection.images.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <p className="font-fredoka">No images yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {collection.images.slice(0, 3).map((image, index) => (
                        <div key={image.id} className="relative">
                          <img
                            src={image.urls.regular}
                            alt={image.alt_description}
                            className="w-full h-32 object-cover rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105"
                            onClick={() => setSelectedImage(image)}
                          />
                          {index === 2 && collection.images.length > 3 && (
                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                              <span className="text-white font-fredoka text-sm">
                                +{collection.images.length - 3} more
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* View All Button */}
                  {collection.images.length > 0 && (
                    <button
                      onClick={() => setSelectedImage(collection.images[0])}
                      className="w-full mt-4 flex items-center justify-center gap-2 py-2 px-4 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors font-fredoka text-sm"
                    >
                      <FiEye size={16} />
                      View All Images
                    </button>
                  )}
                </div>
              </div>
            ))}
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

export default Collections; 