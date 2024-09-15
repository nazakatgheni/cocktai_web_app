import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Recipe from './components/Recipe';
import CocktailPage from './components/CocktailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/search/:query" element={<CocktailPage />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
    </Router>
  );
}

export default App;

