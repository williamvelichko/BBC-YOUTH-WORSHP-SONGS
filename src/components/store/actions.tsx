import {
  ADD_SONG,
  FILTER_SONGS_BY_SEARCH,
  GET_SONGS,
  EDIT_SONG,
  DELETE_SONG,
  FILTER_SONGS_BY_ID,
} from "./songsActionTypes";
import { Dispatch } from "redux";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
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

export const editSongFromFirebase =
  (songData: any) => async (dispatch: Dispatch) => {
    try {
      const { id, ...updatedData } = songData;

      const songDocRef = doc(db, "songs", id); // Reference to the specific song document in Firestore.
      await updateDoc(songDocRef, songData);

      console.log("Song edited successfully!");

      dispatch({
        type: EDIT_SONG, // Define your action type for editing a song.
        payload: { songId: id, songData: songData },
      });
    } catch (error) {
      console.error("Error editing song:", error);
    }
  };

export const deleteSongFromFirebase =
  (songId: string) => async (dispatch: Dispatch) => {
    try {
      const songDocRef = doc(db, "songs", songId); // Reference to the specific song document in Firestore.
      await deleteDoc(songDocRef);

      console.log("Song deleted successfully!");

      dispatch({
        type: DELETE_SONG, // Define your action type for deleting a song.
        payload: { songId: songId },
      });
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

export const fetchSongById = (songId) => {
  return async (dispatch) => {
    try {
      const songDocRef = doc(db, "songs", songId);
      const songDocSnap = await getDoc(songDocRef);

      if (songDocSnap.exists()) {
        const songData = songDocSnap.data();
        dispatch({
          type: FILTER_SONGS_BY_ID,
          payload: songData,
        });
        return songData;
      } else {
        // console.error("Song not found");
        return {};
      }
    } catch (error) {
      console.log("error fetching single song");
      return error;
    }
  };
};
