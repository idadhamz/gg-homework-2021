import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Components
import PlaylistSearch from "../../components/playlist-search";
import PlaylistItem from "../../components/playlist-item";

// Utils
import { selectPlaylist } from "../../utils/selectPlaylist";

// Services
import { getSearchTrack } from "../../services/apiSpotify";

const index = () => {
  const token = useSelector((state) => state.auth.token);
  const { id } = useParams();
  const [track, setTrack] = useState([]);
  const [input, setInput] = useState("");

  const { checkSelected, handleSelect } = selectPlaylist();

  useEffect(() => {
    getSearchTrack(token, "Love").then((data) => setTrack(data.tracks.items));
  }, [token]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input !== "") {
      getSearchTrack(token, input).then((data) => setTrack(data.tracks.items));
    } else {
      setTrack([]);
    }
  };

  return (
    <>
      <div className={style.div_search}>
        <h1 className={style.text_h1}>Daftar Track</h1>

        <PlaylistSearch
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          input={input}
        />
      </div>

      <div className={style.track_playlist}>
        {track.map((item, idx) => (
          <PlaylistItem
            data={item}
            key={item.id}
            idx={idx}
            handleSelect={handleSelect}
            isSelected={checkSelected(item.uri)}
            playlistId={id}
          />
        ))}
      </div>
    </>
  );
};

export default index;
