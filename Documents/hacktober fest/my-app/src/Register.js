// src/components/Auth/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    favoriteTeam: '',
    nationality: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password || !formData.favoriteTeam || !formData.nationality) {
      setError('Please fill in all fields.');
      return;
    }

    // Save the registration details in localStorage
    localStorage.setItem('registeredEmail', formData.email);
    localStorage.setItem('registeredPassword', formData.password);
    localStorage.setItem('favoriteTeam', formData.favoriteTeam);
    localStorage.setItem('nationality', formData.nationality);

    console.log('Registration successful');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="register-container">
      <h2>Register for SportIQ</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Favorite Team:
          <input
            type="text"
            name="favoriteTeam"
            value={formData.favoriteTeam}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Nationality:
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
          >
            <option value="">Select your nationality</option>
            <option value="India">India</option>
            <option value="Australia">Australia</option>
          </select>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;