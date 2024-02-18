import { Flex, Heading, Box } from "@chakra-ui/react";
import CreateScientist from "../comps/createAttestator";
import ValidateCase from "../comps/validateCase";
import ValidateJuster from "../comps/validateScientist";

export default function ScienceVerificator() {
  return (
    <Box h="100vh" p="2rem" align={"center"} bgColor="transparent">
      <Heading p="10rem">
        Are you a Scientist Expert? <br /> Validate Cases & Earn Money
      </Heading>
      <Flex mt="2rem" justify="space-around">
        <CreateScientist />
        <ValidateCase />
        <ValidateJuster />
      </Flex>
    </Box>
  );
}
