import { GET_SONGS, FILTER_SONGS_BY_SEARCH } from "./songsActionTypes";
import songs from "../../data/songsDataType2.json";

const initialState = {
  songs,
  searchQuery: "",
};

// Create a reducer function to manage the state
const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_SONGS_BY_SEARCH:
      const query = action.payload.toLowerCase();
      const filteredSongs = initialState.songs.filter((song) =>
        song.title.toLowerCase().includes(query)
      );
      return {
        ...state,
        songs: filteredSongs,
      };
    case GET_SONGS:
      return action.payload;
    // case FILTER_SONGS_BY_ID:
    //   const filteredSongs = state.songs.filter(
    //     (song) => song.id === action.payload
    //   );
    //   return filteredSongs;
    default:
      return state;
  }
};

export default songsReducer;
