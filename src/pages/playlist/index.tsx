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
import { BsTrashFill } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

// Components
import Image from "../../components/Image";
import Button from "../../components/Button";

// Services
import {
  getUserPlaylists,
  getTrackPlaylist,
  unFollowPlaylist,
} from "../../services/apiSpotify";

// Redux
import { useAppSelector } from "../../redux/hooks";

// Slices
import { token } from "../../redux/slices/authSlice";

// Utils
import convertMsToMinutes from "../../utils/convertMsToMinutes";

const index = () => {
  const tokenValue = useAppSelector(token);

  const [playlists, setPlaylists] = useState([]);
  const [playlistsId, setPlaylistsId] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [playlistTrack, setPlaylistTrack] = useState([]);

  useEffect(() => {
    getUserPlaylists(tokenValue).then((data) => setPlaylists(data.items));
  }, [playlists]);

  const selectPlaylist = (e: any, playlist: any) => {
    e.preventDefault();
    if (playlist) {
      const { id, name, description } = playlist;
      getTrackPlaylist(tokenValue, id).then((data) =>
        setPlaylistTrack(data.items)
      );
      setPlaylistsId(id);
      setPlaylistName(name);
      setPlaylistDescription(description);
    }
    toast(`${playlist.name} Selected`, {
      duration: 2000,
      position: "bottom-right",
      icon: "👏",
      style: { backgroundColor: "#4DC05A", color: "#fff" },
    });
  };

  const unFollowAction = (e: any, playlist: any) => {
    e.preventDefault();
    const { id, name } = playlist;
    if (id) {
      unFollowPlaylist(tokenValue, id).then((data) => console.log(data));
      setPlaylistTrack([]);
      setPlaylistName("");
      setPlaylistDescription("");
    }
    toast(`Unfollow Playlist ${name} Succesfully`, {
      duration: 2000,
      position: "bottom-right",
      icon: "👏",
      style: { backgroundColor: "red", color: "#fff" },
    });
  };

  const playlistView = () => {
    return (
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify="space-between"
        gridGap="2rem"
      >
        <Box>
          <Text fontSize="2rem" fontWeight="900">
            List Playlist
          </Text>
          <Box className={style.playlists}>
            {playlists.map((playlist: any) => (
              <Box key={playlist.id} className={style.item_playlist}>
                <Image
                  src={playlist.images[0]?.url}
                  width={playlist.images[0]?.width}
                  height={playlist.images[0]?.height}
                />
                <Box className={style.text_playlist}>
                  <h1>{playlist.name}</h1>
                  <p>{playlist.description}</p>
                  <Box marginTop="1.5rem">
                    <Button
                      bg="#4DC05A"
                      color="white"
                      style={{ width: "100%", fontWeight: "normal" }}
                      onClick={(e) => selectPlaylist(e, playlist)}
                    >
                      <span style={{ margin: "0 5px" }}>
                        {playlist.id === playlistsId
                          ? "Selected"
                          : "View Tracks"}
                      </span>
                    </Button>
                    <Button
                      bg="red"
                      color="white"
                      style={{ width: "100%", fontWeight: "normal" }}
                      m="10px 0"
                      onClick={(e) => unFollowAction(e, playlist)}
                    >
                      <BsTrashFill />{" "}
                      <span style={{ margin: "0 5px" }}>Unfollow</span>
                    </Button>
                  </Box>
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
                <Th fontSize="1rem">TRACK</Th>
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
