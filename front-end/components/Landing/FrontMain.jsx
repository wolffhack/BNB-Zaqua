import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Hero() {
  const handleLogin = () => {
    router.push("/Dashboard");
  };
  const router = useRouter();
  return (
    <Flex
      className="wrapper"
      direction={"column"}
      align={"center"}
      justify={"center"}
      borderTop={"1px solid #0f4ac9"}
      bgImage="guy-lake-makes-fire.jpg"
      bgSize="cover"
      bgRepeat="no-repeat" 
    
    > 
    <div className="landing-hero">
      <Container maxW="">
      <Stack 
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 5, md: 10 }}
      >
        <Image
          bgColor="transparent"
          alignSelf={"center"}
          w={"20px"}
          src="zerk idea Z.svg"
        ></Image>
        <Heading
          fontWeight={500}
          // fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          fontSize={"4rem"}
          lineHeight={"70%"}
          color="white"
        >
          ZAQUA
          <br />
          <Text as={"span"} color={"#0f4ac9"}>
            network
          </Text>
        </Heading>
        <Text
          mt="5px"
          fontWeight={600}
          // fontSize={{ base: "xl", sm: "2xl", md: "4xl" }}
          fontSize="1.5rem"
          lineHeight={"2px"}
          color={"white"}
        >
          Decentralized Science
        </Text>
        
      </Stack>
    </Container>
    <Flex direction="column" mr="1.5rem">
        <Text fontSize={"1.5rem"} fontWeight={"500"} color="white"  mb="1rem" mt="rem">Zaqua Network is a crowdfunding decentralized platform, that allows community to come together and clean the water</Text>

        <Stack
          direction={"column"}
          spacing={3}
          align={"center"}
          alignSelf={"center"}
          position={"relative"}
        >
          <Button
            onClick={handleLogin}
            mt="1rem"
            bgColor="blue"
            border="1px"
            borderColor="#0f4ac9"
            color="white"
            _hover={{
              bg: "transparent",
              color: "#fff",
              border: "2px solid #fff",
            }}
          >
            Get Started
          </Button>
        </Stack>
    </Flex>
    </div>
    </Flex>
  );
}
