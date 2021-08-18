import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { Flex, Box, Text } from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";

// Components
import TrackSearch from "../../components/track-search";
import TrackItem from "../../components/track-item";
import PlaylistForm from "../../components/playlist-form";

// Utils
import { selectPlaylist } from "../../utils/selectPlaylist";

// Slices
import {
  form,
  clearSelectedTrack,
  setForm,
  clearForm,
} from "../../redux/slices/playlistSlice";
import { token, user, setUser } from "../../redux/slices/authSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Services
import {
  getUserProfile,
  getSearchTrack,
  createNewPlaylist,
  addTrackToPlaylist,
} from "../../services/apiSpotify";

const index = () => {
  const dispatch = useAppDispatch();

  const tokenValue = useAppSelector(token);
  const userValue = useAppSelector(user);

  const [track, setTrack] = useState([]);
  const [input, setInput] = useState("");
  const formPlaylist = useAppSelector(form);

  const { selectedTracks, checkSelected, handleSelect } = selectPlaylist();
  console.log(selectedTracks);

  useEffect(() => {
    getSearchTrack(tokenValue, "Love").then((data) =>
      setTrack(data.tracks.items)
    );
    getUserProfile(tokenValue).then((data) => dispatch(setUser(data)));
  }, [tokenValue]);

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (input !== "") {
      getSearchTrack(tokenValue, input).then((data) =>
        setTrack(data.tracks.items)
      );
    } else {
      setTrack([]);
    }
  };

  const handleChangeForm = (e: any) => {
    const { name, value } = e.target;
    dispatch(setForm({ ...formPlaylist, [name]: value }));
  };

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();

    if (selectedTracks.length > 0) {
      const userId = userValue?.id;
      createNewPlaylist(tokenValue, userId, formPlaylist).then((newPlaylist) =>
        addTrackToPlaylist(tokenValue, newPlaylist.id, selectedTracks).then(
          (data) => console.log(data)
        )
      );

      toast(`Create Playlist "${formPlaylist.title}" Successfully`, {
        duration: 4000,
        position: "bottom-right",
        icon: "👏",
        style: { backgroundColor: "#4DC05A", color: "#fff" },
      });
      dispatch(clearSelectedTrack());
      dispatch(clearForm());
    }
  };

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      justify="space-between"
      gridGap="2rem"
      p={{ base: "0 2rem", lg: "0 8rem" }}
    >
      <Box>
        <div className={style.div_search}>
          <Text fontSize="2rem" fontWeight="900">
            List Track
          </Text>

          <TrackSearch
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            input={input}
          />
        </div>

        <div className={style.track_playlist}>
          {track.map((item: any) => (
            <TrackItem
              data={item}
              key={item.id}
              handleSelect={handleSelect}
              isSelected={checkSelected(item.uri)}
            />
          ))}
          <Toaster />
        </div>
      </Box>
      <Box p={{ base: "2rem 0", lg: "0 1.5rem" }}>
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