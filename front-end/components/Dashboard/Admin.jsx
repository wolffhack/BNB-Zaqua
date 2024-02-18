import { Flex, Heading, Box } from "@chakra-ui/react";
import ValidateScientist from "../comps/validateAttestator";

export default function Admin() {
  return (
    <Box h="100vh" p="2rem" align={"center"} bgColor="transparent">
      <Heading p="10rem">ADMIN FOR DEMO PURPOSES</Heading>
      <Flex mt="2rem" justify="space-around">
        <ValidateScientist />
      </Flex>
    </Box>
  );
}
