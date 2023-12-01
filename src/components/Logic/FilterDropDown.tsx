import React, { useState } from "react";

interface Props {
  songs: any;
  filterSongsByType: any;
  fetchSongsFromFireStore: any;
}

const FilterDropDown: React.FC<Props> = ({
  songs,
  filterSongsByType,
  fetchSongsFromFireStore,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filterSongs = (filter: string) => {
    if (filter === "All") {
      fetchSongsFromFireStore();
    } else {
      filterSongsByType(filter);
    }
    setSelectedFilter(filter);
  };

  const uniqueFilters = Array.from(
    new Set(songs.map((song) => song.filter))
  ).filter((filter) => filter);

  return (
    <div className="flex flex-row items-start mb-4">
      <select
        value={selectedFilter}
        onChange={(e) => filterSongs(e.target.value)}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="All">All</option>
        {uniqueFilters.map((filter: any, index: any) => (
          <option key={index} value={filter}>
            {filter}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropDown;
