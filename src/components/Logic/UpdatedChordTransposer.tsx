import React from "react";
import { transposeLyricsChords } from "./TransposeFunction";
import RenderChordLine from "./RenderChordLine";
interface UpdatedChordTransposerProps {
  children: string;
  originalChords: { [key: string]: string[] };
  transposeChords: { [key: string]: string[] };
  lyrics: string;
  songKey: string;
  lyricsWithoutChords: string;
}

const UpdatedChordTransposer: React.FC<UpdatedChordTransposerProps> = ({
  children,
  originalChords,
  transposeChords,
  lyrics,
  songKey,
  lyricsWithoutChords,
}) => {
  const key = Object.keys(originalChords);

  let orChord = originalChords[key[0]];
  let trChord = transposeChords[songKey];

  if (trChord === undefined) {
    trChord = orChord;
  }

  const transposedLyrics = transposeLyricsChords(children, orChord, trChord);

  const paragraphs = transposedLyrics.split("\\n\\n");

  return (
    <div className="whitespace-pre-line space-y-6">
      {paragraphs.map((paragraph, pIndex) => (
        <div key={pIndex} className={pIndex > 0 ? "mt-6" : ""}>
          {paragraph.split("\\n").map((line, lIndex) => (
            <div key={lIndex} className="flex space-x-2 ">
              <RenderChordLine line={line} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UpdatedChordTransposer;
