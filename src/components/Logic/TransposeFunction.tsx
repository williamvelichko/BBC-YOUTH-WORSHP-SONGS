export function createChordMap(
  list1: string[],
  list2: string[]
): { [key: string]: string } {
  if (list1.length !== list2.length) {
    throw new Error("Both lists must have the same length.");
  }

  const chordMap: { [key: string]: string } = {};
  for (let i = 0; i < list1.length; i++) {
    chordMap[list1[i]] = list2[i];
  }

  return chordMap;
}

export function transposeLyricsChords(lyrics, orChord, trChord) {
  let transposedLyrics = String(lyrics);
  let obj = createChordMap(orChord, trChord);

  if (!lyrics || typeof lyrics !== "string") {
    throw new Error("Invalid input: 'lyrics' should be a non-empty string.");
  }

  if (Object.keys(obj).length === 0) {
    throw new Error("Chord maps cannot be empty.");
  }

  let startIndex = 0;
  while (startIndex < transposedLyrics.length) {
    const openBracketIndex = transposedLyrics.indexOf("[", startIndex);
    if (openBracketIndex === -1) {
      break;
    }
    const closeBracketIndex = transposedLyrics.indexOf(
      "]",
      openBracketIndex + 1
    );
    if (closeBracketIndex === -1) {
      break;
    }
    const originalChord = transposedLyrics.slice(
      openBracketIndex + 1,
      closeBracketIndex
    );
    if (originalChord in obj) {
      const transposedChord = obj[originalChord];
      transposedLyrics =
        transposedLyrics.slice(0, openBracketIndex + 1) +
        transposedChord +
        transposedLyrics.slice(closeBracketIndex);
    }
    startIndex = closeBracketIndex + 1;
  }
  return transposedLyrics;
}
