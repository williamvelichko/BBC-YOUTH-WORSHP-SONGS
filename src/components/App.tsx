import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import SongList from "./SongList";
import Song from "./Song";
import AddSong from "./SongControls/AddSong";
import ControlPanel from "./SongControls/ControlPanel";
import EditSong from "./SongControls/EditSong";
import Footer from "./Footer";
import { fetchSongsFromFirestore } from "./store/actions";
import { connect } from "react-redux";

interface SongProps {
  songs: any;
}

const App: React.FC<SongProps> = ({ songs }) => {
  const isSmallScreen = window.innerWidth <= 600;

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
      <div className="md:hidden">
        <Footer />
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    songs: state.songs,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongsFromFirestore: () => dispatch(fetchSongsFromFirestore()),
  };
};
export default connect(mapState, mapDispatchToProps)(App);
