import { Flex, Heading, Box } from "@chakra-ui/react";
import DonateToCase from "../comps/donateFunds";

export default function Donator() {
  return (
    <Box h="100vh" align={"center"} p="2rem">
      <Heading mt="10rem">Donate Your $bnb</Heading>
      <Heading>Be a Water Donator</Heading>
      <Flex justify="center" mt="2rem">
        <DonateToCase />
      </Flex>
    </Box>
  );
}
