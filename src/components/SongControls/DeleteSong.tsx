import React from "react";
import { deleteSongFromFirebase } from "components/store/actions";
import { connect } from "react-redux";
interface DeleteSongProps {
  setShowDelete: any;
  deleteSongFromFirebase: any;
  song: any;
}

const DeleteSong: React.FC<DeleteSongProps> = ({
  setShowDelete,
  deleteSongFromFirebase,
  song,
}) => {
  const confirmDelete = () => {
    deleteSongFromFirebase(song.id)
      .then(() => {
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancelDelete = () => {
    setShowDelete(false);
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div className="bg-white rounded p-8 max-w-md mx-auto relative z-50">
        <h5 className="w-full flex justify-center font-bold">{song.title}</h5>
        <p className="mb-4">Are you sure you want to delete this song?</p>
        <div className="flex justify-center">
          <button
            onClick={confirmDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Yes
          </button>
          <button
            onClick={cancelDelete}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteSongFromFirebase: (songId) =>
      dispatch(deleteSongFromFirebase(songId)),
  };
};

export default connect(null, mapDispatchToProps)(DeleteSong);
