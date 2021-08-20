import React from "react";
import style from "./style.module.css";
import { Box } from "@chakra-ui/react";

// Components
import PlaylistText from "../playlist-text";
import Button from "../Button";
import Image from "../Image";

type Props = {
  data?: any;
  handleSelect?: any;
  isSelected?: boolean;
  playlistId?: string | undefined;
};

const index = ({ data, handleSelect, isSelected }: Props) => {
  const buttonLink = (e: any, uri: string) => {
    e.preventDefault();
    handleSelect(uri);
  };

  return (
    <Box
      className={style.playlist}
      _hover={{
        backgroundColor: "#eee",
        color: "#000",
        transition: "all .25s ease",
        transform: "scale(1.05)",
      }}
    >
      <Image
        src={data.album.images[0].url}
        alt={data.album.name}
        width={data.album.images[0].width}
        height={data.album.images[0].height}
      />
      <Box className={style.content_playlist}>
        <PlaylistText
          title={data.album.name}
          artists={data.album.artists[0].name}
        />
        <Button
          onClick={(e) => buttonLink(e, data.uri)}
          style={{
            backgroundColor: isSelected ? "red" : "#00A512",
          }}
          color="#fff"
          role="button"
        >
          {isSelected ? `Deselect` : `Select`}
        </Button>
      </Box>
    </Box>
  );
};

export default index;
