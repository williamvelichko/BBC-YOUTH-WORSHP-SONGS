import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { filterSongsById } from "./store/actions";

export interface SongData {
  title: string;
  artist: string;
  lyrics: string;
  chords: string[];
  id: number;
}

interface SongProps {
  songs: SongData[]; // Pass the songs data as a prop
}

const Song: React.FC<SongProps> = ({ songs }) => {
  const [showChords, setShowChords] = useState(false);
  const { id } = useParams<{ id?: string }>(); // Make id optional to handle undefined
  const dispatch = useDispatch();

  const songId = id ? parseInt(id, 10) : -1;
  const song = songs.find((song) => song.id === songId);

  if (!song) {
    return <div>Song not found</div>;
  }

  const toggleChords = () => {
    setShowChords(!showChords);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">{song.title}</h2>
      <p className="text-gray-600 mb-1">Artist: {song.artist}</p>
      <p className="text-gray-700 mb-4">{song.lyrics}</p>
      <h3 className="text-lg font-semibold mb-1">Chords:</h3>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
        onClick={toggleChords}
      >
        {showChords ? "Hide Chords" : "Show Chords"}
      </button>
      {showChords && (
        <ul className="list-disc pl-6">
          {song.chords.map((chord, index) => (
            <li key={index} className="text-gray-700">
              {chord}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    songs: state.songs, // Assuming you've structured your state with filteredSongs
  };
};

export default connect(mapStateToProps)(Song);
