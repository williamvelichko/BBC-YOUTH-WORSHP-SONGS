import {
  GET_SONGS,
  FILTER_SONGS_BY_SEARCH,
  FILTER_SONGS_BY_ID,
  ADD_SONG,
  EDIT_SONG,
} from "./songsActionTypes";

const initialState = {
  songs: [],
  searchQuery: "",
};

// Create a reducer function to manage the state
const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SONG:
      return {
        ...state,
        songs: action.payload, // Assuming payload is an array of songs
      };
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
    // case EDIT_SONG:
    // const { songId, songData } = action.payload;
    // // Find the index of the song to be edited in the state
    // const editedSongIndex = state.songs.findIndex((song) => song.id === songId);

    // if (editedSongIndex !== -1) {
    //   // Create a new array with the edited song data
    //   const updatedSongs = [...state.songs];
    //   updatedSongs[editedSongIndex] = {
    //     ...updatedSongs[editedSongIndex],
    //     ...songData,
    //   };

    //   return {
    //     ...state,
    //     songs: updatedSongs,
    //   };
    case EDIT_SONG:
      const { songId, songData } = action.payload;
      console.log(songData);
      return {
        ...state,
        songs: action.payload, // Assuming payload is an array of songs
      };
    default:
      return state;
  }
};

export default songsReducer;
