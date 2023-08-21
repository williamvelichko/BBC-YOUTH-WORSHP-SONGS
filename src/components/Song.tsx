import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { filterSongsById } from "./store/actions";

export interface SongData {
  title: string;
  artist: string;
  lyrics_with_chords: { [key: string]: string };
  lyrics_without_chords: { [key: string]: string };
  chordsOriginal: string[];
  chordsTranspose: {
    [key: string]: string[];
  };
  id: number;
}

interface SongProps {
  songs: SongData[]; // Pass the songs data as a prop
}
const Song: React.FC<SongProps> = ({ songs }) => {
  const [showLyricsWithChords, setShowLyricsWithChords] = useState(true);
  const { id } = useParams<{ id?: string }>();

  const songId = id ? parseInt(id, 10) : -1;
  const song = songs.find((song) => song.id === songId);

  if (!song) {
    return <div>Song not found</div>;
  }

  const toggleLyrics = () => {
    setShowLyricsWithChords(!showLyricsWithChords);
  };

  const lyricsToShow = showLyricsWithChords
    ? song.lyrics_with_chords
    : song.lyrics_without_chords;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">{song.title}</h2>
      <p className="text-gray-600 mb-1">Artist: {song.artist}</p>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-2 ml-4"
        onClick={toggleLyrics}
      >
        {showLyricsWithChords ? "Lyrics without Chords" : "Lyrics with Chords"}
      </button>
      <div className="text-gray-700 mb-4">
        {Object.keys(lyricsToShow).map((section, index) => (
          <p key={index} className="mb-4 w-50">
            {lyricsToShow[section]}
          </p>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    songs: state.songs, // Assuming you've structured your state with filteredSongs
  };
};

export default connect(mapStateToProps)(Song);
