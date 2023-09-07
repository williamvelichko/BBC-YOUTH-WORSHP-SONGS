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
      let currentIndex = 0;

      return (
        <div className="flex flex-wrap mt-4 " key={line}>
          {chords.map((chord, index) => {
            const chordText = chord.replace(/\[|\]/g, "");
            const chordIndex = line.indexOf(chord, currentIndex);
            const wordBeforeChord = line
              .substring(currentIndex, chordIndex)
              .trim();
            currentIndex = chordIndex + chord.length;

            const nextChordIndex = line.indexOf("[", currentIndex);
            const endIndex =
              nextChordIndex !== -1 ? nextChordIndex : line.length;
            const wordAfterChord = line
              .substring(currentIndex, endIndex)
              .trim();
            currentIndex = endIndex;

            return (
              <div key={index} className="relative inline-block mb-2 md:mb-0">
                <span className="text-blue-500 absolute top-0 -mt-4 left-0">
                  {transposeChord(chordText)}
                </span>
                {wordBeforeChord && (
                  <span className="word">{wordBeforeChord} </span>
                )}
                {wordAfterChord && (
                  <span className="word">{wordAfterChord} &nbsp;</span>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    return <div>{line}</div>;
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
