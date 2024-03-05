"use client";

import { Flex, Heading, Box, Text, Image } from "@chakra-ui/react";
export default function Team() {
  const profileImage = {
    objectFit: "cover",
    boxSize: "150px",
    // m: "0",
    borderRadius: "full",
  };

  return (
    <Flex
      h="60vh"
      direction="column"
      justify={"center"}
      align="center"
      bgImage="abstract Grey.sv"
    >
      <Heading mb="20px">Team</Heading>
      <Flex>
        <Box align="center" m="3">
          <Flex direction="row" align="center" justify={"center"} gap="5rem">
                <Image
                src="https://gateway.pinata.cloud/ipfs/QmWe62Ct1yZsHYcAdRGfPuVoc5coTeqrqVdWxjXyy9LSqz?_gl=1*guf7o3*_ga*MTUzNDI2NjE5My4xNjczNDgxNzM1*_ga_5RMPXG14TE*MTY3ODA1NTg2OC41LjEuMTY3ODA1NTkwNi4yMi4wLjA."
                sx={profileImage}
                alt="Wolfhack profile pic"
                border="1px solid #0f4ac9"
              />
              <Image
                src="https://gateway.pinata.cloud/ipfs/QmWe62Ct1yZsHYcAdRGfPuVoc5coTeqrqVdWxjXyy9LSqz?_gl=1*guf7o3*_ga*MTUzNDI2NjE5My4xNjczNDgxNzM1*_ga_5RMPXG14TE*MTY3ODA1NTg2OC41LjEuMTY3ODA1NTkwNi4yMi4wLjA."
                sx={profileImage}
                alt="Wolfhack profile pic"
                border="1px solid #0f4ac9"
                mr="-30px"
              />
          </Flex>
          
          <Flex direction="row" gap="5rem" m="10px" align="center" justify={'center'}>
            <Text fontSize="1rem" mr="5px"><h5>Mario Andrade<br />Legal Wizzard & Web3 Dev</h5></Text>
            <Text fontSize="1rem" ml="px"><h5 >Favour Chikezie <br />Frontend Lead</h5></Text>
          </Flex>
        </Box>   
      </Flex>
    </Flex>
  );
}
