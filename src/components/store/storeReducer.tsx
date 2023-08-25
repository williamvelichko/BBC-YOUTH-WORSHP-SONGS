import { GET_SONGS, FILTER_SONGS_BY_SEARCH } from "./songsActionTypes";
//import songs from "../../data/songs.json";
import { db } from "../Firebase/firebase-config";

const initialState = {
  songs: [],
  searchQuery: "",
};

// Create a reducer function to manage the state
const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case FILTER_SONGS_BY_SEARCH:
    //   const query = action.payload.toLowerCase();
    //   const filteredSongs = initialState.songs.filter((song) =>
    //     song.title.toLowerCase().includes(query)
    //   );
    //   return {
    //     ...state,
    //     songs: filteredSongs,
    //   };
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
