import {
  FILTER_SONGS_BY_ID,
  FILTER_SONGS_BY_SEARCH,
  GET_SONGS,
} from "./songsActionTypes"; // Import your SongData type
import { Dispatch } from "redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebase-config";

export const fetchSongsFromFirestore = () => async (dispatch: Dispatch) => {
  try {
    const songsSnapshot = await getDocs(collection(db, "songs"));
    const songsData = songsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    dispatch({
      type: GET_SONGS,
      payload: songsData,
    });
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
};

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
