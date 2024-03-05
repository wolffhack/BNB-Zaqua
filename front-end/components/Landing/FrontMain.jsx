import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Hero() {
  const handleLogin = () => {
    router.push("/Dashboard");
  };
  const router = useRouter();
  return (
    <Container maxW="100%" bgImage="abstract Grey.svg">
      <Stack
        as={Box}
        textAlign={"center"}
        // float={"left"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 5, md: 10 }}
        bgColor="transparent"
      >
        <Image
          bgColor="transparent"
          alignSelf={"center"}
          w={"50px"}
          src="zerk idea Z.svg"
        ></Image>
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight={"100%"}
        >
          ZAQUA
          <br />
          <Text as={"span"} color={"white"}>
            network
          </Text>
        </Heading>
        <Text
          mt="5px"
          fontWeight={600}
          fontSize={{ base: "xl", sm: "2xl", md: "4xl" }}
          lineHeight={"2px"}
          color={"white"}
        >
          Decentralized Science
        </Text>
        <Stack
          direction={"column"}
          spacing={3}
          align={"center"}
          alignSelf={"center"}
          position={"relative"}
        >
          <Button
            onClick={handleLogin}
            textColor={"black"}
            colorScheme={"blue"}
            bgGradient={"linear(to-r, #fff, #0f4ac9)"}
            rounded={"10%"}
            px={6}
            _hover={{
              bg: "blue.100",
              color: "white",
            }}
          >
            Get Started
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
