import { FILTER_SONGS_BY_ID, FILTER_SONGS_BY_SEARCH } from "./songsActionTypes"; // Import your SongData type
import { Dispatch } from "redux";

export const filterSongsById = (id?: string) => {
  return {
    type: FILTER_SONGS_BY_ID,
    payload: id,
  };
};

export const filterSongsBySearch = (query: string) => {
  return {
    type: FILTER_SONGS_BY_SEARCH,
    payload: query,
  };
};
