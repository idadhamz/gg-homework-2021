import { useState } from "react";

const selectPlaylist = () => {
  const [selectedTrack, setSelectedTrack] = useState([]);

  const addTrack = async (id, tokenValue) => {
    const reqOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + `${tokenValue}`,
        "Content-Type": "application/json",
      },
    };
    await fetch(
      `https://api.spotify.com/v1/playlists/2d06A7FChFo0lGv0rUoXsg/tracks?uris=${id}`,
      reqOptions
    ).then((response) => response.json());

    setSelectedTrack([...selectedTrack, id]);
    alert(`Add Tracks Successfully`);
  };

  const removeTrack = async (id, tokenValue) => {
    const temp = [...selectedTrack];
    const idx = temp.indexOf(id);
    // const uri = temp.filter((item) => item === id);

    if (idx !== -1) {
      /*const reqOptions = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + `${tokenValue}`,
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

  const handleToken = (token) => {
    return token;
  };

  const checkSelected = (id) => {
    return selectedTrack.includes(id);
  };

  const handleSelect = (id, token) => {
    const isSelected = checkSelected(id);
    const tokenValue = handleToken(token);

    console.log(isSelected);

    if (!isSelected) {
      addTrack(id, tokenValue);
    } else {
      removeTrack(id, tokenValue);
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
