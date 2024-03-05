"use client";

import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function DIdentity() {
  const router = useRouter();

  const handleMetaLog = () => {
    router.push("/Dashboard");
  };
  return (
    <Flex
      direction={"column"}
      align={"center"}
      justify={"space-between"}
      borderTop={"1px solid #0f4ac9"}
      bgImage="section3.sv"
    >
      <Heading m="3rem">Are you a Scientist Attestator?</Heading>
      <Flex>
        <Image
          src="cleaningWater.jpg"
          // rounded={"0%"}
          w="50%"
          mb="1.5rem"
          ml="1.5rem"
          mr="1.5rem"
        />
        <Flex direction="column" mr="1.5rem" justifyContent="center" alignItem="center">
          <Text fontSize={"2.0rem"} fontWeight={"500"}>Be a Science Attestator!</Text>
          <Text color="#808080" mt="1rem" fontSize="1.2rem">
            We validate every science case that seeks funding in our platform.
          </Text>
          <Text color="#808080" fontSize="1.2rem">
            Be part of the community & earn bnb in the process.
          </Text>
          <Button
            mt="1rem"
            bgColor="blue"
            border="1px"
            borderColor="#0f4ac9"
            color="white"
            onClick={handleMetaLog}
            _hover={{
              bg: "transparent",
              color: "black",
              border: "2px solid #0f4ac9",
            }}
          >
            I am a Scientist
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
