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
    <div className="flex justify-center mt-8 ">
      <div className="grid grid-cols-2 gap-6 max-w-4xl ">
        {isLoading ? (
          <Loading />
        ) : (
          filteredSongs.map((song) => (
            <div
              key={song.id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              <Link to={`/song/${song.id}`} className="song-link">
                <h2 className="text-xl font-semibold">{song.title}</h2>
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
