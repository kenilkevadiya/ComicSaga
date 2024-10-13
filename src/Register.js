import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://kz5fsxt838.execute-api.us-east-1.amazonaws.com/dev/register", {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json', // Ensure the content-type is set to JSON
        }
      });

      if (response.status === 200) { // Change to 200 for successful registration
        alert('Registration successful! You can now log in.');
        navigate('/login'); // Redirect to login page
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-brown">Welcome to ComicSaga!</h1>
      <form onSubmit={handleRegister} className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <div className="mb-4">
          <label className="block text-sm font-medium text-navy-blue mb-2">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 p-2" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-navy-blue mb-2">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 p-2" 
            required 
          />
        </div>
        <button 
          type="submit" 
          className="bg-brown text-white hover:bg-burgundy focus:outline-none focus:ring-2 focus:ring-navy-blue/50 rounded-md px-4 py-2 transition"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-burgundy hover:underline">
          Log in here
        </Link>
      </p>
    </div>
  );
};

export default Register;
