import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { filterSongsById } from "./store/actions";

export interface SongData {
  title: string;
  lyrics_with_chords: string;
  lyrics_without_chords: string;
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
  const [showLyricsWithChords, setShowLyricsWithChords] = useState(false);
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

  const lyricsToShow = showLyricsWithChords
    ? song.lyrics_with_chords.split("\n\n")
    : song.lyrics_without_chords.split("\n\n");

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 md:w-4/5 mt-5 w-full ">
        <h2 className="text-xl font-semibold mb-2">{song.title}</h2>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-md mb-1 "
          onClick={toggleLyrics}
        >
          {showLyricsWithChords
            ? "Lyrics without Chords"
            : "Lyrics with Chords"}
        </button>
        <div className="space-y-4">
          {lyricsToShow.map((section, index) => (
            <p key={index} className="whitespace-pre-line text-gray-700">
              {section.split("\n").map((line, lineIndex) => (
                <span key={lineIndex} className="block">
                  {line}
                </span>
              ))}
            </p>
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
