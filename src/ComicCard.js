import React from 'react';
import { useNavigate } from 'react-router-dom';

const ComicCard = ({ comic }) => {
  const navigate = useNavigate();

  const handleMoreDetails = () => {
    if (comic.comicID) {
      navigate(`/comic/${comic.comicID}`);  
    } else {
      console.error('comicID is missing');
    }
  };

  const authorName = comic.author ? comic.author.split('@')[0] : 'Unknown';

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-black mb-2">{comic.title || 'No Title'}</h2>
        <p className="text-gray-600 mb-2"><strong>By {authorName}</strong></p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleMoreDetails}
            className="bg-brown text-white hover:bg-burgundy focus:outline-none focus:ring-2 focus:ring-navy-blue/50 rounded-md px-4 py-2 transition"
          >
            More Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComicCard;
















