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
    <div className="flex justify-center items-center mb-24">
      <div className="bg-white rounded-lg shadow-md p-6 md:w-4/5 w-full mt-5 mb-8 ">
        <div className="flex flex-col mb-4">
          <div className="flex flex-col text-center">
            <h2 className="flex flex-col items-center text-2xl font-bold mb-4">
              {song.title}
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md sm:w-3/12 w-10/12"
              onClick={toggleLyrics}
            >
              {showLyricsWithChords
                ? "Lyrics without Chords"
                : "Lyrics with Chords"}
            </button>

            <select
              value={transposeKey}
              onChange={handleTransposeChange}
              className="bg-white border border-gray-300 rounded-md px-4 py-2 sm:w-3/12 w-10/12"
            >
              <option value="original">Key: Original</option>
              {Object.keys(song.chordsTranspose).map((key) => (
                <option key={key} value={key}>
                  Key: {key}
                </option>
              ))}
            </select>
          </div>
        </div>
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
