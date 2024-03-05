"use client";

import { Box, Heading, Image, Flex, Text } from "@chakra-ui/react";

export default function UseCases() {
  const styleContratos = {
    boxSize: "7rem",
    m: "2rem",
  };

  return (
    <Box p="2rem" textAlign="center" bgImage="section2.sv">
      <Heading>Get Funded</Heading>
      <Heading>Take Water Action</Heading>
      <Flex w="100%" align="center" justify="center">
        <Box alignSelf="center" justify="center" sx={styleContratos}>
          <Image src="eco1.svg" mt="17px" />
          <Text mt="10px">Cleaning Proposals</Text>
        </Box>
        <Box sx={styleContratos}>
          <Image src="criminal.svg" />
          <Text>Investigation Proposals</Text>
        </Box>
      </Flex>
    </Box>
  );
}
