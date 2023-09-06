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

  // Split the children string by '\\n\n' for verses/paragraphs and '\\n' for lines
  const verses = children.split("\\n\\n");

  const lines = verses.map((verse, vIndex) => {
    const linesInVerse = verse.split("\\n");

    const verseContent = linesInVerse.map((line, lIndex) => {
      const chords = line.match(/\[.*?\]/g);
      console.log(chords);
      if (chords) {
        const chordLine = chords
          .map((chord) => transposeChord(chord.replace(/\[|\]/g, "")))
          .join("\t");

        const lyricLine = line.replace(/\[.*?\]/g, "");

        return (
          <div key={lIndex} className="chord-line">
            <div className="chords">
              <span className="chord">{chordLine}</span>
            </div>
            <div className="lyrics">
              <span className="lyric">{lyricLine}</span>
            </div>
          </div>
        );
      }

      // If the line is empty or only contains spaces, render it as an empty line
      if (line.trim() === "") {
        return <div key={lIndex} className="empty-line" />;
      }

      // If the line is non-empty and doesn't contain chords, render it as pure lyrics
      return (
        <div key={lIndex} className="lyric-line">
          <div className="lyrics">
            <span className="lyric">{line}</span>
          </div>
        </div>
      );
    });

    return (
      <div key={vIndex} className="verse">
        {verseContent}
      </div>
    );
  });

  return <div className="whitespace-pre-line space-y-2">{lines}</div>;
};

export default ChordTransposer;
