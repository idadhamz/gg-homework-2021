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
import toast, { Toaster } from "react-hot-toast";

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
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [playlistTrack, setPlaylistTrack] = useState([]);

  useEffect(() => {
    if (tokenValue) {
      getUserPlaylists(tokenValue).then((data) => setPlaylists(data.items));
    }
  }, [tokenValue]);

  const selectPlaylist = (e: any, playlist: any) => {
    e.preventDefault();
    toast(`${playlist.name} Selected`, {
      duration: 2000,
      position: "bottom-right",
      icon: "👏",
      style: { backgroundColor: "#4DC05A", color: "#fff" },
    });
    if (playlist) {
      const { id, name, description } = playlist;
      getTrackPlaylist(tokenValue, id).then((data) =>
        setPlaylistTrack(data.items)
      );
      setPlaylistName(name);
      setPlaylistDescription(description);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
          <Box className={style.playlists}>
            {playlists.map((playlist: any) => (
              <Box
                key={playlist.id}
                className={style.item_playlist}
                onClick={(e) => selectPlaylist(e, playlist)}
              >
                <Image
                  src={playlist.images[0]?.url}
                  width={playlist.images[0]?.width}
                  height={playlist.images[0]?.height}
                />
                <Box className={style.text_playlist}>
                  <h1>{playlist.name}</h1>
                  <p>{playlist.description}</p>
                </Box>
              </Box>
            ))}
          </Box>
          <Toaster />
        </Box>
        <Box minWidth="40%">
          <Text fontSize="2rem" fontWeight="900">
            {playlistName ? playlistName : "List Tracks Playlist"}
          </Text>
          <Text fontSize="1.2rem" fontWeight="500">
            {playlistDescription ? playlistDescription : ""}
          </Text>
          <Table
            variant="striped"
            size="md"
            margin="2rem 0"
            borderRadius="1rem"
          >
            <Thead>
              <Tr>
                <Th fontSize="1rem">#</Th>
                <Th fontSize="1rem">TITLE</Th>
                <Th fontSize="1rem">ALBUM</Th>
                <Th fontSize="1rem">DURATION</Th>
                <Th fontSize="1rem">PLAY</Th>
              </Tr>
            </Thead>
            <Tbody>
              {playlistTrack.length > 0 ? (
                playlistTrack.map((item: any, idx: number) => (
                  <Tr key={item.track.id}>
                    <Td fontSize="1rem">{idx + 1}</Td>
                    <Td fontSize="1rem">{item.track.name}</Td>
                    <Td fontSize="1rem">{item.track.album.name}</Td>
                    <Td fontSize="1rem">
                      {convertMsToMinutes(item.track.duration_ms)}
                    </Td>
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
