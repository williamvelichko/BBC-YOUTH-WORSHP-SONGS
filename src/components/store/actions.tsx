import { FILTER_SONGS_BY_ID, SET_SEARCH_QUERY } from "./songsActionTypes"; // Import your SongData type
import { Dispatch } from "redux";

export const filterSongsById = (id?: string) => {
  return {
    type: FILTER_SONGS_BY_ID,
    payload: id,
  };
};

export const setSearchQuery = (query: string) => {
  return {
    type: SET_SEARCH_QUERY,
    payload: query,
  };
};
