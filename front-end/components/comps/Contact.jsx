"use client";

import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Contact() {
  const ListHeader = () => {
    return <Text fontWeight={"500"} fontSize={"lg"} mb={2} color={"white"}></Text>;
  };
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      bgColor="#0f4ac9"
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8} align={"center"} justify={"center"}>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Box as="a" href={"#"} color="white">
              About Us
            </Box>
            <Box as="a" href={"#"} color="white">
              Blog
            </Box>
            <Box as="a" href={"#"} color="white">
              Careers
            </Box>
            <Box as="a" href={"#"} color="white">
              Contact Us
            </Box>
          </Stack>

          <Stack align={"center"}>
            <ListHeader>Support</ListHeader>
            <Box as="a" href={"#"} color="white">
              Help Center
            </Box>
            <Box as="a" href={"#"} color="white">
              Safety Center
            </Box>
            <Box as="a" href={"#"} color="white">
              Community Guidelines
            </Box>
          </Stack>

          <Stack align={"flex-end"}>
            <ListHeader>Legal</ListHeader>
            <Box as="a" href={"#"} color="white">
              Cookies Policy
            </Box>
            <Box as="a" href={"#"} color="white">
              Privacy Policy
            </Box>
            <Box as="a" href={"#"} color="white">
              Terms of Service
            </Box>
            <Box as="a" href={"#"} color="white">
              Law Enforcement
            </Box>
          </Stack>

          {/* <Stack align={"flex-star"} bgColor={"white"}>
            <ListHeader>Install App</ListHeader>
          </Stack> */}
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text color="white">© 2023 Softlaw S.A. de C.V. All rights reserved</Text>
          <Stack direction={"row"} spacing={6} bg={"white"} borderColor={"white"}>
            <FaTwitter />

            <FaYoutube />

            <FaInstagram />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
