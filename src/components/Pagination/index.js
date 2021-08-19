import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

// Components
import Button from "../Button";

// Utils
import { selectPlaylist } from "../../utils/selectPlaylist";

const index = ({ data, RenderComponent, pageLimit, dataLimit }) => {
  const pages = Math.round(data.length / dataLimit);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [currentPage]);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  const { checkSelected, handleSelect } = selectPlaylist();

  return (
    <>
      <Box
        className={
          getPaginatedData().length > 0
            ? style.track_playlist
            : style.track_playlist_null
        }
      >
        {getPaginatedData().length > 0 ? (
          getPaginatedData().map((item) => (
            <RenderComponent
              data={item}
              key={item.id}
              handleSelect={handleSelect}
              isSelected={checkSelected(item.uri)}
            />
          ))
        ) : (
          <Flex justifyContent="center" alignItems="center">
            <Box
              width="100%"
              height="auto"
              p="2rem"
              border="1px solid #d9dadc"
              borderRadius="10px"
            >
              <Text size="2rem" fontWeight="bold" textAlign="center">
                Track not found
              </Text>
            </Box>
          </Flex>
        )}
        <Toaster />
      </Box>

      <Box className={style.div_pagination}>
        {/* previous Button */}
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage === 1 ? true : false}
        >
          Previous
        </Button>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <Button
            key={index}
            onClick={changePage}
            className={
              currentPage === item
                ? style.paginationItem_active
                : style.paginationItem
            }
          >
            <span>{item}</span>
          </Button>
        ))}

        {/* next Button */}
        <Button
          onClick={goToNextPage}
          disabled={currentPage === pages ? true : false}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default index;
