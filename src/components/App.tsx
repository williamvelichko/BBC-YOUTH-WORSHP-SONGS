import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import SongList from "./SongList";
import Song from "./Song";
import AddSong from "./SongControls/AddSong";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<SongList />} />
        <Route path="/song/:id" element={<Song />} />
        <Route path="/addSong" element={<AddSong />} />
      </Routes>
    </div>
  );
};

export default App;
