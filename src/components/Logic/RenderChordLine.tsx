import React from "react";

function checkWords(line: string, obj: { [key: string]: boolean }) {
  let count = 0;
  line.split(" ").forEach((word) => {
    if (obj[word] === undefined) {
      count++;
    }
  });
  return count !== 0 ? false : true;
}

interface RenderChordLineProps {
  line: string;
}

function RenderChordLine({ line }: RenderChordLineProps) {
  const chords = line.match(/\[.*?\]/g);
  const words = line.replace(/\[.*?\]/g, "");

  const wordCheckObj: { [key: string]: boolean } = {};
  words.split(" ").forEach((word) => {
    if (wordCheckObj[word] === undefined) {
      wordCheckObj[word] = true;
    }
  });

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
          const endIndex = nextChordIndex !== -1 ? nextChordIndex : line.length;
          const wordAfterChord = line.substring(currentIndex, endIndex).trim();
          currentIndex = endIndex;

          const wordBefore = checkWords(wordBeforeChord, wordCheckObj);
          const wordAfter = checkWords(wordAfterChord, wordCheckObj);

          return (
            <div key={index} className="relative inline-block mb-2 md:mb-0">
              <span className="text-blue-500 absolute top-0 -mt-4 left-0">
                {chordText}
              </span>
              {wordBefore === false && wordAfter === false ? (
                <>
                  {wordBeforeChord && (
                    <span className="word">{wordBeforeChord}</span>
                  )}
                  {wordAfterChord && (
                    <span className="word">{wordAfterChord}</span>
                  )}
                </>
              ) : (
                <>
                  {wordBeforeChord && (
                    <span className="word">{wordBeforeChord}</span>
                  )}
                  {wordAfterChord && (
                    <span className="word">&nbsp;{wordAfterChord}</span>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return <div>{line}</div>;
}

export default RenderChordLine;
