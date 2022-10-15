import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Game from './routes/Game';
import Pokemon from './routes/Pokemon';
import NotFound from './routes/NotFound';

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="Game" element={<Game />} />
      <Route path="pokemon/:id" element={<Pokemon />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);
