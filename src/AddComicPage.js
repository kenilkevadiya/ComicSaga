import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddComicPage = ({ email }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);
  const [contentType, setContentType] = useState(''); // State to store image content type
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file && validTypes.includes(file.type) && file.size <= maxSize) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result.split(',')[1]); // Get base64 string of image
        setContentType(file.type); // Set content type of the image
      };
      reader.readAsDataURL(file); // Read file as base64 string
    } else {
      alert('Please select a valid image file (JPEG, PNG, GIF) less than 5MB.');
      setImage(null);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!image) {
  //     alert('Please upload an image.');
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const response = await axios.post("https://kz5fsxt838.execute-api.us-east-1.amazonaws.com/dev/addComics", {
  //       title,
  //       content,
  //       author,
  //       image   // convert to base 64 and then uupload       
  //     }, {
  //       headers: {
  //         'Content-Type': 'application/json', // Ensure the content-type is set to JSON
  //       }
  //     });
  //     console.error('response adding comic:', response);
  //        alert('Comic added successfully!');
  //     navigate('/');
  //   } catch (err) {
  //     console.error('Error adding comic:', err);
  //     alert('Error adding comic. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!image) {
      alert('Please upload an image.');
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post("https://kz5fsxt838.execute-api.us-east-1.amazonaws.com/dev/addComics", {
        title,
        content,
        author,
        image: `data:${contentType};base64,${image}`,  // Combine content type with base64 image data
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      alert('Comic added successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error adding comic:', err);
      alert('Error adding comic. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <header className="flex justify-between items-center mb-8 bg-burgundy text-white p-6 mt-8 mr-36 ml-36 rounded-lg shadow-lg">
        <span className="text-3xl font-extrabold cursor-pointer" onClick={() => navigate('/')}>ComicSaga</span>
      </header>
      <div className="container mx-auto p-6 max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-brown">Add a New Comic</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-4 border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-navy-blue mb-2">Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 p-2" 
              placeholder="Enter comic title"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-blue mb-2">Content</label>
            <textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 p-2" 
              placeholder="Enter comic content"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-blue mb-2">Author</label>
            <input 
              type="text" 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)} 
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 p-2" 
              placeholder="Enter author name"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-blue mb-2">Comic Image</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 p-2"
              required
            />
          </div>
          <button 
            type="submit" 
            className={`bg-brown text-white hover:bg-burgundy focus:outline-none focus:ring-2 focus:ring-navy-blue/50 rounded-md px-4 py-2 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddComicPage;
