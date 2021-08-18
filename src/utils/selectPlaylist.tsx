import toast from "react-hot-toast";

// Redux
import { useAppDispatch, useAppSelector } from "../redux/hooks";

// Slices
import {
  addSelectedTrack,
  removeSelectedTrack,
  selectedTrack,
} from "../redux/slices/playlistSlice";

const selectPlaylist = () => {
  const dispatch = useAppDispatch();
  const selectedTracks = useAppSelector(selectedTrack);

  const addTrack = async (id: string) => {
    await dispatch(addSelectedTrack(id));
    toast(`Add Tracks Successfully`, {
      duration: 2000,
      position: "bottom-right",
      icon: "👏",
      style: { backgroundColor: "#4DC05A", color: "#fff" },
    });
  };

  const removeTrack = async (id: string) => {
    await dispatch(removeSelectedTrack(id));
    toast(`Remove Tracks Successfully`, {
      duration: 2000,
      position: "bottom-right",
      icon: "👏",
      style: { backgroundColor: "red", color: "#fff" },
    });
  };

  const checkSelected = (id: string) => {
    return selectedTracks.includes(id);
  };

  const handleSelect = (id: string) => {
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
