import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import "./fonts.css";
import { login, logout } from "../../store/actions/authActions";
import OfferLetter from "../OfferLetter";

function Home() {
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)|| false;
  // const user = useSelector((state) => state.auth.user)|| {};

  // const handleLogin = (user) => {
  //   dispatch(login(user));
  // };

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundImage: `url(/assets/bg.jpg)`,
        minHeight: "100vh",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        color: '#FFFFFF',
      }}
    >
      <Navbar
      // setIsLoginModalOpen={setIsLoginModalOpen}
      // setIsRegisterModalOpen={setIsRegisterModalOpen}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "100px",
          paddingBottom: '30px',
          flexDirection: "column",
          paddingX: "5rem",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#FFFFFF",
            fontFamily: "Irish Grover",
            textAlign: "center",
          }}
          variant="h2"
        >
          {/* Welcome{" "}
          {isLoggedIn ? <span style={{ color: "blue" }}>{user.name}</span> : ""}{" "}
          to <br /> */}
          <span style={{ fontSize: '30px' }}>Welcome to</span> <br />
          CertiChain
        </Typography>
        <Typography
          sx={{
            color: "#FFFFFF",
          }}
          variant="h5"
          textAlign={"center"}
          style={{ fontWeight: '500', paddingTop: '30px' }}
        >
          A decentralized platform, leveraging Web3 and Blockchain technology to
          securely generate and store your offer letters. Experience the future
          of recruitment today.
        </Typography>
      </Box>
      <OfferLetter />
    </Box>
  );
}

export default Home;

{/* <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "50px",
  }}
>
  {isLoggedIn ? (
    user.role === "organization" ? (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "50%",
          marginY: "20px",
        }}
      >
        <IconBox
          icon={
            <CreateIcon sx={{ fontSize: 60, color: "primary.main" }} />
          }
          text="Create Offer Letter"
          onClick={() => setIsOfferLetterModalOpen(true)}
        />
        <IconBox
          icon={
            <VisibilityIcon
              sx={{ fontSize: 60, color: "primary.main" }}
            />
          }
          text="View asigned Offer Letters"
          onClick={() => console.log("View all the offer letters")}
        />
      </Box>
    ) : (
      <IconBox
        icon={<CreateIcon sx={{ fontSize: 60, color: "primary.main" }} />}
        text="View Offer Letters"
        onClick={() => console.log("View all the offer letters")}
      />
    )
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "50%",
        marginY: "20px",
      }}
    >
      <IconBox
        icon={
          <LockOpenIcon sx={{ fontSize: 60, color: "primary.main" }} />
        }
        text="Register"
        onClick={() => setIsRegisterModalOpen(true)}
      />
      <IconBox
        icon={
          <LockOpenIcon sx={{ fontSize: 60, color: "primary.main" }} />
        }
        text="Login"
        onClick={() => setIsLoginModalOpen(true)}
      />
    </Box>
  )}
</Box> */}
{/* <Box>
  <RegistrationModal
    isOpen={isRegisterModalOpen}
    setIsOpen={setIsRegisterModalOpen}
  />
  <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
  <CreateOfferLetterModal
    open={isOfferLetterModalOpen}
    handleClose={setIsOfferLetterModalOpen}
  />
</Box> */}