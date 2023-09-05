// ChordTransposer.tsx
import React from "react";

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
  transposeKey,
  children,
  differentChords,
}) => {
  const transposeChord = (chord: string) => {
    if (!originalChords[chord]) {
      return chord;
    }

    const transposeChords = differentChords[transposeKey];
    if (!transposeChords) {
      return chord;
    }

    const index = originalChords[chord].findIndex((c) => c === chord);
    if (index === -1 || !transposeChords[index]) {
      return chord;
    }

    return transposeChords[index];
  };

  const transposedText = children.replace(
    /\[([A-G][#b]?)([^[\]]*)\]/g,
    (_, chord, rest) => {
      const transposedChord = transposeChord(chord);
      return `[${transposedChord}${rest}]`;
    }
  );
  console.log(transposedText.split("\n"));
  const lines = transposedText.split("\n").map((line, index) => (
    <p key={index} className="chord-line">
      {line.split("\n\n").map((verse, vIndex) => (
        <span key={vIndex} className="chord-verse">
          {verse}
        </span>
      ))}
    </p>
  ));

  return <div className="whitespace-pre-line">{lines}</div>;
};

export default ChordTransposer;
