import React, { useEffect, useState } from "react";

export interface ChordTransposerProps {
  originalChords: {
    [key: string]: string[];
  };
  transposeKey: string;
  children: string;
  differentChords: {
    [key: string]: string[];
  };
}

const ChordTransposer: React.FC<ChordTransposerProps> = ({
  originalChords,
  children,
  differentChords,
  transposeKey, // Receive transposeKey via props
}) => {
  const [currentTransposeKey, setCurrentTransposeKey] = useState(transposeKey);

  useEffect(() => {
    // Update the currentTransposeKey state when the transposeKey prop changes
    setCurrentTransposeKey(transposeKey);
  }, [transposeKey]);

  const transposeChord = (chord: string) => {
    if (!originalChords[chord]) {
      return chord;
    }

    const transposeChords = differentChords[currentTransposeKey];
    if (!transposeChords) {
      return chord;
    }

    const index = originalChords[chord].findIndex((c) => c === chord);
    if (index === -1 || !transposeChords[index]) {
      return chord;
    }

    return transposeChords[index];
  };
  const renderChordLine = (line: string) => {
    const chords = line.match(/\[.*?\]/g);

    if (chords) {
      let currentIndex = 0; // Keep track of the current character index
      const chordLine = chords.map((chord) => {
        const chordText = chord.replace(/\[|\]/g, "");
        const chordIndex = line.indexOf(chord, currentIndex);
        const wordBeforeChord = line.substring(currentIndex, chordIndex);
        currentIndex = chordIndex + chord.length; // Update current index

        return (
          <div key={chordIndex} className="relative inline-block">
            <span className="text-blue-500 absolute top-0 -mt-4 left-0">
              {transposeChord(chordText)}
            </span>
            {wordBeforeChord}
          </div>
        );
      });

      return (
        <div className="flex space-x-2 mt-4" key={line}>
          {[...chordLine, line.substring(currentIndex)]}{" "}
        </div>
      );
    }

    return <div>{line}</div>; // No chords found, render the line as is
  };

  const paragraphs = children.split("\\n\\n");

  return (
    <div className="whitespace-pre-line space-y-6">
      {paragraphs.map((paragraph, pIndex) => (
        <div key={pIndex} className={pIndex > 0 ? "mt-6" : ""}>
          {paragraph.split("\\n").map((line, lIndex) => (
            <div key={lIndex} className="flex space-x-2 ">
              {renderChordLine(line)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChordTransposer;
