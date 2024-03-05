"use client";
// Header.jsx

import { Flex, Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const handleConnection = () => {
    router.push("/Dashboard");
  };

  return (
    <Flex
      bgColor="#0f4ac9"
      color="#fff"
      justify="center"
      align="center"
      h="10vh"
      p={4}
    >
      <Heading size="">ZAQUA</Heading>
      <Button bgColor="transparent" color="#fff" onClick={handleConnection}>
        LOGIN
      </Button>
    </Flex>
  );
};

export default Header;
