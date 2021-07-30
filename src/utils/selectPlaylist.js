import { useState } from "react";
import { useSelector } from "react-redux";

import { addNewTrack } from "../services/apiSpotify";

const selectPlaylist = () => {
  const [selectedTrack, setSelectedTrack] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const addTrack = async (id, playlist_id) => {
    await addNewTrack(token, id, playlist_id).then(() =>
      setSelectedTrack([...selectedTrack, id])
    );
    alert(`Add Tracks Successfully`);
  };

  const removeTrack = async (id) => {
    const temp = [...selectedTrack];
    const idx = temp.indexOf(id);
    // const uri = temp.filter((item) => item === id);

    if (idx !== -1) {
      /*const reqOptions = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + `${token}`,
          "Content-Type": "application/json",
        },
        body: {
          tracks: [
            {
              uri: uri,
            },
          ],
        },
      };
      await fetch(
        `https://api.spotify.com/v1/playlists/2d06A7FChFo0lGv0rUoXsg/tracks`,
        reqOptions
      ).then((response) => response.json()); */

      temp.splice(idx, 1);
      setSelectedTrack(temp);
      alert(`Remove Tracks Successfully`);
    }
  };

  const checkSelected = (id) => {
    return selectedTrack.includes(id);
  };

  const handleSelect = (id, playlist_id) => {
    const isSelected = checkSelected(id);

    if (!isSelected) {
      addTrack(id, playlist_id);
    } else {
      removeTrack(id, playlist_id);
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
