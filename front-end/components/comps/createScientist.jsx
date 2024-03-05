import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import {
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Text,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Image,
  useDisclosure,
  ModalContent,
  Modal,
  Input,
} from "@chakra-ui/react";

import { ethers } from "ethers";
import { ZerkContract } from "../../requireEnviromentVariables";
const contractABIZerk = require("../../utils/contractABIzerk.json");

export default function CreateScientist() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [licenseNumber, setLicenseNumber] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const toast =useToast()

  const createScientist = async (licenseNumber, name, location) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ZerkContract,
        contractABIZerk,
        signer
      );
      const transaction = await contract.createScientist(
        licenseNumber,
        name,
        location
      );
      console.log("transaction", transaction);
      const receipt = await transaction.wait();
      const transactionHash = receipt.transactionHash;
      console.log(transactionHash);
      toast({
        title: 'Create Scientist',
        description: 'Scientist  created successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        
      });
    } catch (error) {
      let errorMessage;
  if (error.message && error.message.includes('user rejected transaction')) {
    errorMessage = 'User denied the transaction.';
  }
  
  //error handling for zerk app chain starts
  else if (typeof error === 'object' && error.data && typeof error.data.message === 'string') {
        
    if (error.data.message.includes(' revert Scientist already exists')) {
      errorMessage = 'Scientist already exists';
    }
  
  }
  //error handling for Zerk app chain ends
  else if (error.message && error.message.includes("Scientist already exists")){
    errorMessage =" Scientist already exists"
  } else {
    errorMessage = `Unexpected error: ${error.message}`;
  }

  toast({
    title: 'Create Scientist',
    description: `Error: ${errorMessage}`,
    status: 'error',
    duration: 2000,
    isClosable: true,
    position: 'top-right',
  });
      
      console.log(`Error: ${error}`);
    }
  };

  const handlecreateScientist = async () => {
    if (licenseNumber && name && location) {
      createScientist(licenseNumber, name, location);
      
    } else {
      toast({
        title: 'Create Scientist',
        description: 'Please provide all arguments',
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        
      });
    }
  };
  return (
    <>
      <Button
       bgColor="blue"
       border="1px"
       borderColor="#0f4ac9"
       color="#fff"
       onClick={onOpen}
       _hover={{
         bg: "transparent",
         color: "#fff",
         border: "2px solid #fff",
       }}
      >
        Create My Scientist DID
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent bgColor={"#151515"}>
          <Flex
            alignItems="center"
            flexDir="column"
            bgColor="black"
            borderBottomRadius="3rem"
          >
            <Image
              src="https://copper-ready-guanaco-464.mypinata.cloud/ipfs/QmSonedE3a6r1zS9ukPYZPCTXqJX6gncwuRrXwFYhMAbU6?_gl=1*1hk0k8b*_ga*MTM1ODQ0MTgxMi4xNjk2NzkyMjEz*_ga_5RMPXG14TE*MTcwMjk2MjQwMC40My4xLjE3MDI5NjI4NTIuNjAuMC4w"
              alt="Scientist Image"
              objectFit={"contain"}
              boxSize={"15rem"}
            ></Image>
            <Heading
              fontWeight="medium"
              color="white"
              fontSize="1.2rem"
              mb="1.5rem"
              textAlign="center"
              bgColor="black"
            >
              Be a Scientist!
            </Heading>
          </Flex>

          <ModalBody>
            <Heading fontSize="1.2rem" textAlign="center" m="4">
              Wait for the validation of your Identity <br />& Get Funded
            </Heading>
            <Text align="center" color="white">You need an Id to validate</Text>

            <form onSubmit={handlecreateScientist}>
              <Flex align={"center"} justify={"center"} direction={"column"}>
                <FormControl p="1rem" pb="0" isRequired>
                  <FormLabel textAlign="center" color="white">License Number</FormLabel>
                  <Input
                    placeholder="License Number"
                    color="white"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                  />
                </FormControl>
                <FormControl p="1rem" pb="0" isRequired>
                  <FormLabel textAlign="center" color="white">Name</FormLabel>
                  <Input
                    placeholder="Name"
                    color="white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl p="1rem" pb="0" isRequired>
                  <FormLabel textAlign="center" color="white">Location</FormLabel>
                  <Input
                    placeholder="Location"
                    color="white"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </FormControl>
                <Stack spacing={6} direction={["column", "row"]}></Stack>
              </Flex>
            </form>
          </ModalBody>

          <ModalFooter justify={"space-arround"}>
            <Button
               bg={"blue"}
               color={"white"}
               w="full"
               _hover={{
                 bg: "transparent",
                 border: "2px solid #fff",
                 
               }}
              onClick={handlecreateScientist}
            >
              Create Scientist
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
