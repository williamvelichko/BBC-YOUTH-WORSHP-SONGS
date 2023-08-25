import {
  GET_SONGS,
  FILTER_SONGS_BY_SEARCH,
  FILTER_SONGS_BY_ID,
} from "./songsActionTypes";

const initialState = {
  songs: [],
  searchQuery: "",
};

// Create a reducer function to manage the state
const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_SONGS_BY_ID:
      return {
        ...state,
        filterSong: action.payload,
      };
    case FILTER_SONGS_BY_SEARCH:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case GET_SONGS:
      return {
        ...state,
        songs: action.payload,
      };
    default:
      return state;
  }
};

export default songsReducer;
