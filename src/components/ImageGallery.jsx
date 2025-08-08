import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import Masonry from 'react-masonry-css';
import './ImageGallery.css';

const ImageGallery = ({ images, onImageClick }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (img) => {
    const updated = favorites.some((f) => f.id === img.id)
      ? favorites.filter((f) => f.id !== img.id)
      : [...favorites, img];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const breakpointColumnsObj = {
    default: 4,
    1400: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className="image-gallery-container">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((img) => (
          <div key={img.id} className="image-item">
            <img
              src={img.urls.regular}
              alt={img.alt_description}
              onClick={() => onImageClick(img)}
              className="image-tile"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(img);
              }}
              className="favorite-button"
              title={favorites.some((f) => f.id === img.id) ? "Remove from favorites" : "Add to favorites"}
            >
              <FaHeart fill={favorites.some((f) => f.id === img.id) ? 'hotpink' : 'none'} />
            </button>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default ImageGallery;
