import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import ChordTransposer from "./Logic/ChordTransposer";

export interface SongData {
  title: string;
  lyrics_with_chords: string;
  lyrics_without_chords: string;
  chordsOriginal: {
    [key: string]: string[];
  };
  chordsTranspose: {
    [key: string]: string[];
  };
  id: number;
}

interface SongProps {
  songs: SongData[]; // Pass the songs data as a prop
}
const Song: React.FC<SongProps> = ({ songs }) => {
  const [showLyricsWithChords, setShowLyricsWithChords] = useState(false);
  const [transposeKey, setTransposeKey] = useState("original");
  const { id } = useParams<{ id?: string }>();

  const songId = id ? parseInt(id, 10) : -1;
  console.log(songId);
  const song = songs.find((song) => song.id === songId);

  if (!song) {
    return <div>Song not found</div>;
  }

  const toggleLyrics = () => {
    setShowLyricsWithChords(!showLyricsWithChords);
  };

  const handleTransposeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTransposeKey(event.target.value);
  };

  const lyricsToShow = showLyricsWithChords
    ? song.lyrics_with_chords.split("\n\n")
    : song.lyrics_without_chords.split("\n\n");

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 md:w-4/5 mt-5 w-full">
        <h2 className="text-xl font-semibold mb-2">{song.title}</h2>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-md mb-1"
          onClick={toggleLyrics}
        >
          {showLyricsWithChords
            ? "Lyrics without Chords"
            : "Lyrics with Chords"}
        </button>

        <select
          value={transposeKey}
          onChange={handleTransposeChange}
          className="mb-2 bg-white border border-gray-300 rounded-md px-2 py-1"
        >
          <option value="original">
            Key: {Object.keys(song.chordsOriginal)}
          </option>
          {Object.keys(song.chordsTranspose).map((key) => (
            <option key={key} value={key}>
              Key:{key}
            </option>
          ))}
        </select>
        <div className="space-y-4">
          {lyricsToShow.map((section, index) => (
            <ChordTransposer
              key={index}
              originalChords={song.chordsOriginal}
              transposeKey={transposeKey}
              differentChords={song.chordsTranspose}
            >
              {section}
            </ChordTransposer>
          ))}
        </div>
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
