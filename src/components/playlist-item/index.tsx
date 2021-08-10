import React from "react";
import style from "./style.module.css";

import dataExample from "../../data/index";

// Components
import PlaylistText from "../playlist-text";
import Button from "../Button";
import Image from "../Image";

type Props = {
  data?: any,
  handleSelect?: any,
  isSelected?: boolean,
  playlistId?: string|undefined
}

const index = ({ data, handleSelect, isSelected, playlistId }: Props) => {
  const buttonLink = (e: any, uri: string, playlist_id:string|undefined) => {
    e.preventDefault();
    handleSelect(uri, playlist_id);
  };

  return (
    <div className={style.playlist}>
      <Image
        src={dataExample[0].album.images[0].url}
        alt={dataExample[0].album.name}
        width={dataExample[0].album.images[0].width}
        height={dataExample[0].album.images[0].height}
      />
      <div className={style.content_playlist}>
        <PlaylistText
          title={dataExample[0].album.name}
          artists={dataExample[0].album.artists[0].name}
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
