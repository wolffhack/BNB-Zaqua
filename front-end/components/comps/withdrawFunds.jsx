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

export default function WithdrawFunds() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caseNumber, setCaseNumber] = useState("");
  const toast = useToast();

  const withdrawFunds = async (caseNumber) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ZerkContract,
        contractABIzerk,
        signer
      );
      const transaction = await contract.withdrawFunds(caseNumber);
      console.log("transaction", transaction);
      const receipt = await transaction.wait();
      const transactionHash = receipt.transactionHash;
      console.log(transactionHash);
      toast({
        title: 'Withdraw Funds',
        description: 'funds witdrawn Successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      let errorMessage;
      if (error.message && error.message.includes('Only Juster')) {
        errorMessage = 'Only assigned Juster can withdraw funds';
      }
      
       //error handling for zerk app chain Starts
       else if (typeof error === 'object' && error.data && typeof error.data.message === 'string') {
        
        if (error.data.message.includes(' revert Only Juster')) {
          errorMessage = 'Only assigned Juster can withdraw funds';
        }
        
         if (error.data.message.includes('Case is not fully funded')) {
          errorMessage = 'Case is not fully funded';
        }
         
      }
      //error handling for zerk app chain Ends
      else if (error.message && error.message.includes('Case is not fully funded')) {
        errorMessage = 'Case is not fully funded yet.';
      }else if (error.message && error.message.includes('user rejected transaction')) {
        errorMessage = 'User denied the transaction.';
      } else {
        errorMessage = `Unexpected error: ${error.message}`;
      }
      toast({
        title: 'Withdraw Funds',
        description: `Error: ${errorMessage}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
        
      });
    }
  };

  const handlewithdrawFunds = async () => {
    if (caseNumber) {
      withdrawFunds(caseNumber);
    } else {
      toast({
        title: 'Withdraw Funds',
        description: 'Please enter a case no.',
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
        Withdraw Funds
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
              Withdraw the case funds!
            </Heading>
          </Flex>

          <ModalBody>
            <Heading fontSize="1.2rem" textAlign="center" m="4">
              Wait for the validation of your Identity <br />& Get Funded
            </Heading>
            <Text align="center" color="white">Need an Id to validate</Text>

            <form onSubmit={handlewithdrawFunds}>
              <Flex align={"center"} justify={"center"} direction={"column"}>
                <FormControl p="1rem" pb="0" isRequired>
                  <FormLabel textAlign="center" color="white"> Case Number</FormLabel>
                  <Input
                    placeholder="Withdraw funds"
                    color="white"
                    value={caseNumber}
                    onChange={(e) => setCaseNumber(e.target.value)}
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
              onClick={handlewithdrawFunds}
            >
              Withdraw funds
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}