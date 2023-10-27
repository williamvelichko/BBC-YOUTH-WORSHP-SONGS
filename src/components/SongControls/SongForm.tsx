import React from "react";
import ChordInput from "./AddSongUtils/ChordInput";

interface SongFormProps {
  onSubmit: () => void;
  originalChordPairs: any;
  setOriginalChordPairs: any;
  transposeChordPairs: any;
  setTransposeChordPairs: any;
  handleChordChange: any;
  addChord: any;
  removeChord: any;
  handleChordPairsChange: any;
  addChordPair: any;
  handleTitleChange: any;
  handleLyricsWithChordsChange: any;
  handleLyricsWithoutChordsChange: any;
  title: any;
  lyricsWithChords: any;
  lyricsWithoutChords: any;
}

const SongForm: React.FC<SongFormProps> = ({
  onSubmit,
  originalChordPairs,
  setOriginalChordPairs,
  transposeChordPairs,
  setTransposeChordPairs,
  handleChordChange,
  addChord,
  removeChord,
  handleChordPairsChange,
  addChordPair,
  handleTitleChange,
  handleLyricsWithChordsChange,
  handleLyricsWithoutChordsChange,
  title,
  lyricsWithChords,
  lyricsWithoutChords,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="bg-white shadow-md rounded px-8 py-6 space-y-4 w-full md:w-9/12">
      <div className="text-center text-xl font-semibold mb-4">Song Details</div>
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Title</h4>
        <input
          className="border rounded w-full py-2 px-3"
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Lyrics With Chords</h4>
        <textarea
          className="border rounded w-full py-2 px-3"
          name="lyrics_with_chords"
          value={lyricsWithChords}
          onChange={handleLyricsWithChordsChange}
          rows={6}
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Lyrics Without Chords</h4>
        <textarea
          className="border rounded w-full py-2 px-3"
          name="lyrics_without_chords"
          value={lyricsWithoutChords}
          onChange={handleLyricsWithoutChordsChange}
          rows={6}
          required
        ></textarea>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col mb-4 w-full md:w-1/2">
          <h4 className="text-lg font-semibold">Original Chords</h4>
          <div className="flex flex-col">
            {originalChordPairs!.map((pair, index) => (
              <div className="mb-4" key={index}>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <label className="text-sm">Key:</label>
                    <input
                      className="border rounded w-20 py-1 px-2"
                      type="text"
                      value={pair.key}
                      onChange={(e) =>
                        handleChordChange(
                          originalChordPairs,
                          index,
                          "key",
                          e.target.value,
                          setOriginalChordPairs
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm">Chords:</label>
                    {pair.chords.map((chord, chordIndex) => (
                      <ChordInput
                        key={chordIndex}
                        chord={chord}
                        onChange={(newChord) =>
                          handleChordPairsChange(
                            originalChordPairs,
                            index,
                            "chords",
                            [
                              ...pair.chords.slice(0, chordIndex),
                              newChord,
                              ...pair.chords.slice(chordIndex + 1),
                            ],
                            setOriginalChordPairs
                          )
                        }
                        onRemove={() =>
                          removeChord(
                            originalChordPairs,
                            index,
                            chordIndex,
                            setOriginalChordPairs
                          )
                        }
                      />
                    ))}
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-600  text-white px-2 py-1 rounded"
                      onClick={() =>
                        addChord(
                          originalChordPairs,
                          index,
                          setOriginalChordPairs
                        )
                      }
                    >
                      Add Chord
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col mb-4 w-full md:w-1/2">
          <h4 className="text-lg font-semibold">Transposable Chords</h4>
          {transposeChordPairs!.map((pair, index) => (
            <div className="mb-4" key={index}>
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <label className="text-sm">Key:</label>
                  <input
                    className="border rounded w-20 py-1 px-2"
                    type="text"
                    value={pair.key}
                    onChange={(e) =>
                      handleChordChange(
                        transposeChordPairs,
                        index,
                        "key",
                        e.target.value,
                        setTransposeChordPairs
                      )
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm">Chords:</label>
                  {pair.chords.map((chord, chordIndex) => (
                    <ChordInput
                      key={chordIndex}
                      chord={chord}
                      onChange={(newChord) =>
                        handleChordPairsChange(
                          transposeChordPairs,
                          index,
                          "chords",
                          [
                            ...pair.chords.slice(0, chordIndex),
                            newChord,
                            ...pair.chords.slice(chordIndex + 1),
                          ],
                          setTransposeChordPairs
                        )
                      }
                      onRemove={() =>
                        removeChord(
                          transposeChordPairs,
                          index,
                          chordIndex,
                          setTransposeChordPairs
                        )
                      }
                    />
                  ))}
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                    type="button"
                    onClick={() =>
                      addChord(
                        transposeChordPairs,
                        index,
                        setTransposeChordPairs
                      )
                    }
                  >
                    Add Chord
                  </button>
                </div>
              </div>
              <div className="w-full ">
                {index === transposeChordPairs.length - 1 && (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mt-4 w-6/12 md:w-4/12"
                    type="button"
                    onClick={() =>
                      addChordPair(
                        transposeChordPairs,
                        index,
                        setTransposeChordPairs
                      )
                    }
                  >
                    Add More
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-1/2 md:w-1/4 transition duration-300"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SongForm;
