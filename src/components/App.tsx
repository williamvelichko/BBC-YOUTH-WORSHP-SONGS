import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import SongList from "./SongList";
import Song from "./Song";

const songsData = [
  {
    title: "Marvelous Grace",
    artist: "Unknown",
    lyrics: `
    1 Marvelous grace of our loving Lord,
    Grace that exceeds our sin and our guilt!
    Yonder on Calvary's mount out-poured–
    There where the blood of the Lamb was spilt.
    
    Grace, grace, God's grace,
    Grace that will pardon and cleanse within;
    Grace, grace, God's grace,
    Grace that is greater than all our sin!
    
    2 Sin and despair, like the sea-waves cold,
    Threaten the soul with infinite loss;
    Grace that is greater– yes, grace untold–
    Points to the Refuge, the mighty Cross. 
    
    3 Marvelous, infinite, matchless grace,
    Freely bestowed on all who believe!
    All who are longing to see His face,
    Will you this moment His grace receive?
        `,
    chords: ["G", "C", "D", "Em", "Am", "B7"],
    id: 1,
  },
  {
    title: "Leaning on the Everlasting Arms",
    artist: "Anthony J. Showalter and Elisha A. Hoffman",
    lyrics: `
          What a fellowship, what a joy divine,
          Leaning on the everlasting arms;
          What a blessedness, what a peace is mine,
          Leaning on the everlasting arms.
        `,
    chords: ["G", "C", "D", "Em", "Am", "B7"],
    id: 2,
  },
  {
    title: "What a Friend We Have in Jesus",
    artist: "Joseph M. Scriven",
    lyrics: `
          What a friend
          We have in Jesus
          All our sins and griefs to bear
          What a privilege to carry
          Everything to God in prayer
        `,
    chords: ["C", "F", "G", "Am", "Dm", "E7"],
    id: 3,
  },
  // Add other songs here...
];

const App: React.FC = () => {
  const [filteredSongs, setFilteredSongs] = useState(songsData);

  const handleSearch = (query: string) => {
    const filtered = songsData.filter((song) =>
      song.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

  return (
    <Router>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<SongList songs={filteredSongs} />} />
        <Route path="/song/:id" element={<Song songs={filteredSongs} />} />
      </Routes>
    </Router>
  );
};

export default App;
