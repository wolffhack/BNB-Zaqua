import { Flex, Button, Heading, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

const HeadDash = () => {
  const router = useRouter();

  const handleConnection = async () => {
    try {
      router.push("/");
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <Flex
      color="#05D5FB"
      justify="center"
      align="center"
      p={3}
      bgColor="#0f4ac9"
    >
      <Button variant="link" onClick={handleConnection} m="2" ml="1rem">
        <Flex direction="column" bgColor="transparent">
          <Image
            alignSelf="center"
            src="zzWhite.png"
            bgColor="transparent"
            w="1.5rem"
            alt="Zaqua Logo"
          />
          <Heading bgColor="transparent" color="white" fontSize="1.5rem">ZAQUA</Heading>
        </Flex>
      </Button>
    </Flex>
  );
};

export default HeadDash;
