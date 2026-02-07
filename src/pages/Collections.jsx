import { useState, useEffect } from 'react';
import { FiArrowLeft, FiFolder, FiTrash2, FiChevronRight } from 'react-icons/fi';
import ImageModal from '../components/ImageModal';
import Masonry from 'react-masonry-css';

const Collections = ({ onBack }) => {
  const [collections, setCollections] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setCollections(JSON.parse(localStorage.getItem('collections')) || []);
  }, []);

  const deleteCollection = (id) => {
    const updated = collections.filter((c) => c.id !== id);
    setCollections(updated);
    localStorage.setItem('collections', JSON.stringify(updated));
  };

  const expanded = collections.find((c) => c.id === expandedId);
  const breakpoints = { default: 3, 1024: 2, 640: 2 };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={expandedId ? () => setExpandedId(null) : onBack}
            className="p-2 rounded-lg hover:bg-linen text-ash hover:text-charcoal transition-colors"
          >
            <FiArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-charcoal">
              {expandedId ? expanded?.name : 'Collections'}
            </h1>
            <p className="text-sm text-ash">
              {expandedId
                ? `${expanded?.images.length || 0} images`
                : `${collections.length} collection${collections.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>

        {!expandedId ? (
          /* Collection cards */
          collections.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-linen flex items-center justify-center mx-auto mb-4">
                <FiFolder className="text-ash" size={24} />
              </div>
              <h3 className="text-base font-medium text-charcoal mb-1">
                No collections yet
              </h3>
              <p className="text-sm text-ash">
                Save images to collections to organize them
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {collections.map((col) => (
                <div
                  key={col.id}
                  className="bg-white rounded-2xl border border-cloud overflow-hidden hover:shadow-md transition-all duration-200 group"
                >
                  {/* Preview images */}
                  <div
                    className="h-36 bg-linen grid grid-cols-3 gap-0.5 cursor-pointer overflow-hidden"
                    onClick={() => setExpandedId(col.id)}
                  >
                    {col.images.slice(0, 3).map((img, i) => (
                      <img
                        key={img.id}
                        src={img.urls.small}
                        alt=""
                        className={`w-full h-full object-cover ${
                          i === 0 ? 'col-span-2 row-span-1' : ''
                        }`}
                      />
                    ))}
                    {col.images.length === 0 && (
                      <div className="col-span-3 flex items-center justify-center">
                        <FiFolder className="text-cloud" size={32} />
                      </div>
                    )}
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <div
                      className="cursor-pointer flex-1"
                      onClick={() => setExpandedId(col.id)}
                    >
                      <p className="text-sm font-medium text-charcoal">
                        {col.name}
                      </p>
                      <p className="text-xs text-ash">
                        {col.images.length} images
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => deleteCollection(col.id)}
                        className="p-1.5 rounded-lg text-ash hover:text-red-400 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <FiTrash2 size={14} />
                      </button>
                      <button
                        onClick={() => setExpandedId(col.id)}
                        className="p-1.5 rounded-lg text-ash hover:text-charcoal hover:bg-linen transition-colors"
                      >
                        <FiChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : /* Expanded collection */
        expanded?.images.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sm text-ash">This collection is empty</p>
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpoints}
            className="flex -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {expanded.images.map((img) => (
              <div
                key={img.id}
                className="mb-4 rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img.urls.regular}
                  alt={img.alt_description}
                  className="w-full block rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                />
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

export default Collections; 