import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Home from '../home/Home';
import Apply from '../apply/Apply';
import Track from '../track/Track';

export default function AppLayout() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/track" element={<Track />} />
      </Routes>
    </div>
  );
}
