import React from "react";
import style from "./style.module.css";

// Components
import PlaylistText from "../playlist-text";
import Button from "../Button";
import Image from "../Image";

const index = ({ data, handleSelect, isSelected, playlistId }) => {
  const buttonLink = (e, uri, playlist_id) => {
    e.preventDefault();
    handleSelect(uri, playlist_id);
  };

  return (
    <div className={style.playlist}>
      <Image
        src={data.album.images[0].url}
        width={data.album.images[0].width}
        height={data.album.images[0].height}
      />
      <div className={style.content_playlist}>
        <PlaylistText
          title={data.album.name}
          artists={data.album.artists[0].name}
          album={data.album.name}
        />
        <Button
          onClick={(e) => buttonLink(e, data.uri, playlistId)}
          style={{
            backgroundColor: isSelected ? "red" : "#00A512",
          }}
          color="#fff"
        >
          {isSelected ? `Deselect` : `Select`}
        </Button>
      </div>
    </div>
  );
};

export default index;
