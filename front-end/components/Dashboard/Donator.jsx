import { Flex, Heading, Box } from "@chakra-ui/react";
import DonateToCase from "../comps/donateFunds";

export default function Donator() {
  return (
    <Box h="100vh" align={"center"} p="2rem" justify={"center"} bgColor="transparent">
      <Heading  p="1rem" color="white">Donate $bnb</Heading>
      <Heading color="white">Contribute to clean water</Heading>
      <Flex justify="center" mt="2rem">
        <DonateToCase />
      </Flex>
    </Box>
  );
}
