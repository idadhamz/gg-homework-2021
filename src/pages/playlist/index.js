import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { useSelector } from "react-redux";
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

// Components
import Image from "../../components/Image";

// Services
import { getUserPlaylists, getTrackPlaylist } from "../../services/apiSpotify";

// Utils
import convertMsToMinutes from "../../utils/convertMsToMinutes";

const index = () => {
  const token = useSelector((state) => state.auth.token);

  const [playlists, setPlaylists] = useState([]);
  const [playlistTrack, setPlaylistTrack] = useState([]);

  useEffect(() => {
    if (token) {
      getUserPlaylists(token).then((data) => setPlaylists(data.items));
    }
  }, [token]);

  const selectPlaylist = (e, playlist_id) => {
    e.preventDefault();

    if (playlist_id) {
      getTrackPlaylist(token, playlist_id).then((data) =>
        setPlaylistTrack(data.items)
      );
    }
  };

  console.log(playlistTrack);

  const playlistView = () => {
    return (
      <Flex dir="row" justify="space-between" gridGap="2rem">
        <Box>
          <Text fontSize="2rem" fontWeight="900">
            List Playlist
          </Text>
          <div className={style.playlists}>
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className={style.item_playlist}
                onClick={(e) => selectPlaylist(e, playlist.id)}
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
        {playlistTrack && (
          <Box>
            <Text fontSize="2rem" fontWeight="900">
              List Tracks Playlist
            </Text>
            <Table
              variant="striped"
              size="lg"
              margin="2rem 0"
              borderRadius="1rem"
            >
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>TITLE</Th>
                  <Th>ALBUM</Th>
                  <Th>DURATION</Th>
                </Tr>
              </Thead>
              <Tbody>
                {playlistTrack.map((item, idx) => (
                  <Tr key={item.track.id}>
                    <Td>{idx + 1}</Td>
                    <Td>{item.track.name}</Td>
                    <Td>{item.track.album.name}</Td>
                    <Td>{convertMsToMinutes(item.track.duration_ms)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
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
