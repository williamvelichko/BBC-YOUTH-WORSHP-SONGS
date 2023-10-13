import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import SongList from "./SongList";
import Song from "./Song";
import AddSong from "./SongControls/AddSong";
import ControlPanel from "./SongControls/ControlPanel";
import EditSong from "./SongControls/EditSong";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<SongList />} />
        <Route path="/song/:id" element={<Song />} />
        <Route path="/addSong" element={<AddSong />} />
        <Route path="/controlPanel" element={<ControlPanel />} />
        <Route path="/editSong/:id" element={<EditSong />} />
      </Routes>
    </div>
  );
};

export default App;
