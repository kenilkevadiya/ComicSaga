import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation

const Login = ({ email = '', onLogin }) => {
  const [emailInput, setEmailInput] = useState(email); // Initialize with the email prop
  const [password, setPassword] = useState(''); // Initialize as an empty string
  const navigate = useNavigate();

  // Update emailInput if email prop changes
  useEffect(() => {
    setEmailInput(email);
  }, [email]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        email: emailInput,
        password,
      });

      if (response.status === 200) {
        onLogin(emailInput); // Call the onLogin function with emailInput
        navigate('/'); // Navigate to comics page
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-brown">Welcome Back!</h1>
      <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <div className="mb-4">
          <label className="block text-sm font-medium text-navy-blue mb-2">Email</label>
          <input 
            type="email" 
            value={emailInput} 
            onChange={(e) => setEmailInput(e.target.value)} 
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
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <Link to="/register" className="text-burgundy hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
