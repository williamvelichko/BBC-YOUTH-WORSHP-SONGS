import { useState } from "react";

export const SongFormHelper = () => {
  const [title, setTitle] = useState("");
  const [lyricsWithChords, setLyricsWithChords] = useState("");
  const [lyricsWithoutChords, setLyricsWithoutChords] = useState("");
  const [originalChordPairs, setOriginalChordPairs] = useState<
    { key: string; chords: string[] }[]
  >([{ key: "", chords: [] }]);
  const [transposeChordPairs, setTransposeChordPairs] = useState<
    { key: string; chords: string[] }[]
  >([{ key: "", chords: [] }]);

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

  return {
    title,
    setTitle,
    lyricsWithChords,
    setLyricsWithChords,
    lyricsWithoutChords,
    setLyricsWithoutChords,
    originalChordPairs,
    setOriginalChordPairs,
    transposeChordPairs,
    setTransposeChordPairs,
    handleChordChange,
    addChord,
    removeChord,
    handleChordPairsChange,
    addChordPair,
  };
};

export default SongFormHelper;
