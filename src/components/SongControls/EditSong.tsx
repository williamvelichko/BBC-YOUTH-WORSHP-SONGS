import React, { useEffect, useState } from "react";
import SongForm from "./SongForm";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editSongFromFirebase, fetchSongById } from "components/store/actions";
import Loading from "components/Loading";

interface EditSongProps {
  songs: any;
  editSongFromFirebase: any;
  fetchSongById: any;
}

const EditSong: React.FC<EditSongProps> = ({
  songs,
  editSongFromFirebase,
  fetchSongById,
}) => {
  const [editedSong, setEditedSong] = useState<undefined>(undefined);
  const { id } = useParams<{ id: string }>();
  const [originalChordPairs, setOriginalChordPairs] = useState<
    { key: string; chords: string[] }[]
  >([{ key: "", chords: [] }]);
  const [transposeChordPairs, setTransposeChordPairs] = useState<
    { key: string; chords: string[] }[]
  >([{ key: "", chords: [] }]);
  const navigate = useNavigate();

  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedLyricsWithChords, setEditedLyricsWithChords] =
    useState<string>("");
  const [editedLyricsWithoutChords, setEditedLyricsWithoutChords] =
    useState<string>("");

  useEffect(() => {
    fetchSongById(id).then((foundSong) => {
      if (foundSong) {
        setEditedSong(foundSong);
        setEditedTitle(foundSong.title);
        setEditedLyricsWithChords(foundSong.lyrics_with_chords);
        setEditedLyricsWithoutChords(foundSong.lyrics_without_chords);

        const originalChords: Record<string, string[]> =
          foundSong.chordsOriginal;

        const initialOriginalChordPairs = Object.entries(originalChords).map(
          ([key, chords]) => ({
            key,
            chords,
          })
        );
        setOriginalChordPairs(initialOriginalChordPairs);

        const transposeChords: Record<string, string[]> =
          foundSong.chordsTranspose;
        const initialTransposeChordPairs = Object.entries(transposeChords).map(
          ([key, chords]) => ({
            key,
            chords,
          })
        );
        setTransposeChordPairs(initialTransposeChordPairs);
      } else {
        setEditedSong(undefined);
      }
    });
  }, [id, songs]);

  if (!editedSong) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleLyricsWithChordsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditedLyricsWithChords(e.target.value);
  };

  const handleLyricsWithoutChordsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditedLyricsWithoutChords(e.target.value);
  };

  const handleChordChange = (chordPairs, index, property, newValue, setter) => {
    const newChordPairs = [...chordPairs];
    newChordPairs[index][property] = newValue;
    setter(newChordPairs);
  };

  const addChord = (chordPairs, index, setter) => {
    const newChordPairs = [...chordPairs];
    newChordPairs[index].chords.push("");
    setter(newChordPairs);
  };

  const removeChord = (chordPairs, index, chordIndex, setter) => {
    const newChordPairs = [...chordPairs];
    newChordPairs[index].chords.splice(chordIndex, 1);
    setter(newChordPairs);
  };

  const handleChordPairsChange = (
    chordPairs,
    index,
    property,
    newValue,
    setter
  ) => {
    const newChordPairs = [...chordPairs];
    newChordPairs[index][property] = newValue;
    setter(newChordPairs);
  };

  const addChordPair = (chordPairs, index, setter) => {
    const newChordPairs = [...chordPairs];
    newChordPairs.push({ key: "", chords: [""] });
    setter(newChordPairs);
  };

  const handleEditSong = () => {
    const chordsOriginal: Record<string, string[]> = {};
    const chordsTranspose: Record<string, string[]> = {};

    originalChordPairs.forEach((pair) => {
      chordsOriginal[pair.key] = pair.chords;
    });

    transposeChordPairs.forEach((pair) => {
      chordsTranspose[pair.key] = pair.chords;
    });

    const updatedSongData = {
      title: editedTitle,
      lyrics_with_chords: editedLyricsWithChords,
      lyrics_without_chords: editedLyricsWithoutChords,
      chordsOriginal,
      chordsTranspose,
      id: id,
    };

    editSongFromFirebase(updatedSongData)
      .then(() => {
        navigate("/controlPanel");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
      <SongForm
        originalChordPairs={originalChordPairs}
        setOriginalChordPairs={setOriginalChordPairs}
        transposeChordPairs={transposeChordPairs}
        setTransposeChordPairs={setTransposeChordPairs}
        handleChordChange={handleChordChange}
        addChord={addChord}
        removeChord={removeChord}
        handleChordPairsChange={handleChordPairsChange}
        addChordPair={addChordPair}
        onSubmit={handleEditSong}
        handleTitleChange={handleTitleChange}
        handleLyricsWithChordsChange={handleLyricsWithChordsChange}
        handleLyricsWithoutChordsChange={handleLyricsWithoutChordsChange}
        title={editedTitle}
        lyricsWithChords={editedLyricsWithChords}
        lyricsWithoutChords={editedLyricsWithoutChords}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editSongFromFirebase: (song) => dispatch(editSongFromFirebase(song)),
    fetchSongById: (songId) => dispatch(fetchSongById(songId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSong);
