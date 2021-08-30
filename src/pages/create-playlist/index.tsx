import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { Flex, Box, Text } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

// Components
import TrackSearch from "../../components/track-search";
import TrackItem from "../../components/track-item";
import PlaylistForm from "../../components/playlist-form";
import Pagination from "../../components/Pagination";

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
  const history = useHistory();
  const dispatch = useAppDispatch();

  const tokenValue = useAppSelector(token);
  const userValue = useAppSelector(user);
  const formPlaylist = useAppSelector(form);

  const [track, setTrack] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { selectedTracks } = selectPlaylist();

  console.log(selectedTracks);

  useEffect(() => {
    setIsLoading(true);
    getSearchTrack(tokenValue, "Indah").then((data) => {
      setTrack(data.tracks.items);
      setIsLoading(false);
    });
    getUserProfile(tokenValue).then((data) => dispatch(setUser(data)));
  }, [tokenValue]);

  const handleChangeSearch = (e: any) => {
    setInput(e.target.value);
  };

  const handleSubmitSearch = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    if (input !== "") {
      getSearchTrack(tokenValue, input).then((data) => {
        setTrack(data.tracks.items);
        setIsLoading(false);
      });
      setInput("");
    } else {
      setTrack([]);
      setIsLoading(false);
    }
  };

  const handleChangeForm = (e: any) => {
    const { name, value } = e.target;
    dispatch(setForm({ ...formPlaylist, [name]: value }));
  };

  const handleSubmitForm = async () => {
    if (selectedTracks.length > 0) {
      const userId = userValue?.id;
      await createNewPlaylist(tokenValue, userId, formPlaylist).then(
        (newPlaylist) =>
          addTrackToPlaylist(tokenValue, newPlaylist.id, selectedTracks).then(
            (data) => console.log(data)
          )
      );

      toast(`Create Playlist ${formPlaylist.title} Successfully`, {
        duration: 2000,
        position: "bottom-right",
        icon: "👏",
        style: { backgroundColor: "#4DC05A", color: "#fff" },
      });
      dispatch(clearSelectedTrack());
      dispatch(clearForm());
      history.push("/playlist");
    }
  };

  return (
    <Box p={{ base: "0 2rem", lg: "0 8rem" }}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify="space-between"
        gridGap="2rem"
      >
        <Box width="100%" height="auto">
          <Box className={style.div_search}>
            <Text fontSize="2rem" fontWeight="900">
              List Track
            </Text>

            <TrackSearch
              handleSubmitSearch={handleSubmitSearch}
              handleChangeSearch={handleChangeSearch}
              input={input}
            />
          </Box>

          <Pagination
            data={track}
            RenderComponent={TrackItem}
            pageLimit={track.length / 10}
            dataLimit={10}
            isLoading={isLoading}
          />
        </Box>
        <Box p={{ base: "2rem 0", lg: "0 1.5rem" }}>
          <Text fontSize="2rem" fontWeight="900" p="2rem 0">
            Playlist Form
          </Text>
          <PlaylistForm
            handleSubmitForm={handleSubmitForm}
            handleChangeForm={handleChangeForm}
            formPlaylist={formPlaylist}
            selectedTracks={selectedTracks}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default index;
