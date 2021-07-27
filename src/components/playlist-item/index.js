import React, { useState } from "react";
import style from "./style.module.css";

// Components
import PlaylistText from "../playlist-text";
import Button from "../Button";
import Image from "../Image";

const index = ({ data, idx, handleSelect, isSelected, userPlaylists }) => {
  const buttonLink = (e, uri) => {
    e.preventDefault();
    handleSelect(uri);
  };

  return (
    <div className={style.playlist_item}>
      <h1 className={style.h1}>{idx + 1}</h1>
      <Image
        src={data.album.images[0].url}
        width={data.album.images[0].width}
        height={data.album.images[0].height}
      />
      <PlaylistText
        title={data.album.name}
        artists={data.album.artists[0].name}
        album={data.album.name}
      />
      {userPlaylists.map((playlist) => {
        return (
          <Button
            onClick={(e) => buttonLink(e, data.uri)}
            style={{
              backgroundColor: isSelected ? "red" : "#00A512",
              fontSize: "0.8rem",
              margin: "0 0.5rem",
            }}
            key={playlist.id}
          >
            {isSelected
              ? `${playlist.name} Deselect`
              : `${playlist.name} Select`}
          </Button>
        );
      })}
    </div>
  );
};

export default index;
