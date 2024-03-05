
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage.js';
import Home from './pages/Home.js';
import AdminHome from './pages/AdminHome.js';
import BrowseItems from './pages/BrowseItems.js';
import YourCollection from './pages/YourCollection.js';
import SharedCollections from './pages/SharedCollections.js';
import TradeOffers from './pages/TradeOffers.js';
import CompareCollections from './pages/CompareCollections.js';
import MakeTrade from './pages/MakeTrade.js';
import './styles/App.css';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h2>CollectionOrganizer</h2>
        </header>
        <main className="main-container">
          <Routes>
            <Route path="/" element={<AuthPage onLogin={handleLogin} />} />
            <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
            <Route path="/adminhome" element={isLoggedIn ? <AdminHome /> : <Navigate to="/" />} />
            <Route path="/browse-items" element={isLoggedIn ? <BrowseItems /> : <Navigate to="/" />} />
            <Route path="/your-collection" element={isLoggedIn ? <YourCollection /> : <Navigate to="/" />} />
            <Route path="/shared-collections" element={isLoggedIn ? <SharedCollections /> : <Navigate to="/" />} />
            <Route path="/trade-offers" element={isLoggedIn ? <TradeOffers /> : <Navigate to="/" />} />
            <Route path="/compare-collections" element={isLoggedIn ? <CompareCollections /> : <Navigate to="/" />} />
            <Route path="/make-trade" element={isLoggedIn ? <MakeTrade /> : <Navigate to="/" />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>&copy;2023 CollectionOrganizer by Igor Irzycki - application project for the purpose of the diploma thesis.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
