import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SongData } from "./Song";
import { connect } from "react-redux";
// import { RootState } from ".//store/storeReducer";

import { fetchSongsFromFirestore } from "./store/actions";
interface SongListProps {
  songs: SongData[];
  searchQuery: string;
  fetchSongsFromFirestore: () => void;
}

const SongList: React.FC<SongListProps> = ({
  songs,
  searchQuery,
  fetchSongsFromFirestore,
}) => {
  useEffect(() => {
    fetchSongsFromFirestore();
  }, [fetchSongsFromFirestore]);

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex justify-center mt-8">
      <div className="grid grid-cols-2 gap-6 max-w-4xl ">
        {filteredSongs.map((song) => (
          <div
            key={song.id}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            <Link to={`/song/${song.id}`} className="song-link">
              <h2 className="text-xl font-semibold">{song.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
    searchQuery: state.searchQuery,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongsFromFirestore: () => dispatch(fetchSongsFromFirestore()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SongList);
