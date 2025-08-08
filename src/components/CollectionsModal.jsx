import React, { useState, useEffect } from 'react';
import { FiX, FiPlus, FiFolder } from 'react-icons/fi';

const CollectionsModal = ({ isOpen, onClose, image, onSave }) => {
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [showNewCollectionForm, setShowNewCollectionForm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedCollections = JSON.parse(localStorage.getItem('collections')) || [];
      setCollections(savedCollections);
      console.log('Loaded collections:', savedCollections);
    }
  }, [isOpen]);

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      const newCollection = {
        id: Date.now(),
        name: newCollectionName.trim(),
        images: [image],
        createdAt: new Date().toISOString()
      };
      
      const updatedCollections = [...collections, newCollection];
      setCollections(updatedCollections);
      localStorage.setItem('collections', JSON.stringify(updatedCollections));
      console.log('Created new collection:', newCollection);
      setNewCollectionName('');
      setShowNewCollectionForm(false);
      onSave(newCollection);
      onClose();
    }
  };

  const handleAddToCollection = (collection) => {
    const updatedCollections = collections.map(col => {
      if (col.id === collection.id) {
        const imageExists = col.images.some(img => img.id === image.id);
        if (!imageExists) {
          const updatedCollection = { ...col, images: [...col.images, image] };
          console.log('Added image to collection:', updatedCollection);
          return updatedCollection;
        } else {
          console.log('Image already exists in collection');
        }
      }
      return col;
    });
    
    setCollections(updatedCollections);
    localStorage.setItem('collections', JSON.stringify(updatedCollections));
    console.log('Updated collections in localStorage');
    onSave(collection);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-caveat text-gray-900">
              Save to Collection
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Preview Image */}
          <div className="mb-6">
            <img
              src={image?.urls?.small}
              alt={image?.alt_description}
              className="w-full h-32 object-cover rounded-xl"
            />
          </div>

          {/* Collections List */}
          <div className="space-y-3 mb-6">
            {collections.length === 0 ? (
              <p className="text-gray-500 text-center font-fredoka">
                No collections yet. Create your first one!
              </p>
            ) : (
              collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => handleAddToCollection(collection)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-pink-50 transition-colors"
                >
                  <FiFolder className="text-pink-400" size={20} />
                  <div className="text-left">
                    <p className="font-fredoka text-gray-900">
                      {collection.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {collection.images.length} images
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Create New Collection */}
          {!showNewCollectionForm ? (
            <button
              onClick={() => setShowNewCollectionForm(true)}
              className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-pink-300 rounded-xl text-pink-500 hover:bg-pink-50 transition-colors"
            >
              <FiPlus size={20} />
              <span className="font-fredoka">Create New Collection</span>
            </button>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Collection name..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 font-fredoka focus:outline-none focus:ring-2 focus:ring-pink-300"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreateCollection}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-xl font-fredoka transition-colors"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowNewCollectionForm(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-fredoka transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionsModal; 