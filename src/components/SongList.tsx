import React from "react";
import { Link } from "react-router-dom";
import { SongData } from "./Song"; // Import the SongData interface
import { connect } from "react-redux"; // Import connect

interface SongListProps {
  songs: SongData[]; // Prop to receive the songs data array
}

const SongList: React.FC<SongListProps> = ({ songs }) => {
  return (
    <div className="flex justify-center mt-8">
      <div className="grid grid-cols-2 gap-6 max-w-4xl ">
        {songs.map((song) => (
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
    songs: state.songs, // Pass the songs from Redux state to props
  };
};

export default connect(mapStateToProps)(SongList);
