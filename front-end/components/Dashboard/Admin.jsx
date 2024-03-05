import { Flex, Heading, Box } from "@chakra-ui/react";
import ValidateScientist from "../comps/validateAttestator";

export default function Admin() {
  return (
    <Box h="100vh" p="2rem" bgColor="white" align={"center"} justify={"center"}>
      <Heading p="1rem">ADMIN FOR DEMO PURPOSES</Heading>
      <Flex mt="2rem" justify={"space-around"}>
        <ValidateScientist />
      </Flex>
    </Box>
  );
}
