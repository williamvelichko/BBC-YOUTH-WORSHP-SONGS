import React, { useState } from "react";
import { connect } from "react-redux";
import { addSongToFirestore } from "components/store/actions";

interface AddSongProps {
  addSongToFirestore: (song: any) => void; // Define the addSong action prop
}

const AddSong: React.FC<AddSongProps> = ({ addSongToFirestore }) => {
  const [title, setTitle] = useState("");
  const [lyricsWithChords, setLyricsWithChords] = useState("");
  const [lyricsWithoutChords, setLyricsWithoutChords] = useState("");
  const [originalChords, setOriginalChords] = useState("");
  const [transposeChords, setTransposeChords] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new song object
    const newSong = {
      title,
      lyrics_with_chords: lyricsWithChords,
      lyrics_without_chords: lyricsWithoutChords,
      chordsOriginal: {},
      chordsTranspose: {},
      id: "your-generated-id", // Replace with a unique ID generation logic
    };

    // Dispatch the addSong action
    // addSong(newSong);

    // Clear the input fields
    setTitle("");
    setLyricsWithChords("");
    setLyricsWithoutChords("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Song</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Lyrics with Chords:
          </label>
          <textarea
            value={lyricsWithChords}
            onChange={(e) => setLyricsWithChords(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Lyrics without Chords:
          </label>
          <textarea
            value={lyricsWithoutChords}
            onChange={(e) => setLyricsWithoutChords(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Original Chords:
          </label>
          <input
            type="text"
            value={originalChords}
            onChange={(e) => setOriginalChords(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Transpose Chords:
          </label>
          <input
            type="text"
            value={transposeChords}
            onChange={(e) => setTransposeChords(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Song
        </button>
      </form>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    addSongToFirestore: (song) => dispatch(addSongToFirestore(song)),
  };
};

export default connect(null, mapDispatchToProps)(AddSong);
