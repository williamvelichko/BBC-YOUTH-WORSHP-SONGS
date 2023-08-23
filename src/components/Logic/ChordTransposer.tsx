// ChordTransposer.tsx
import React from "react";

export interface ChordTransposerProps {
  originalChords: {
    [key: string]: string[];
  };
  transposeKey: string;
  children: string;
  lyrics: string;
  differentChords: {
    [key: string]: string[];
  };
}

const ChordTransposer: React.FC<ChordTransposerProps> = ({
  originalChords,
  transposeKey,
  children,
  lyrics,
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

  const lines = lyrics.split("\n").map((line, index) => {
    const chords = line.match(/\[.*?\]/g);

    if (chords) {
      const chordLine = chords
        .map((chord) => transposeChord(chord.replace(/\[|\]/g, "")))
        .join("\t");

      const lyricLine = line.replace(/\[.*?\]/g, "");

      return (
        <div key={index} className="chord-line">
          <div className="chords">
            <span className="chord">{chordLine}</span>
          </div>
          <div className="lyrics">
            <span className="lyric">{lyricLine}</span>
          </div>
        </div>
      );
    }

    return (
      <div key={index} className="lyric-line">
        <div className="chords">
          <span className="chord">&nbsp;</span>
        </div>
        <div className="lyrics">
          <span className="lyric">{line}</span>
        </div>
      </div>
    );
  });
  return <div className="whitespace-pre-line space-y-2">{lines}</div>;

  // const transposedLines = lyrics.split("\n").map((line) => {
  //   const [chordLine, lyricLine] = line.split(/\s{2,}/);

  //   const transposedChord = chordLine.replace(
  //     /\[([A-G][#b]?)([^[\]]*)\]/g,
  //     (_, chord) => {
  //       return `[${transposeChord(chord)}]`;
  //     }
  //   );

  //   return `${transposedChord}\n${lyricLine}`;
  // });

  // const transposedText = children.replace(
  //   /\[([A-G][#b]?)([^[\]]*)\]/g,
  //   (_, chord, rest) => {
  //     const transposedChord = transposeChord(chord);
  //     return `[${transposedChord}${rest}]`;
  //   }
  // );
  // return (
  //   <div className="whitespace-pre-line">{transposedLines.join("\n")}</div>
  // );

  // return <div className="whitespace-pre-line">{transposedText}</div>;
};

export default ChordTransposer;
