"use client";

import { Flex, Heading, Box, Text, Image } from "@chakra-ui/react";
export default function Team() {
  const profileImage = {
    objectFit: "cover",
    boxSize: "150px",
    borderRadius: "full",
  };

  return (
    <Flex
      h="60vh"
      direction="column"
      justify={"center"}
      align="center"
      bgImage="bright-blue-ocean.jpg"
      bgSize="cover"
      bgRepeat="no-repeat"
    >
      <Heading mb="20px">Team</Heading>
      <Flex>
        <Box align="center">
          <Flex direction="row" align="center" justify={"center"} gap="5rem">
                <Image
                src="wolf.jpg"
                sx={profileImage}
                alt="Wolfhack profile pic"
                border="1px solid #0f4ac9"
              />
              <Image
                src="heart.png"
                sx={profileImage}
                alt="Frontend Lead profie pic"
                border="1px solid #0f4ac9"
                mr="-30px"
              />
          </Flex>
          
          <Flex direction="row" gap="5rem" m="10px" align="center" justify={'center'}>
            <Text fontSize="1rem" mr="5px" color="dark">Mario Andrade<br />Legal Wizzard & Web3 Dev</Text>
            <Text fontSize="1rem" ml="px" color="dark">Favour Chikezie <br />Frontend Lead</Text>
          </Flex>
        </Box>   
      </Flex>
    </Flex>
  );
}
