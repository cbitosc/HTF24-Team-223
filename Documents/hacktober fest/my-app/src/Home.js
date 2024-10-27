// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>SportIQ</h1>
        <h2>Your Ultimate Hub for Sports Insights and Team Tracking</h2>
      </header>

      <section className="home-content">
        <p>
          SportIQ is an advanced sports analytics platform designed to provide fans with a comprehensive view of game insights and team statistics.
          Track your favorite teams, get match reminders, and dive into in-depth analytics to enhance your sports experience.
        </p>
      </section>

      <div className="home-buttons">
        <Link to="/login" className="home-button">
          Login
        </Link>
        <Link to="/register" className="home-button">
          Register
        </Link>
      </div>

      <section className="home-features">
        <h3>Key Features</h3>
        <ul>
          <li>Personalized Dashboard with Interactive Stats</li>
          <li>Track Performance Across Multiple Leagues</li>
          <li>Match Reminders for Your Favorite Teams</li>
          <li>Player and Team Stats Visualizations</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
