import { useSelector, useDispatch } from "react-redux";

// Slices
import { setSelectedTrack } from "../redux/slices/trackSlice";

const selectPlaylist = () => {
  const dispatch = useDispatch();
  const selectedTracks = useSelector((state) => state.track.selectedTrack);

  const addTrack = async (id) => {
    await dispatch(setSelectedTrack([...selectedTracks, id]));
    alert(`Add Tracks Successfully`);
  };

  const removeTrack = async (id) => {
    const temp = [...selectedTracks];
    const idx = temp.indexOf(id);

    if (idx !== -1) {
      temp.splice(idx, 1);
      await dispatch(setSelectedTrack(temp));
      alert(`Remove Tracks Successfully`);
    }
  };

  const checkSelected = (id) => {
    return selectedTracks.includes(id);
  };

  const handleSelect = (id) => {
    const isSelected = checkSelected(id);

    if (!isSelected) {
      addTrack(id);
    } else {
      removeTrack(id);
    }
  };

  return {
    selectedTracks,
    addTrack,
    removeTrack,
    checkSelected,
    handleSelect,
  };
};

export { selectPlaylist };
