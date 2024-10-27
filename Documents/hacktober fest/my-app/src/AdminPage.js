// src/components/Admin.js
import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const Admin = () => {
  const [matchFormat, setMatchFormat] = useState(''); // State to manage the match format
  const [teamAName, setTeamAName] = useState('');
  const [teamBName, setTeamBName] = useState('');
  const [teamAPlayers, setTeamAPlayers] = useState([]);
  const [teamBPlayers, setTeamBPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [playerType, setPlayerType] = useState('');
  const [newsUpdate, setNewsUpdate] = useState('');
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  useEffect(() => {
    const matches = JSON.parse(localStorage.getItem('upcomingMatches')) || [];
    setUpcomingMatches(matches);
  }, []);

  const handleAddPlayerToTeamA = () => {
    if (playerName && playerType) {
      setTeamAPlayers([...teamAPlayers, { name: playerName, type: playerType }]);
      setPlayerName('');
      setPlayerType('');
    }
  };

  const handleAddPlayerToTeamB = () => {
    if (playerName && playerType) {
      setTeamBPlayers([...teamBPlayers, { name: playerName, type: playerType }]);
      setPlayerName('');
      setPlayerType('');
    }
  };

  const handleSubmitMatch = () => {
    const newMatch = {
      format: matchFormat, // Store match format instead of title
      teamA: { name: teamAName, players: teamAPlayers },
      teamB: { name: teamBName, players: teamBPlayers },
    };
    const updatedMatches = [...upcomingMatches, newMatch];
    localStorage.setItem('upcomingMatches', JSON.stringify(updatedMatches));
    setUpcomingMatches(updatedMatches);

    // Reset fields
    setMatchFormat('');
    setTeamAName('');
    setTeamBName('');
    setTeamAPlayers([]);
    setTeamBPlayers([]);
  };

  const handleRemoveMatch = (index) => {
    const updatedMatches = upcomingMatches.filter((_, i) => i !== index);
    localStorage.setItem('upcomingMatches', JSON.stringify(updatedMatches));
    setUpcomingMatches(updatedMatches);
  };

  const handleAddNews = () => {
    const newsUpdates = JSON.parse(localStorage.getItem('newsUpdates')) || [];
    newsUpdates.push(newsUpdate);
    localStorage.setItem('newsUpdates', JSON.stringify(newsUpdates));
    setNewsUpdate('');
  };

  return (
    <div className="admin-container">
      <h2>Admin Page</h2>

      <div>
        <h3>Add Upcoming Match</h3>
        
        <label htmlFor="matchFormat">Match Format</label>
        <select
          id="matchFormat"
          onChange={(e) => setMatchFormat(e.target.value)}
          value={matchFormat}
        >
          <option value="">Select Format</option>
          <option value="ODI">ODI</option>
          <option value="Test">Test</option>
          <option value="T20">T20</option>
        </select>

        <input
          type="text"
          placeholder="Team A Name"
          value={teamAName}
          onChange={(e) => setTeamAName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Team B Name"
          value={teamBName}
          onChange={(e) => setTeamBName(e.target.value)}
        />

        <h4>Team A Players</h4>
        <input
          type="text"
          placeholder="Player Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <select onChange={(e) => setPlayerType(e.target.value)} value={playerType}>
          <option value="">Select Type</option>
          <option value="Batsman">Batsman</option>
          <option value="Bowler (Pacer)">Bowler (Pacer)</option>
          <option value="Bowler (Spinner)">Bowler (Spinner)</option>
          <option value="All Rounder">All Rounder</option>
          <option value="Wicketkeeper">Wicketkeeper</option>
        </select>
        <button onClick={handleAddPlayerToTeamA}>Add to Team A</button>

        <h4>Team B Players</h4>
        <input
          type="text"
          placeholder="Player Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <select onChange={(e) => setPlayerType(e.target.value)} value={playerType}>
          <option value="">Select Type</option>
          <option value="Batsman">Batsman</option>
          <option value="Bowler (Pacer)">Bowler (Pacer)</option>
          <option value="Bowler (Spinner)">Bowler (Spinner)</option>
          <option value="All Rounder">All Rounder</option>
          <option value="Wicketkeeper">Wicketkeeper</option>
        </select>
        <button onClick={handleAddPlayerToTeamB}>Add to Team B</button>

        <button onClick={handleSubmitMatch}>Submit Match</button>
      </div>

      <div>
        <h3>Upcoming Matches</h3>
        {upcomingMatches.map((match, index) => (
          <div key={index}>
            <h4>{match.format} Match: {match.teamA.name} vs {match.teamB.name}</h4>
            <button onClick={() => handleRemoveMatch(index)}>Remove Match</button>
          </div>
        ))}
      </div>

      <div>
        <h3>Add News Update</h3>
        <input
          type="text"
          placeholder="News Update"
          value={newsUpdate}
          onChange={(e) => setNewsUpdate(e.target.value)}
        />
        <button onClick={handleAddNews}>Submit News</button>
      </div>
    </div>
  );
};

export default Admin;
