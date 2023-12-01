import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SongData } from "./Song";
import { connect } from "react-redux";
import Loading from "./Loading";
import { fetchSongsFromFirestore, filterSongsByType } from "./store/actions";
import FilterDropDown from "./Logic/FilterDropDown";
interface SongListProps {
  songs: SongData[];
  searchQuery: string;
  fetchSongsFromFirestore: any;
  filterSongsByType: any;
}

const SongList: React.FC<SongListProps> = ({
  songs,
  searchQuery,
  fetchSongsFromFirestore,
  filterSongsByType,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSongsFromFirestore()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
        setIsLoading(false);
      });
  }, [fetchSongsFromFirestore]);

  const sortSongsByTitle = (songs: any) => {
    return songs.sort((a, b) => {
      const regex = /^(\d+)\.\s/;
      const matchA = a.title.match(regex);
      const matchB = b.title.match(regex);

      if (matchA && matchB) {
        const numA = parseInt(matchA[1]);
        const numB = parseInt(matchB[1]);

        if (!isNaN(numA) && !isNaN(numB)) {
          return numA - numB;
        }
      }

      return a.title.localeCompare(b.title);
    });
  };

  let filteredSongs = songs?.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  filteredSongs = sortSongsByTitle(filteredSongs);

  return (
    <div className="flex flex-col justify-center items-center mt-8 md:mb-8 mb-20">
      <div className="max-w-4xl sm:w-full w-11/12 border border-gray-300 rounded bg-gray-100 sm:p-6 p-3 min-h-screen">
        <FilterDropDown
          songs={songs}
          fetchSongsFromFireStore={fetchSongsFromFirestore}
          filterSongsByType={filterSongsByType}
        />
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
    filterSongsByType: (type: string) => dispatch(filterSongsByType(type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SongList);
