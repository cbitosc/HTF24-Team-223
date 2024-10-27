// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';

const playerStats = [
  { name: "Player 1", stats: { matches: 100, runs: 4500, wickets: 150, average: 45.0, economy: 4.5 } },
  { name: "Player 2", stats: { matches: 120, runs: 5500, wickets: 200, average: 50.0, economy: 4.0 } },
];

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('newsUpdates');
  const [newsUpdates, setNewsUpdates] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    axios.get('/api/news') 
      .then(response => {
        setNewsUpdates(response.data);
      })
      .catch(error => {
        console.error('Error fetching news updates:', error);
      });

    axios.get('/api/upcoming-matches') 
      .then(response => {
        setUpcomingMatches(response.data);
      })
      .catch(error => {
        console.error('Error fetching upcoming matches:', error);
      });

    setLiveMatches([
      { title: 'India vs Australia', score: '250/5' },
      { title: 'Pakistan vs South Africa', score: '200/6' },
    ]);
  }, []);

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
  };

  const renderPlayers = () => (
    <div>
      <h3>Players in Match</h3>
      {selectedMatch.teamA.players.concat(selectedMatch.teamB.players).map((player, index) => (
        <p key={index}>{player}</p>
      ))}
    </div>
  );

  const renderLiveMatches = () => {
    return (
      <div>
        <h2>Live Matches</h2>
        {liveMatches.length === 0 ? (
          <p>No live matches at the moment.</p>
        ) : (
          liveMatches.map((match, index) => (
            <div key={index}>
              <h4>{match.title}</h4>
              <p>Score: {match.score}</p>
            </div>
          ))
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'liveMatches':
        return renderLiveMatches();
      case 'upcomingMatches':
        return (
          <div>
            <h2>Upcoming Matches</h2>
            {upcomingMatches.length === 0 ? (
              <p>No upcoming matches.</p>
            ) : (
              upcomingMatches.map((match, index) => (
                <div key={index}>
                  <h4>{match.format} Match: {match.teamA.name} vs {match.teamB.name}</h4>
                  <button onClick={() => handleMatchClick(match)}>View Players</button>
                </div>
              ))
            )}
            {selectedMatch && renderPlayers()}
          </div>
        );
      case 'personalizedDashboard':
        return (
          <div>
            <h2>Personalized Dashboard</h2>
            <p>Your personalized content will be displayed here.</p>
          </div>
        );
      case 'newsUpdates':
      default:
        return (
          <div>
            <h2>News Updates</h2>
            <ul>
              {newsUpdates.map((update, index) => (
                <li key={index}>{update}</li>
              ))}
            </ul>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h3>Menu</h3>
        <ul>
          <li onClick={() => setActiveSection('liveMatches')}>Live Matches</li>
          <li onClick={() => setActiveSection('upcomingMatches')}>Upcoming Matches</li>
          <li onClick={() => setActiveSection('personalizedDashboard')}>Personalized Dashboard</li>
          <li onClick={() => setActiveSection('newsUpdates')}>News Updates</li>
        </ul>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;