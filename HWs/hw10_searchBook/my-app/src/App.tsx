import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './components/Navbar';
import WishList from './components/WishList';
import SearchPage from './components/SearchPage'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/wishList" element={<WishList />} />

        </Routes>
      </Router >
    </Provider>
  );
}

export default App;
