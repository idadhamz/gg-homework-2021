import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Box, Text } from "@chakra-ui/react";

// Components
import TrackSearch from "../../components/track-search";
import TrackItem from "../../components/track-item";
import PlaylistForm from "../../components/playlist-form";

// Utils
import { selectPlaylist } from "../../utils/selectPlaylist";

// Slices
import { setNullSelectedTrack } from "../../redux/slices/trackSlice";
import { setUser } from "../../redux/slices/authSlice";

// Services
import {
  getUserProfile,
  getSearchTrack,
  createNewPlaylist,
  addTrackToPlaylist,
} from "../../services/apiSpotify";

const index = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const [track, setTrack] = useState([]);
  const [input, setInput] = useState("");
  const [formPlaylist, setFormPlaylist] = useState({
    title: "",
    desc: "",
  });

  const { selectedTracks, checkSelected, handleSelect } = selectPlaylist();
  console.log(selectedTracks);

  useEffect(() => {
    getSearchTrack(token, "Love").then((data) => setTrack(data.tracks.items));
    getUserProfile(token).then((data) => dispatch(setUser(data)));
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

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormPlaylist({ ...formPlaylist, [name]: value });
  };

  console.log(user);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (selectedTracks.length > 0) {
      const userId = user.id;
      createNewPlaylist(token, userId, formPlaylist).then((newPlaylist) =>
        addTrackToPlaylist(token, newPlaylist.id, selectedTracks).then((data) =>
          console.log(data)
        )
      );

      alert(`Create Playlist "${formPlaylist.title}" Successfully`);
      setFormPlaylist({ title: "", desc: "" });
      dispatch(setNullSelectedTrack());
    }
  };

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      justify="space-between"
      gridGap="2rem"
      p={{ base: "2rem 2rem", lg: "2rem 8rem" }}
    >
      <Box>
        <Text
          width="100%"
          bg="#F2F6F9"
          color="#000"
          p="1rem 1.5rem"
          border="1.5px solid gray"
          borderRadius="1rem"
          textAlign="center"
          textTransform="uppercase"
        >
          1. Select Track Terlebih Dahulu
        </Text>
        <div className={style.div_search}>
          <Text fontSize="2rem" fontWeight="900">
            Daftar Track
          </Text>

          <TrackSearch
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            input={input}
          />
        </div>

        <div className={style.track_playlist}>
          {track.map((item, idx) => (
            <TrackItem
              data={item}
              key={item.id}
              idx={idx}
              handleSelect={handleSelect}
              isSelected={checkSelected(item.uri)}
            />
          ))}
        </div>
      </Box>
      <Box p={{ base: "0", lg: "0 1.5rem" }}>
        <Text
          width="100%"
          bg="#F2F6F9"
          color="#000"
          p="1rem 1.5rem"
          border="1.5px solid gray"
          borderRadius="1rem"
          textAlign="center"
          textTransform="uppercase"
        >
          2. Buat Playlist (Nama & Deskripsi)
        </Text>
        <Text fontSize="2rem" fontWeight="900" p="2rem 0">
          Playlist Form
        </Text>
        <PlaylistForm
          handleSubmitForm={handleSubmitForm}
          handleChangeForm={handleChangeForm}
          formPlaylist={formPlaylist}
        />
      </Box>
    </Flex>
  );
};

export default index;
