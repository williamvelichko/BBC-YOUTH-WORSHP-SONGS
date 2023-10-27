import {
  GET_SONGS,
  FILTER_SONGS_BY_SEARCH,
  FILTER_SONGS_BY_ID,
  ADD_SONG,
  EDIT_SONG,
  DELETE_SONG,
} from "./songsActionTypes";

const initialState = {
  songs: [],
  searchQuery: "",
  singleSong: [],
};

// Create a reducer function to manage the state
const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SONG:
      return {
        ...state,
        songs: action.payload,
      };
    case FILTER_SONGS_BY_ID:
      return {
        ...state,
        singleSong: action.payload,
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
    case DELETE_SONG:
      return {
        ...initialState,
      };
    case EDIT_SONG:
      return {
        ...state,
        songs: action.payload, // Assuming payload is an array of songs
      };

    default:
      return state;
  }
};

export default songsReducer;
