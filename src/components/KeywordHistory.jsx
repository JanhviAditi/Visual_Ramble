import React from 'react';

const KeywordHistory = ({ history, onKeywordClick }) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-sm font-fredoka text-gray-600 dark:text-gray-400 mb-3 text-center">
        Recent Searches
      </h3>
      <div className="flex flex-wrap justify-center gap-2">
        {history.slice(0, 8).map((keyword, index) => (
          <button
            key={index}
            onClick={() => onKeywordClick(keyword)}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-sm px-4 py-2 rounded-full hover:bg-pink-100 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md font-fredoka text-gray-700 dark:text-gray-300 border border-pink-200 dark:border-gray-600"
          >
            {keyword}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeywordHistory; 