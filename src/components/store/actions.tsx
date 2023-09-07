import {
  ADD_SONG,
  FILTER_SONGS_BY_SEARCH,
  GET_SONGS,
} from "./songsActionTypes";
import { Dispatch } from "redux";
import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase-config";

import "firebase/firestore";

export const addSongToFirestore = (songData) => {
  return async (dispatch) => {
    try {
      const songsCollection = collection(db, "songs");
      const docRef = await addDoc(songsCollection, songData);
      console.log("Song added successfully!");

      dispatch({
        type: ADD_SONG,
        payload: { songId: docRef.id, songData },
      });
    } catch (error) {
      console.error("Error Adding Song", error);
    }
  };
};
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

export const filterSongsBySearch = (query: string) => {
  return {
    type: FILTER_SONGS_BY_SEARCH,
    payload: query,
  };
};

//Storage

// export const filterSongById = (id: string) => async (dispatch: Dispatch) => {
//   try {
//     const songDoc = doc(db, "songs", id);
//     const songSnapshot = await getDoc(songDoc);
//     if (songSnapshot.exists()) {
//       const songData = songSnapshot.data();
//       return {
//         type: FILTER_SONGS_BY_ID,
//         payload: songData,
//       };
//     } else {
//       dispatch({
//         type: FILTER_SONGS_BY_ID,
//         payload: null,
//       });
//     }
//   } catch (error) {
//     console.error("Error filtering song by ID:", error);
//   }
// };
