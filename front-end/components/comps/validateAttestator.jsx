import React, { useState } from "react";

import { useToast } from "@chakra-ui/react";
import {
  ModalBody,
  ModalFooter,
  Button,
  Flex,
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
const contractABIzerk = require("../../utils/contractABIzerk.json");

export default function ValidateScientist() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState("");
  const toast = useToast();

  const validateScientist = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ZerkContract,
        contractABIzerk,
        signer
      );
      const transaction = await contract.validateScientist(address);
      console.log("transaction", transaction);
      const receipt = await transaction.wait();
      const transactionHash = receipt.transactionHash;
      console.log(transactionHash);
      toast({
        title: 'Validate Scientist',
        description: 'Congratulations! Scientist is validated now.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      let errorMessage;
      if (error.message && error.message.includes('Only owner')) {
        errorMessage = 'Only Owner can validate Scientist';
      }
      //error handling for zerk app chain Starts
      else if (typeof error === 'object' && error.data && typeof error.data.message === 'string') {
        
        if (error.data.message.includes(' revert Only owner')) {
          errorMessage = 'Only Owner can validate Scientist';
        }
        if (error.data.message.includes('revert Scientist is already validated')) {
          errorMessage = 'Scientist is already validated.';
        }
      }
      //error handling for zerk app chain Ends
        else if (error.message && error.message.includes(' Scientist is already validated')) {
        errorMessage = ' Scientist is already validated.';
      }else if (error.message && error.message.includes('user rejected transaction')) {
        errorMessage = 'User denied the transaction.';
      } else {
        errorMessage = `Unexpected error: ${error.message}`;
      }
      toast({
        title: 'Validate Scientist',
        description: `Error: ${errorMessage}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
        
      });
    }
  };

  const handlevalidateScientist = async () => {
    if (address) {
      validateScientist(address);
    } else {
      toast({
        title: 'Validate Scientist',
        description: 'Please provide Scientist address',
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
        width="max-width"
        onClick={onOpen}
        _hover={{
          bg: "transparent",
          color: "#151515",
          border: "2px solid #0f4ac9",
        }}
      >
        Validate Scientist
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
              Validate a Scientist!
            </Heading>
          </Flex>

          <ModalBody>
            <Heading fontSize="1.2rem" textAlign="center" m="4">
              Input address of Scientist
            </Heading>

            <form onSubmit={handlevalidateScientist}>
              <Flex align={"center"} justify={"center"} direction={"column"}>
                <FormControl p="1rem" pb="0" isRequired>
                  <FormLabel textAlign="center" color="white"> Scientist Address</FormLabel>
                  <Input
                    placeholder="Scientist Address"
                    color="white"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
              onClick={handlevalidateScientist}
            >
              Validate Scientist
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
