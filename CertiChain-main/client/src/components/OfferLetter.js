import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import {
  setAccount,
  setFormData,
  setOfferLetter,
  setVerificationResult,
  setOfferLetterId,
} from "../store/offerLetterSlice";
import { ethers, utils } from "ethers";
import OfferLetterContractABI from "../contracts/OfferLetterContract.json";
import CreateOfferLetterModal from "./Modal/CreateOfferLetterModal";
import GetOfferLetterModal from "./Modal/GetOfferLetterModal";
import VerifyOfferLetterModal from "./Modal/VerifyOfferLetterModal";
import IconBox from "./Home/IconBox";
import CreateIcon from "@mui/icons-material/Create";
import ViewIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";

// Ensure this environment variable is set in your .env file
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const OfferLetter = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [getModalOpen, setGetModalOpen] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);

  const [contract, setContract] = useState(null);

  const dispatch = useDispatch();
  const offerLetterState = useSelector((state) => state.offerLetter);

  const account = offerLetterState?.account || null;
  const formData = offerLetterState?.formData || {};
  const offerLetter = offerLetterState?.offerLetter || null;
  const verificationResult = offerLetterState?.verificationResult || null;
  const generatedOfferLetterId = offerLetterState?.offerLetterId || null;

  useEffect(() => {
    const initializeEthers = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const offerLetterContract = new ethers.Contract(
            contractAddress,
            OfferLetterContractABI.abi,
            signer
          );
          setContract(offerLetterContract);
          dispatch(setAccount(await signer.getAddress()));
        } catch (error) {
          console.error("Failed to connect to Ethereum wallet:", error);
        }
      } else {
        console.log("Ethereum wallet is not connected");
      }
    };

    initializeEthers();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const createOfferLetter = async () => {
    if (!contract) return;

    try {
      const offerLetterId = generateRandomOfferLetterId();
      const tx = await contract.createOfferLetter(
        offerLetterId,
        formData.employer,
        formData.candidate,
        formData.salary,
        formData.position,
        formData.date
      );
      await tx.wait();
      console.log("Offer letter created successfully");
      dispatch(setOfferLetterId(offerLetterId)); // Store the generated offerLetterId

      setCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating offer letter:", error);
    }
  };

  const getOfferLetter = async () => {
    if (!contract || !formData.offerLetterId) return;

    try {
      const offer = await contract.queryOfferLetter(formData.offerLetterId);
      dispatch(
        setOfferLetter({
          employer: offer[0],
          candidate: offer[1],
          salary: offer[2],
          position: offer[3],
          date: offer[4],
          offerHash: offer[5],
          uniqueURL: offer[6],
        })
      );

      setGetModalOpen(false);
    } catch (error) {
      console.error("Error fetching offer letter:", error);
    }
  };

  const verifyOfferLetter = async (offerLetterId, offerHash) => {
    if (!contract) return;

    try {
      const isValid = await contract.verifyOfferHash(offerLetterId, offerHash);
      dispatch(
        setVerificationResult(
          isValid ? "Offer letter is valid." : "Offer letter is invalid."
        )
      );
      setVerifyModalOpen(false);
    } catch (error) {
      console.error("Error verifying offer letter:", error);
    }
  };

  const generateRandomOfferLetterId = () => {
    return `offer_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  };

  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <Container sx={{
        paddingBottom: '80px'
      }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginY: "30px"
          }}
        >
          <IconBox
            icon={<CreateIcon sx={{ fontSize: 60, color: "primary.main" }} />}
            text="Create Offer Letter"
            onClick={() => setCreateModalOpen(true)}
          />

          <IconBox
            icon={<ViewIcon sx={{ fontSize: 60, color: "primary.main" }} />}
            text="Get Offer Letter"
            onClick={() => setGetModalOpen(true)}
          />

          <IconBox
            icon={<CheckIcon sx={{ fontSize: 60, color: "primary.main" }} />}
            text="Verify Offer Letter"
            onClick={() => setVerifyModalOpen(true)}
          />
        </Box>

        <CreateOfferLetterModal
          open={createModalOpen}
          handleClose={setCreateModalOpen}
          formData={formData}
          handleChange={handleChange}
          createOfferLetter={createOfferLetter}
        />

        {generatedOfferLetterId && (
          <Typography variant="h6" style={{ marginTop: 16 }} sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingY: '10px',
            fontWeight: '600',
            backgroundColor: "rgba(124, 122, 122, 0.48)",
            backdropFilter: "blur(10px)",
            border: '1px solid #ffffff',
            borderRadius: '3px'
          }}>
            Generated Offer Letter ID:&nbsp; <span style={{ color: 'cyan' }}>{generatedOfferLetterId}</span>
          </Typography>
        )}

        <GetOfferLetterModal
          open={getModalOpen}
          handleClose={setGetModalOpen}
          formData={formData}
          handleChange={handleChange}
          getOfferLetter={getOfferLetter}
        />

        {offerLetter && (
          <Paper style={{ marginTop: 16, paddingLeft: 45, paddingTop: 30, paddingBottom: 30, paddingRight: 20 }} sx={{
            paddingTop: '20px',
            paddingBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px'
          }}>
            <Typography variant="h6" style={{ fontWeight: '700', }}>Offer Letter Details:</Typography>
            {Object.entries(offerLetter).map(([key, value]) => (
              <Typography key={key}>
                {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
              </Typography>
            ))}
          </Paper>
        )}

        <VerifyOfferLetterModal
          open={verifyModalOpen}
          handleClose={setVerifyModalOpen}
          formData={formData}
          handleChange={handleChange}
          verifyOfferLetter={verifyOfferLetter}
          verificationResult={verificationResult}
        />

        {verificationResult && (
          <Typography variant="h6" sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            fontWeight: '600',
            // color: 'cyan',
            color: verificationResult.split(' ').includes('invalid') ? 'red' : 'cyan',
            marginTop: '20px',
            paddingY: '10px',
            backgroundColor: "rgba(124, 122, 122, 0.48)",
            backdropFilter: "blur(10px)",
            border: '1px solid #ffffff',
            borderRadius: '3px'
          }}>{verificationResult}</Typography>
        )}
      </Container>
      <Typography sx={{
        position: 'relative',
        bottom: '10px',
        display: 'flex',
        justifyContent: 'center',
        color: 'gray',
        fontWeight: '600'
      }}>Copyright &copy; {year} | InnovateX</Typography>
    </>
  );
};

export default OfferLetter;
