import React from "react";

const ChordInput = ({
  chord,
  onChange,
  onRemove,
}: {
  chord: string;
  onChange: (newChord: string) => void;
  onRemove: () => void;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        className="border rounded w-20 py-1 px-2"
        type="text"
        value={chord}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        className="bg-red-500 text-white px-2 py-1 rounded"
        onClick={onRemove}
      >
        Remove
      </button>
    </div>
  );
};

export default ChordInput;
