import React, { useState } from "react";
import { Spinner,useToast } from "@chakra-ui/react";
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import { ethers } from "ethers";
import { ZerkContract } from "../../requireEnviromentVariables";
const contractABIzerk = require("../../utils/contractABIzerk.json");

export default function CreateValidator() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [licenseNumber, setLicenseNumber] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [especiality, setEspeciality] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const toast = useToast();

  // const provider = new ethers.providers.Web3Provider(window.ethereum);

  const createValidator = async (licenseNumber, name, location, especiality) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ZerkContract,
        contractABIzerk,
        signer
      );
      const transaction = await contract.createValidator(
        licenseNumber,
        name,
        location,
        especiality
      );
      console.log("transaction", transaction);
      setLoading(true);
      const receipt = await transaction.wait();
      const transactionHash = receipt.transactionHash;
      //transaction success
      console.log(transactionHash);
      toast({
        title: 'Create Validator',
        description: 'Validator  created successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        
      });
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      let errorMessage;
  if (error.message && error.message.includes('user rejected transaction')) {
    errorMessage = 'User denied the transaction.';
  }
  
   //error handling for zerk app chain starts
   else if (typeof error === 'object' && error.data && typeof error.data.message === 'string') {
        
    if (error.data.message.includes(' revert Validator already exists')) {
      errorMessage = 'Validator already exists';
    }
  
  }
  //error handling for zerk app chain ends
  else if (error.message && error.message.includes("Validator already exists")){
    errorMessage =" Validator already exists"
  } else {
    errorMessage = `Unexpected error: ${error.message}`;
  }

  toast({
    title: 'Create Validator',
    description: `Error: ${errorMessage}`,
    status: 'error',
    duration: 2000,
    isClosable: true,
    position: 'top-right',
  });
      console.log(error)
    }
  };

  const handlecreateValidator = async () => {
    if (licenseNumber && name && location && especiality) {
      createValidator(licenseNumber, name, location, especiality);
      
    } else {
      toast({
        title: 'Create Validator',
        description: 'Please provide all arguments',
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        
      });
    }
  };

  //CALL CONTRACT DATA

  // const contractAddress =
  //   "0x4fa3d37934339457d9531ad3c85bd94def66cd9b1b18a85272fdb6e15b26cc6c";

  //instantiate contract
  //
  // const incrementer = new ethers.Contract(
  //   contractAddress,
  //   contractABIzerk,
  //   provider
  // );

  //Get Contract data
  //
  // const get = async () => {
  //   console.log(`Making a call to contract at address: ${contractAddress}`);

  // 6. Call contract
  //
  // const data = await incrementer.data.toString();

  //   console.log(`The current number stored is: ${data}`);
  // };

  // 7. Call get function
  // get();

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
        Create Validator DID
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
              alt="Validator Image"
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
              Be a Validator!
            </Heading>
          </Flex>

          <ModalBody>
            <Heading fontSize="1.2rem" textAlign="center" m="4">
              Wait for the validation of your Identity <br />& Start Earning
              Money
            </Heading>
            <Text color="white" align="center"> You need a Professional License to be a Validator</Text>

            <form onSubmit={handlecreateValidator}>
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
                <FormControl p="1rem" pb="0" isRequired>
                  <FormLabel textAlign="center" color="white">Especiality</FormLabel>
                  <Input
                    placeholder="Especiality"
                    color="white"
                    value={especiality}
                    onChange={(e) => setEspeciality(e.target.value)}
                  />
                </FormControl>
                <Stack spacing={6} direction={["column", "row"]}></Stack>
              </Flex>
            </form>
          </ModalBody>

          <ModalFooter justify={"space-arround"} flexDir="column">
            {success ? (
              <Alert status="success" variant="solid">
                <AlertIcon />
                Data uploaded to the server. Fire on!
              </Alert>
            ) : (
              <>
                {loading ? (
                  <>
                    <Text>Transaction Loading</Text>
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="#adff00"
                      size="xl"
                    />
                  </>
                ) : (
                  <></>
                )}
                {loading ? (
                  <></>
                ) : (
                  <>
                    <Button
                      bg={"blue"}
                      color={"white"}
                      w="full"
                      _hover={{
                        bg: "transparent",
                        border: "2px solid #fff",
                        
                      }}
                      onClick={handlecreateValidator}
                    >
                      Create Validator
                    </Button>
                  </>
                )}
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
