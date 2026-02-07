import { useState, useEffect } from 'react';
import { FiX, FiPlus, FiFolder, FiCheck } from 'react-icons/fi';

const CollectionsModal = ({ isOpen, onClose, image, onSave }) => {
  const [collections, setCollections] = useState([]);
  const [newName, setNewName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [savedTo, setSavedTo] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setCollections(JSON.parse(localStorage.getItem('collections')) || []);
      setSavedTo(null);
    }
  }, [isOpen]);

  const createCollection = () => {
    if (!newName.trim()) return;
    const newCol = {
      id: Date.now(),
      name: newName.trim(),
      images: [image],
      createdAt: new Date().toISOString(),
    };
    const updated = [...collections, newCol];
    setCollections(updated);
    localStorage.setItem('collections', JSON.stringify(updated));
    setNewName('');
    setShowForm(false);
    setSavedTo(newCol.id);
    setTimeout(() => {
      onSave?.(newCol);
      onClose();
    }, 800);
  };

  const addToCollection = (col) => {
    const updated = collections.map((c) => {
      if (c.id === col.id && !c.images.some((img) => img.id === image.id)) {
        return { ...c, images: [...c.images, image] };
      }
      return c;
    });
    setCollections(updated);
    localStorage.setItem('collections', JSON.stringify(updated));
    setSavedTo(col.id);
    setTimeout(() => {
      onSave?.(col);
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-sm w-full animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-charcoal">
              Save to Collection
            </h3>
            <button
              onClick={onClose}
              className="text-ash hover:text-charcoal p-1 transition-colors"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Image preview */}
          <div className="mb-4 rounded-xl overflow-hidden">
            <img
              src={image?.urls?.small}
              alt=""
              className="w-full h-24 object-cover"
            />
          </div>

          {/* Collections list */}
          <div className="space-y-1.5 mb-4 max-h-48 overflow-y-auto">
            {collections.length === 0 ? (
              <p className="text-sm text-ash text-center py-4">
                No collections yet
              </p>
            ) : (
              collections.map((col) => (
                <button
                  key={col.id}
                  onClick={() => addToCollection(col)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-linen transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sage-50 flex items-center justify-center">
                      <FiFolder className="text-sage-500" size={14} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-charcoal">{col.name}</p>
                      <p className="text-xs text-ash">
                        {col.images.length} images
                      </p>
                    </div>
                  </div>
                  {savedTo === col.id && (
                    <FiCheck className="text-sage-500" size={16} />
                  )}
                </button>
              ))
            )}
          </div>

          {/* New collection */}
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center justify-center gap-2 p-2.5 border border-dashed border-cloud rounded-xl text-ash hover:text-charcoal hover:border-mist-200 transition-all text-sm"
            >
              <FiPlus size={14} />
              New Collection
            </button>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && createCollection()}
                placeholder="Collection name"
                className="w-full px-3 py-2 text-sm rounded-xl border border-cloud bg-white text-charcoal focus:outline-none focus:border-mist-300 transition-colors"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={createCollection}
                  className="flex-1 py-2 text-sm bg-sage-500 text-white rounded-xl hover:bg-sage-600 transition-colors"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2 text-sm bg-linen text-ash rounded-xl hover:bg-cloud transition-colors"
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