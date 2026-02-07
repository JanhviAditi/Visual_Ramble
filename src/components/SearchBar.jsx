import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiX, FiClock, FiTrash2 } from 'react-icons/fi';

const SearchBar = ({
  onSearch,
  placeholder,
  history = [],
  onDeleteHistoryItem,
  onClearHistory,
  compact = false,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  const filteredHistory = query.trim()
    ? history.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      )
    : history;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const handleSelect = (item) => {
    setQuery(item);
    onSearch(item);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isOpen || filteredHistory.length === 0) {
      if (e.key === 'ArrowDown' && history.length > 0) {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredHistory.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredHistory.length - 1
      );
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredHistory[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const showDropdown = isOpen && filteredHistory.length > 0;

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full ${compact ? 'max-w-lg' : 'max-w-xl'} mx-auto`}
    >
      <form onSubmit={handleSubmit}>
        <div
          className={`relative flex items-center bg-white border border-cloud
            ${compact ? 'rounded-xl' : 'rounded-2xl'}
            shadow-sm hover:shadow-md focus-within:shadow-md focus-within:border-mist-200
            transition-all duration-200
            ${showDropdown ? 'rounded-b-none border-b-transparent' : ''}`}
        >
          <FiSearch
            className="absolute left-4 text-ash"
            size={compact ? 16 : 18}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setHighlightedIndex(-1);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || 'Search for anything...'}
            className={`w-full bg-transparent
              ${compact ? 'pl-10 pr-10 py-2.5 text-sm' : 'pl-12 pr-12 py-3.5 text-base'}
              text-charcoal placeholder:text-stone-400 focus:outline-none`}
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="absolute right-4 text-ash hover:text-charcoal transition-colors"
            >
              <FiX size={compact ? 14 : 16} />
            </button>
          )}
        </div>
      </form>

      {/* Dropdown */}
      {showDropdown && (
        <div
          className={`absolute z-50 w-full bg-white border border-cloud border-t-0
            ${compact ? 'rounded-b-xl' : 'rounded-b-2xl'}
            shadow-md animate-fade-in overflow-hidden`}
        >
          <div className="max-h-64 overflow-y-auto">
            {filteredHistory.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between px-4 py-2.5 cursor-pointer
                  transition-colors group
                  ${highlightedIndex === index ? 'bg-mist-50' : 'hover:bg-linen'}`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FiClock className="text-ash flex-shrink-0" size={14} />
                  <span className="text-sm text-charcoal truncate">{item}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteHistoryItem?.(item);
                  }}
                  className="text-ash hover:text-red-400 opacity-0 group-hover:opacity-100
                    transition-all p-1 flex-shrink-0"
                  title="Remove"
                >
                  <FiX size={12} />
                </button>
              </div>
            ))}
          </div>
          {history.length > 1 && (
            <div className="border-t border-cloud px-4 py-2">
              <button
                onClick={() => {
                  onClearHistory?.();
                  setIsOpen(false);
                }}
                className="text-xs text-ash hover:text-mist-500 transition-colors
                  flex items-center gap-1.5"
              >
                <FiTrash2 size={11} />
                Clear search history
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
