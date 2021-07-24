import { useState } from "react";

// Utils
import getParams from "./getParams";

const selectPlaylist = () => {
  const params = getParams();
  const [selectedTrack, setSelectedTrack] = useState([]);

  const addTrack = async (id) => {
    setSelectedTrack([...selectedTrack, id]);

    const reqOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + `${params.access_token}`,
        "Content-Type": "application/json",
      },
    };
    await fetch(
      `https://api.spotify.com/v1/playlists/2d06A7FChFo0lGv0rUoXsg/tracks?uris=${id}`,
      reqOptions
    ).then((response) => response.json());

    alert(`Add Tracks Successfully`);
  };

  const removeTrack = async (id) => {
    const temp = [...selectedTrack];
    const idx = temp.indexOf(id);

    if (idx !== -1) {
      temp.splice(idx, 1);
      setSelectedTrack(temp);

      /* const reqOptions = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + `${params.access_token}`,
          "Content-Type": "application/json",
        },
        body: {
          uri: temp,
        },
      };
      await fetch(
        `https://api.spotify.com/v1/playlists/2d06A7FChFo0lGv0rUoXsg/tracks`,
        reqOptions
      ).then((response) => response.json()); */

      alert(`Remove Tracks Successfully`);
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
