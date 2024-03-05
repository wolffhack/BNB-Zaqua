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
      justify="space-between"
      align="center"
      h="10vh"
      p={4}
    >
      <Heading fontSize="1.4rem" color="white">ZAQUA</Heading>
      <Button 
      bgColor="transparent" 
      color="#fff" 
      border="1px solid #fff"
      _hover={{
        bg: "transparent",
        color: "#fff",
        border: "2px solid #fff",
      }}
      onClick={handleConnection}>
        LOGIN
      </Button>
    </Flex>
  );
};

export default Header;
