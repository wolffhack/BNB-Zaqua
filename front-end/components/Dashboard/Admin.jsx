import { Flex, Heading, Box } from "@chakra-ui/react";
import ValidateScientist from "../comps/validateAttestator";

export default function Admin() {
  return (
    <Box h="100vh" p="2rem" bgColor="transparent" align={"center"} justify={"center"}>
      <Heading p="1rem" color="white">Admin For Demo Purposes</Heading>
      <Flex mt="2rem" justify={"center"}>
        <ValidateScientist />
      </Flex>
    </Box>
  );
}
