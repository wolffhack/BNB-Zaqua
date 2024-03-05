import { Flex, Heading, Box } from "@chakra-ui/react";
import DonateToCase from "../comps/donateFunds";

export default function Donator() {
  return (
    <Box h="100vh" align={"center"} p="2rem">
      <Heading mt="10rem">Donate $bnb</Heading>
      <Heading>Contribute to clean water</Heading>
      <Flex justify="center" mt="2rem">
        <DonateToCase />
      </Flex>
    </Box>
  );
}
