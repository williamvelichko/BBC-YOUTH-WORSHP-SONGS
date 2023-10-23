import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import UpdatedChordTransposer from "./Logic/UpdatedChordTransposer";
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
  id: string;
}

interface SongProps {
  songs: SongData[];
}

const Song: React.FC<SongProps> = ({ songs }) => {
  const [song, setSong] = useState<SongData | undefined>(undefined);
  const [showLyricsWithChords, setShowLyricsWithChords] = useState(false);
  const [transposeKey, setTransposeKey] = useState("G");
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const foundSong = songs.find((song) => song.id === id);
      if (foundSong) {
        setSong(foundSong);
      } else {
        setSong(undefined);
      }
    }
  }, [id, songs]);

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
    ? song.lyrics_with_chords
    : song.lyrics_without_chords;

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
          <option value="original">Key: Original</option>
          {Object.keys(song.chordsTranspose).map((key) => (
            <option key={key} value={key}>
              Key: {key}
            </option>
          ))}
        </select>
        <UpdatedChordTransposer
          originalChords={song.chordsOriginal}
          transposeChords={song.chordsTranspose}
          lyrics={lyricsToShow}
          songKey={transposeKey}
          lyricsWithoutChords={song.lyrics_without_chords}
        >
          {lyricsToShow}
        </UpdatedChordTransposer>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
  };
};

export default connect(mapStateToProps)(Song);
