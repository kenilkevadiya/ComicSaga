import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import ComicPage from './ComicPage';
import AddComicPage from './AddComicPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = (userEmail) => {
    setIsAuthenticated(true);
    setEmail(userEmail);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
  };


  return (
    <Routes>
      <Route path="/" element={<HomePage email={email} />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add-comic" element={<AddComicPage email={email} />} />
      <Route path="/comic/:comicID" element={<ComicPage/>} />
    </Routes>
  );
}

export default App;
