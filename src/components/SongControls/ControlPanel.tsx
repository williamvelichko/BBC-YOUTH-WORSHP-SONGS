import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSongsFromFirestore } from "components/store/actions";
import Loading from "components/Loading";
import DeleteSong from "./DeleteSong";

const ControlPanel = ({ songs, fetchSongsFromFirestore, searchQuery }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [song, setSong] = useState({});

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

  const navigate = useNavigate();

  const handleEdit = (id) => {
    console.log("Edit song clicked");
    navigate(`/editSong/${id}`);
  };

  const handleDelete = (song) => {
    setShowDeletePopup(true);
    setSong(song);
    console.log("Delete song clicked");
  };

  const handleAdd = () => {
    console.log("Add new song clicked");
    navigate("/addSong");
  };

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
    <div className="control-panel mx-auto w-full max-w-screen-md">
      {showDeletePopup && (
        <DeleteSong setShowDelete={setShowDeletePopup} song={song} />
      )}

      <h2 className="text-2xl font-semibold text-center mb-4 mt-5">
        Admin Control Panel
      </h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded block mx-auto mb-4"
        onClick={handleAdd}
      >
        Add New Song
      </button>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          filteredSongs!.map((sng) => (
            <div
              key={sng.id}
              className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4"
            >
              <h5 className="text-lg font-semibold mb-2 sm:mb-0 sm:mr-4">
                {sng.title}
              </h5>
              <div className="space-x-4">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEdit(sng.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(sng)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
