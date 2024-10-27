// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import AdminPage from './AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminpage" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;