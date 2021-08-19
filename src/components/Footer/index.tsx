import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const index = () => {
  const currentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="70px"
        p={{ base: "3rem", lg: "0" }}
        bg="#4dc05a"
      >
        <Text textAlign="center" size="2rem" fontWeight="bold" color="#fff">
          © {currentYear()} Spotify Web App Clone - Dadi Ilham S All Right
          Reserved{" "}
        </Text>
      </Flex>
    </>
  );
};

export default index;
