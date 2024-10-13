import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ComicCard from './ComicCard'; // Import the ComicCard component
import { useNavigate } from 'react-router-dom';

const HomePage = ({ email }) => {
  const [comics, setComics] = useState([]); // Initialize comics as an empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  // const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/comics`);
        const data = JSON.parse(response.data.body); // Parse the response body
        setComics(data.comics || []); // Use an empty array if comics is undefined
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching comics:', error);
        setError('Failed to fetch comics.'); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchComics();
  }, []);


  const handleAddComicClick = () => {
    navigate('/add-comic'); // Redirect to the Add Comic page
  };

  const onLogout = () => {
    navigate('/login');
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>; // Loading state
  if (error) return <p className="text-center text-red-600">{error}</p>; // Error state

  const firstLetter = email ? email.charAt(0).toUpperCase() : '';

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <header className="flex justify-between items-center mb-8 bg-burgundy text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-6">
          <span className="text-3xl font-extrabold cursor-pointer hover:text-gray-300 transition" onClick={() => window.location.href = '/'}>ComicSaga</span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={onLogout} className="bg-white text-brown border-2 border-burgundy hover:bg-brown-100 hover:border-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy rounded-md px-4 py-2 transition"><strong>Logout</strong></button>
          <button onClick={handleAddComicClick} className="bg-white text-brown border-2 border-burgundy hover:bg-brown-100 hover:border-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy rounded-md px-4 py-2 transition"><strong>Add Comic</strong></button>

          <div className="w-10 h-10 bg-white border-2 border-navy-blue flex items-center justify-center rounded-full">
            <span className="text-brown text-xl font-bold">{firstLetter}</span>
          </div>
        </div>
      </header>
      {/* <div className="flex flex-col md:flex-row items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search comic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input bg-white border border-gray-300 text-gray-800 rounded-md shadow-sm px-4 py-2 w-full md:w-1/2"
        />
        <button
          onClick={handleSearch}
          className="bg-brown text-white hover:bg-burgundy focus:ring-2 focus:ring-green-500 rounded-md px-4 py-2 transition w-full md:w-auto"
        >
          Search
        </button>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {comics && comics.length > 0 ? (
          comics.map((comic) => (
            <ComicCard key={comic.comicID} comic={comic} />
          ))
        ) : (
          <p>No comics available</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
