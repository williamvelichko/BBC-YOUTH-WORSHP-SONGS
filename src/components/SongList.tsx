import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SongData } from "./Song";
import { connect } from "react-redux";
import Loading from "./Loading";
import { fetchSongsFromFirestore } from "./store/actions";
interface SongListProps {
  songs: SongData[];
  searchQuery: string;
  fetchSongsFromFirestore: any;
}

const SongList: React.FC<SongListProps> = ({
  songs,
  searchQuery,
  fetchSongsFromFirestore,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSongsFromFirestore()
      .then(() => {
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, [fetchSongsFromFirestore]);

  const filteredSongs = songs?.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <div className="max-w-4xl sm:w-full w-11/12 border border-gray-300 rounded bg-gray-100 shadow-lg sm:p-6 p-3 min-h-screen">
        {isLoading ? (
          <Loading />
        ) : (
          filteredSongs.map((song) => (
            <div
              key={song.id}
              className="p-3 my-1 bg-white border border-gray-300 rounded-lg hover:shadow-xl w-full"
            >
              <Link to={`/song/${song.id}`} className="song-link">
                <h2 className="sm:text-lg text-sm font-semibold text-gray-800">
                  {song.title}
                </h2>
              </Link>
            </div>
          ))
        )}
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
