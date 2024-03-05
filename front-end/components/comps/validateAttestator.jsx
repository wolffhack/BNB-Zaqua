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
import { ZaquaContract } from "../../requireEnviromentVariables";
const contractABIZaqua = require("../../utils/contractABIzaqua.json");

export default function ValidateAttestator() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState("");
  const toast = useToast();

  const validateAttestator = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ZaquaContract,
        contractABIZaqua,
        signer
      );
      const transaction = await contract.validateAttestator(address);
      console.log("transaction", transaction);
      const receipt = await transaction.wait();
      const transactionHash = receipt.transactionHash;
      console.log(transactionHash);
      toast({
        title: 'Validate Attestator',
        description: 'Congratulations! Attestator is validated now.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      let errorMessage;
      if (error.message && error.message.includes('Only owner')) {
        errorMessage = 'Only Owner can validate Attestator';
      }
      //error handling for Zaqua app chain Starts
      else if (typeof error === 'object' && error.data && typeof error.data.message === 'string') {
        
        if (error.data.message.includes(' revert Only owner')) {
          errorMessage = 'Only Owner can validate Attestator';
        }
        if (error.data.message.includes('revert Attestator is already validated')) {
          errorMessage = 'Attestator is already validated.';
        }
      }
      //error handling for Zaqua app chain Ends
        else if (error.message && error.message.includes(' Attestator is already validated')) {
        errorMessage = ' Attestator is already validated.';
      }else if (error.message && error.message.includes('user rejected transaction')) {
        errorMessage = 'User denied the transaction.';
      } else {
        errorMessage = `Unexpected error: ${error.message}`;
      }
      toast({
        title: 'Validate Attestator',
        description: `Error: ${errorMessage}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
        
      });
    }
  };

  const handlevalidateAttestator = async () => {
    if (address) {
      validateAttestator(address);
    } else {
      toast({
        title: 'Validate Attestator',
        description: 'Please provide Attestator address',
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
          color: "#fff",
          border: "2px solid #fff",
        }}
      >
        Validate Attestator
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
              alt="Attestator Image"
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
              Validate a Attestator!
            </Heading>
          </Flex>

          <ModalBody>
            <Heading fontSize="1.2rem" textAlign="center" m="4">
              Input address of Attestator
            </Heading>

            <form onSubmit={handlevalidateAttestator}>
              <Flex align={"center"} justify={"center"} direction={"column"}>
                <FormControl p="1rem" pb="0" isRequired>
                  <FormLabel textAlign="center" color="white"> Attestator Address</FormLabel>
                  <Input
                    placeholder="Attestator Address"
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
              onClick={handlevalidateAttestator}
            >
              Validate Attestator
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
