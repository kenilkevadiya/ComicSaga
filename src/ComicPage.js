import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ComicPage = ({ username }) => {
  const { comicID } = useParams();  // Get comicID from URL params
  const [comic, setComic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComicDetails = async () => {
      try {
        if (!comicID) {
          console.error("No comicID found in params");
          return;
        }

        console.log("Fetching comic details for ID:", comicID); // Debug log

        // Fetch comic details using comicID
        const response = await axios.get(`https://ps7jokttyhdcy4l3ga3itapdlq0ajjqt.lambda-url.us-east-1.on.aws`, {
          params: { comicID }  // Pass comicID as a query parameter
        });
        console.log("Response data:", response.data); // Debug log
        setComic(response.data);
      } catch (err) {
        console.error('Error fetching comic details:', err);
      }
    };

    fetchComicDetails();
  }, [comicID]);  // Dependency on comicID

  const handleLikeComic = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/like-comic`, 
        { comicID: comic.comicID },  // Use comicID from state
        { headers: { username } }
      );
      if (response.status === 201) {
        alert('Comic liked successfully');
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert('Comic already liked');
      } else {
        console.error('Error liking comic:', err);
        alert('An error occurred while saving the comic');
      }
    }
  };

  const navigateToHomepage = () => {
    navigate('/');
  };

  if (!comic) return <p className="text-center text-gray-600">Loading...</p>;

  const authorName = comic.author ? comic.author.split('@')[0] : 'Unknown';

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <header className="flex justify-between items-center mb-8 bg-burgundy text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-6">
          <span className="text-3xl font-extrabold cursor-pointer hover:text-gray-300 transition" onClick={navigateToHomepage}>ComicSaga</span>
        </div>
        <div className="flex items-center space-x-4">
        </div>
      </header>
      <h1 className="text-3xl font-bold mb-4 text-black">{comic.title}</h1>
      <p className="text-gray-600 mb-2"><strong>By {authorName}</strong></p>
      <div className="bg-gray-50 p-4 rounded-md shadow-inner mb-6">
        <img src={comic.imageUrl} alt={comic.title} className="mb-4" />
        <p className="text-gray-800">{comic.content}</p>
      </div>
    </div>
  );
};

export default ComicPage;