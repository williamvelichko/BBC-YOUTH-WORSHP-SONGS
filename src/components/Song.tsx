import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import UpdatedChordTransposer from "./Logic/UpdatedChordTransposer";
import { fetchSongById } from "./store/actions";
import Loading from "./Loading";
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
  filter: string;
}

interface SongProps {
  singleSong: SongData;
  fetchSongById;
}

const Song: React.FC<SongProps> = ({ singleSong, fetchSongById }) => {
  const [song, setSong] = useState<SongData | undefined>(undefined);
  const [showLyricsWithChords, setShowLyricsWithChords] = useState(false);
  const [transposeKey, setTransposeKey] = useState("G");
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchSongById(id)
        .then((sng) => {
          setSong(sng);
        })
        .catch((error) => {
          console.error("Error fetching song:", error);
        });
    }
  }, [fetchSongById]);
  console.log(song);
  if (!song) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const toggleLyrics = () => {
    setShowLyricsWithChords(!showLyricsWithChords);
  };

  const handleTransposeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTransposeKey(event.target.value);
  };

  let lyricsToShow = showLyricsWithChords
    ? song.lyrics_with_chords
    : song.lyrics_without_chords;

  if (!song.lyrics_with_chords) {
    lyricsToShow = song.lyrics_without_chords;
  }

  return (
    <div className="flex justify-center items-center mb-24">
      <div className="bg-white rounded-lg shadow-md p-6 md:w-4/5 w-full mt-5 mb-8">
        <div className="flex flex-col mb-4">
          <div className="flex flex-col text-center">
            <h2 className="flex flex-col items-center text-2xl font-bold mb-4">
              {song.title}
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 p-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md h-10 sm:w-36 w-full mb-2 sm:mb-0 sm:mr-2"
              onClick={toggleLyrics}
            >
              {showLyricsWithChords ? "Hide Chords" : "Show Chords"}
            </button>

            <select
              value={transposeKey}
              onChange={handleTransposeChange}
              className="bg-white border border-gray-300 rounded-md px-4 py-2 h-10 sm:w-36 w-full"
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
        {showLyricsWithChords ? (
          <UpdatedChordTransposer
            originalChords={song.chordsOriginal}
            transposeChords={song.chordsTranspose}
            lyrics={lyricsToShow}
            songKey={transposeKey}
            lyricsWithoutChords={song.lyrics_without_chords}
          >
            {lyricsToShow}
          </UpdatedChordTransposer>
        ) : (
          <div className="whitespace-pre-line space-y-6 mt-4">
            {song.lyrics_without_chords
              .split("\\n\\n")
              .map((paragraph, pIndex) => (
                <div key={pIndex} className={pIndex > 0 ? "mt-6" : ""}>
                  {paragraph.split("\\n").map((line, lIndex) => (
                    <div key={lIndex} className="flex space-x-2">
                      {line}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    singleSong: state.singleSong,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongById: (songId) => dispatch(fetchSongById(songId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Song);
