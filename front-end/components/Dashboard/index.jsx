import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Image,
  Button,
  Box,
} from "@chakra-ui/react";
import HeadDash from "../comps/HeadDash";
import LegalVerificator from "./Attestator";
import Juster from "./Scientist";
import Donator from "./Donator";
import Admin from "./Admin";
import { color } from "framer-motion";
import { useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState ,useEffect} from "react";
export default function Dashboard() {
  const styleTabList = {
    mb: "1rem",
    ml: "1rem",
    mr: "1rem",
    fontSize: "md",
    color: "#fff",
    _hover: { color: "#000" },
  };

  const [walletConnected, setWalletConnected] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState(null);
  const toast = useToast();

  const handleConnect = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Requesting user's permission to connect their wallet
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

      // Wallet connected successfully
      const connectedAddress = accounts[0];
      console.log("Wallet connected:", connectedAddress);
      setConnectedAddress(connectedAddress);
      setWalletConnected(true);
      toast({
        title: 'Wallet Connection',
        description: 'Connected Successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-left',
        
      });
    } catch (error) {
      // Handle connection error
      console.error("Error connecting wallet:", error);

      // Check for the error code indicating user denied the connection
      if (error.code === 4001) {
        console.log("User denied connection");
        let errorMessage;
        if (error.message && error.message.includes('User rejected the request')) {
          errorMessage = 'User denied the connection';
        }
        //error handling for rotam app chain Starts
        else if (typeof error === 'object' && error.data && typeof error.data.message === 'string') {
          
          if (error.data.message.includes('User rejected the request')) {
            errorMessage = 'User denied the connection';
          }
          
        }
        //error handling for rotam app chain Ends
         else {
          errorMessage = `Unexpected error: ${error.message}`;
        }
        toast({
          title: 'Wallet Connection',
          description: `Error: ${errorMessage}`,
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top-left',
          
        });
      }
    }
  };

  const handleDisconnect = () => {
    // Handle disconnection
    console.log("Wallet disconnected");
    setConnectedAddress(null);
    setWalletConnected(false);
  };

  // Listen for changes in the MetaMask accounts
  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      // If the accounts array is empty, the user has disconnected
      if (accounts.length === 0) {
        handleDisconnect();
      }
    };

    // Subscribe to the MetaMask accountsChanged event
    window.ethereum.on("accountsChanged", handleAccountsChanged);

    // Cleanup the event listener on component unmount
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  // Function to shorten the Ethereum address
  const shortenAddress = (address, length = 8) => {
    const prefix = address.substring(0, length);
    const suffix = address.substring(address.length - length);
    return `${prefix}...${suffix}`;
  };

  return (
    <Box bgImage="section2.svg" bgSize="cover" bgRepeat="no-repeat">
      <Flex p="1rem" bgColor="white" w="100%" justify="space-between">
        ZAQUA
        <Button
          bgColor="transparent"
          border="2px"
          borderColor="#0f4ac9"
          color="#0f4ac9"
          onClick={handleConnect}
          disabled={walletConnected} // Disable the button if already connected
        >
            {walletConnected ? `Connected: ${shortenAddress(connectedAddress)}` : "Connect Wallet"}
        </Button>
      </Flex>
      <Tabs mt="2rem" isManual variant="lazy" orientation="vertical" isFitted>
        <TabList>
          <Flex bgColor="#0f4ac9" direction="column" justify="left">
            <HeadDash sx={styleTabList} />
            <Tab sx={styleTabList}>
              <Image mr=".5rem" src="justerGrey.svg" />
              Scientist
            </Tab>

            <Tab sx={styleTabList}>
              <Image mr=".5rem" src="gravelGrey.svg" />
              Science Validators
            </Tab>
            <Tab sx={styleTabList}>
              <Image mr=".5rem" src="donatorGrey.svg" />
              Donators
            </Tab>
            <Tab sx={styleTabList}>
              <Image mr=".5rem" src="adminGrey.svg" />
              Admin
            </Tab>
          </Flex>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Juster />
          </TabPanel>
          <TabPanel>
            <LegalVerificator />
          </TabPanel>
          <TabPanel>
            <Donator />
          </TabPanel>
          <TabPanel>
            <Admin />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
