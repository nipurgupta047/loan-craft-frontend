import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import viteLogo from '/vite.svg';
import './App.css';
import AppLayout from './pages/appLayout/AppLayout';

function App() {

  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
