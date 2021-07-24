import { useState } from "react";

const selectPlaylist = () => {
  const [selectedTrack, setSelectedTrack] = useState([]);

  const addTrack = (id) => {
    setSelectedTrack([...selectedTrack, id]);
  };

  const removeTrack = (id) => {
    const temp = [...selectedTrack];
    const idx = temp.indexOf(id);

    if (idx !== -1) {
      temp.splice(idx, 1);
      setSelectedTrack(temp);
    }
  };

  const checkSelected = (id) => {
    return selectedTrack.includes(id);
  };

  const handleSelect = (id) => {
    const isSelected = checkSelected(id);

    console.log(isSelected);

    if (!isSelected) {
      addTrack(id);
    } else {
      removeTrack(id);
    }
  };

  return {
    selectedTrack,
    addTrack,
    removeTrack,
    checkSelected,
    handleSelect,
  };
};

export { selectPlaylist };
