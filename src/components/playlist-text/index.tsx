import React from "react";
// import style from "./style.module.css";
import { Box, Text } from "@chakra-ui/react";

type Props = {
  title?: string,
  artists?: string,
}

const index = ({ title = "-", artists = "-" }: Props) => {
  return (
    <Box display="flex" flexDir="column" width="auto" mb="10px">
      <Text fontSize={{ base: "1rem", lg: "1.3rem" }} fontWeight="bold" m="0">
        {title}
      </Text>
      <Text
        fontSize={{ base: "0.8rem", lg: "1rem" }}
        m="0"
        p="0.5rem 0"
        opacity="0.7"
      >
        {artists}
      </Text>
    </Box>
  );
};

export default index;
