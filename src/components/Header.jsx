import { FiHeart, FiFolder } from 'react-icons/fi';

const Header = ({ currentPage, onNavigate, showNav = false }) => {
  return (
    <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-cloud/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => onNavigate?.('search')}
          className="flex items-center gap-2 group"
        >
          <span className="font-display text-xl text-charcoal tracking-tight">
            Visual Ramble
          </span>
        </button>

        {showNav && (
          <nav className="flex items-center gap-1">
            <button
              onClick={() => onNavigate?.('favorites')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all duration-200
                ${currentPage === 'favorites'
                  ? 'bg-sage-100 text-sage-700'
                  : 'text-ash hover:text-charcoal hover:bg-linen'
                }`}
            >
              <FiHeart size={15} />
              <span className="hidden sm:inline">Favorites</span>
            </button>
            <button
              onClick={() => onNavigate?.('collections')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all duration-200
                ${currentPage === 'collections'
                  ? 'bg-sage-100 text-sage-700'
                  : 'text-ash hover:text-charcoal hover:bg-linen'
                }`}
            >
              <FiFolder size={15} />
              <span className="hidden sm:inline">Collections</span>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
