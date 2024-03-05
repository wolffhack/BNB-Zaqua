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
const contractABIzerk = require("../../utils/contractABIzerk.json");

export default function DonateToCase() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caseNumber, setCaseNumber] = useState("");
  const [value, setValue] = useState("");
  const toast = useToast();

  const donateToCase = async (caseNumber, value) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ZerkContract,
        contractABIzerk,
        signer
      );
      const transaction = await contract.donateToCase(caseNumber, {
        value: ethers.utils.parseEther(value.toString()),
      });
      console.log("transaction", transaction);
      const receipt = await transaction.wait();
      const transactionHash = receipt.transactionHash;
      console.log(transactionHash);
      toast({
        title: 'Donate Funds',
        description: 'Donation received successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      let errorMessage;
      if (error.message && error.message.includes('Case number does not exist')) {
        errorMessage = 'Case number does not exist';
      }
      
       //error handling for zerk app chain Starts
       else if (typeof error === 'object' && error.data && typeof error.data.message === 'string') {
        
        if (error.data.message.includes('Case number does not exist')) {
          errorMessage = 'Case number does not exist';
        }
        
         if (error.data.message.includes('Case is not validated')) {
          errorMessage = 'Case is not validated';
        }
         if(error.data.message.includes('evm error: OutOfFund')){
          errorMessage = 'insufficient funds';
        }
         if(error.data.message.includes('Invalid donation amount')){
          errorMessage = 'Invalid donation amount';
        }
      }
      //error handling for zerk app chain Ends
      else if (error.message && error.message.includes(' Case is not validated')) {
        errorMessage = ' Case is not validated.';
      }else if (error.message && error.message.includes(' insufficient funds')) {
        errorMessage = ' insufficient funds.';
      }else if (error.message && error.message.includes(' Invalid donation amount')) {
        errorMessage = ' Invalid donation amount.';
      }else if (error.message && error.message.includes('user rejected transaction')) {
        errorMessage = 'User denied the transaction.';
      } else {
        errorMessage = `Unexpected error: ${error.message}`;
      }
      toast({
        title: 'Donate Funds',
        description: `Error: ${errorMessage}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
        
      });
    }
  };

  const handledonateToCase = async () => {
    if (caseNumber && value) {
      donateToCase(caseNumber, value);
    } else {
      toast({
        title: 'Donate Funds',
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
           color: "#151515",
           border: "2px solid #0f4ac9",
         }}
      >
        Donate to clean water around the world
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent bgColor={"#151515"}>
          <Flex
            alignItems="center"
            flexDir="column"
            bgColor="black"
            color="white"
            borderBottomRadius="3rem"
          >
            <Image
              src="https://copper-ready-guanaco-464.mypinata.cloud/ipfs/QmSonedE3a6r1zS9ukPYZPCTXqJX6gncwuRrXwFYhMAbU6?_gl=1*1hk0k8b*_ga*MTM1ODQ0MTgxMi4xNjk2NzkyMjEz*_ga_5RMPXG14TE*MTcwMjk2MjQwMC40My4xLjE3MDI5NjI4NTIuNjAuMC4w"
              alt="Donate Image"
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
              Be a Donator!
            </Heading>
          </Flex>

          <ModalBody>
            <Heading fontSize="1.2rem" textAlign="center" m="4">
              Donate to clean the water <br />& Help Scientists around the world.
            </Heading>
            <Text align="center" color="white">You Need $bnb tokens to Donate</Text>

            <form onSubmit={handledonateToCase}>
              <Flex align={"center"} justify={"center"} direction={"column"}>
                <FormControl p="1rem" pb="0" isRequired>
                  <FormLabel textAlign="center" color="white">Case Number</FormLabel>
                  <Input
                    placeholder="setCaseNumber Number"
                    color="white"
                    value={caseNumber}
                    onChange={(e) => setCaseNumber(e.target.value)}
                  />
                </FormControl>
                <FormControl p="1rem" pb="0" isRequired>
                  <FormLabel textAlign="center" color="white">Amount to Donate</FormLabel>
                  <Input
                    placeholder="donation"
                    color="white"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
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
              onClick={handledonateToCase}
            >
              Donate for the planet
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
