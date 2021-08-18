import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { AiFillPlayCircle } from "react-icons/ai";

// Components
import Image from "../../components/Image";

// Services
import { getUserPlaylists, getTrackPlaylist } from "../../services/apiSpotify";

// Redux
import { useAppSelector } from "../../redux/hooks";

// Slices
import { token } from "../../redux/slices/authSlice";

// Utils
import convertMsToMinutes from "../../utils/convertMsToMinutes";

const index = () => {
  const tokenValue = useAppSelector(token);

  const [playlists, setPlaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTrack, setPlaylistTrack] = useState([]);

  useEffect(() => {
    if (tokenValue) {
      getUserPlaylists(tokenValue).then((data) => setPlaylists(data.items));
    }
  }, [tokenValue]);

  const selectPlaylist = (
    e: any,
    playlist_id: string,
    playlist_name: string
  ) => {
    e.preventDefault();

    if (playlist_id) {
      getTrackPlaylist(tokenValue, playlist_id).then((data) =>
        setPlaylistTrack(data.items)
      );
    }

    if (playlist_name) {
      setPlaylistName(playlist_name);
    }
  };

  const playlistView = () => {
    return (
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify="space-between"
        gridGap="2rem"
      >
        <Box minWidth="60%">
          <Text fontSize="2rem" fontWeight="900">
            List Playlist
          </Text>
          <div className={style.playlists}>
            {playlists.map((playlist: any) => (
              <div
                key={playlist.id}
                className={style.item_playlist}
                onClick={(e) => selectPlaylist(e, playlist.id, playlist.name)}
              >
                <Image
                  src={playlist.images[0]?.url}
                  width={playlist.images[0]?.width}
                  height={playlist.images[0]?.height}
                />
                <div className={style.text_playlist}>
                  <h1>{playlist.name}</h1>
                  <p>{playlist.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Box>
        <Box minWidth="40%">
          <Text fontSize="2rem" fontWeight="900">
            {playlistName ? playlistName : "List Tracks Playlist"}
          </Text>
          <Table
            variant="striped"
            size="md"
            margin="2rem 0"
            borderRadius="1rem"
          >
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>TITLE</Th>
                <Th>ALBUM</Th>
                <Th>DURATION</Th>
                <Th>PLAY</Th>
              </Tr>
            </Thead>
            <Tbody>
              {playlistTrack.length > 0 ? (
                playlistTrack.map((item: any, idx: number) => (
                  <Tr key={item.track.id}>
                    <Td>{idx + 1}</Td>
                    <Td>{item.track.name}</Td>
                    <Td>{item.track.album.name}</Td>
                    <Td>{convertMsToMinutes(item.track.duration_ms)}</Td>
                    <Td>
                      <a
                        href={item.track.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <AiFillPlayCircle fontSize="20px" />
                      </a>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={5} textAlign="center">
                    Track Not Found
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    );
  };

  return (
    <Box m="0 auto">
      <Flex
        flexDir="column"
        gridGap="1rem"
        m="2rem 0"
        p={{ base: "0 2rem", lg: "0 8rem" }}
      >
        {playlistView()}
      </Flex>
    </Box>
  );
};

export default index;
