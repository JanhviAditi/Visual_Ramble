// LocalStorage helper functions for managing app data

export const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
};

export const setFavorites = (favorites) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

export const getCollections = () => {
  try {
    return JSON.parse(localStorage.getItem('collections')) || [];
  } catch (error) {
    console.error('Error reading collections from localStorage:', error);
    return [];
  }
};

export const setCollections = (collections) => {
  try {
    localStorage.setItem('collections', JSON.stringify(collections));
  } catch (error) {
    console.error('Error saving collections to localStorage:', error);
  }
};

export const getKeywordHistory = () => {
  try {
    return JSON.parse(localStorage.getItem('keywordHistory')) || [];
  } catch (error) {
    console.error('Error reading keyword history from localStorage:', error);
    return [];
  }
};

export const setKeywordHistory = (history) => {
  try {
    localStorage.setItem('keywordHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Error saving keyword history to localStorage:', error);
  }
};

export const getTheme = () => {
  return localStorage.getItem('theme') || 'light';
};

export const setTheme = (theme) => {
  localStorage.setItem('theme', theme);
};

// Add image to favorites
export const addToFavorites = (image) => {
  const favorites = getFavorites();
  if (!favorites.some(f => f.id === image.id)) {
    const updatedFavorites = [...favorites, image];
    setFavorites(updatedFavorites);
    return true;
  }
  return false;
};

// Remove image from favorites
export const removeFromFavorites = (imageId) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(f => f.id !== imageId);
  setFavorites(updatedFavorites);
  return updatedFavorites;
};

// Add image to collection
export const addToCollection = (collectionId, image) => {
  const collections = getCollections();
  const updatedCollections = collections.map(col => {
    if (col.id === collectionId) {
      const imageExists = col.images.some(img => img.id === image.id);
      if (!imageExists) {
        return { ...col, images: [...col.images, image] };
      }
    }
    return col;
  });
  setCollections(updatedCollections);
  return updatedCollections;
};

// Create new collection
export const createCollection = (name, image) => {
  const collections = getCollections();
  const newCollection = {
    id: Date.now(),
    name: name.trim(),
    images: image ? [image] : [],
    createdAt: new Date().toISOString()
  };
  const updatedCollections = [...collections, newCollection];
  setCollections(updatedCollections);
  return newCollection;
};

// Delete collection
export const deleteCollection = (collectionId) => {
  const collections = getCollections();
  const updatedCollections = collections.filter(col => col.id !== collectionId);
  setCollections(updatedCollections);
  return updatedCollections;
}; 