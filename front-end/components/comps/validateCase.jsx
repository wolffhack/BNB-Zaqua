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
const contractABIzerk = require("../../utils/contractABIzaqua.json");

export default function ValidateCase() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [casseNumber, setCasseNumber] = useState("");
  const toast = useToast();

  const validateCase = async (casseNumber) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ZerkContract,
        contractABIzerk,
        signer
      );
      const transaction = await contract.validateCase(casseNumber);
      console.log("transaction", transaction);
      const receipt = await transaction.wait();
      const transactionHash = receipt.transactionHash;
      console.log(transactionHash);
      toast({
        title: 'Validate Case',
        description: 'Case is validated can be funded now',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      let errorMessage;
      if (error.message && error.message.includes('Only lawyer')) {
        errorMessage = 'Only validated lawyer can validate cases';
      }
      //error handling for zerk app chain Starts
      else if (typeof error === 'object' && error.data && typeof error.data.message === 'string') {
        
        if (error.data.message.includes(' revert Only lawyer')) {
          errorMessage = 'Only validated lawyer can validate cases';
        }
        
         if (error.data.message.includes('Case is already validated')) {
          errorMessage = 'Case is already validated.';
        }
         if(error.data.message.includes('Case number does not exist')){
          errorMessage = 'Case number does not exist';
        }
      }
      //error handling for zerk app chain Ends
      else if (error.message && error.message.includes('Case is already validated')) {
        errorMessage = 'Case is already validated.';
      }else if (error.message && error.message.includes('user rejected transaction')) {
        errorMessage = 'User denied the transaction.';
      }else if(error.message && error.message.includes('Case number does not exist')){
        errorMessage = 'Case number does not exist';

      } else {
        errorMessage = `Unexpected error: ${error.message}`;
      }
      toast({
        title: 'Validate Case',
        description: `Error: ${errorMessage}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
        
      });
    }
  };

  const handleValidateCase = async () => {
    if (casseNumber) {
      validateCase(casseNumber);
      
    } else {
      toast({
        title: 'Validate Case',
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
        Validate Cases
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
              alt="Juster Image"
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
              Are u an Attestator?
            </Heading>
          </Flex>

          <ModalBody>
            <Heading fontSize="1.2rem" textAlign="center" m="4">
              Validate Cases and win coins
            </Heading>

            <form onSubmit={handleValidateCase}>
              <Flex align={"center"} justify={"center"} direction={"column"}>
                <FormControl p="1rem" pb="0" isRequired>
                  <FormLabel textAlign="center" color="white">Case Number</FormLabel>
                  <Input
                    placeholder="case Number"
                    color="white"
                    value={casseNumber}
                    onChange={(e) => setCasseNumber(e.target.value)}
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
              onClick={handleValidateCase}
            >
              Validate Case
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
