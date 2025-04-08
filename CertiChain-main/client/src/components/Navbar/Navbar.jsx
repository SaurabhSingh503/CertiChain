import React from "react";
import { Box, Typography, Button } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { login, logout } from "../../store/actions/authActions";

function Navbar(
  // { setIsRegisterModalOpen, setIsLoginModalOpen }
) {
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.user) || {};
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn) || false;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px",
        backgroundColor: "rgba(124, 122, 122, 0.68)",
        backdropFilter: "blur(10px)",
        position: "fixed",
        top: "0",
        width: "100%",
        color: "#ffffff",
        zIndex: '999'
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "25px",
            fontWeight: "bolder",
            paddingLeft: "20px",
            cursor: "pointer",
          }}
        >
          CertiChain
        </Typography>
      </Box>

      <Box sx={{ marginRight: "10px", paddingRight: '1.5rem' }}>
        {["Home", "About", "Contact Us"].map((item, index) => (
          <Button
            key={index} // Add unique key prop here
            sx={{
              color: "#FFFFFF",
              fontSize: "14px",
              marginLeft: "10px",
              fontWeight: "600",
              transition: ".3s",
              "&:hover": {
                color: "black",
                display: {
                  transform: "translateY(-2px)",
                },
              },
            }}
          >
            {item}
          </Button>
        ))}
        {/* {isLoggedIn ? (
          <Button
            sx={{
              bgcolor: "white",
              color: "black",
              fontWeight: "600",
              marginLeft: "10px",
              transition: ".3s",
              marginRight: "30px",
              "&:hover": {
                backgroundColor: "gray",
                color: "#ffffff",
                display: {
                  transform: "translateY(-5px)",
                },
              },
            }}
            onClick={() => dispatch(logout())}
            variant="contained"
          >
            LOG OUT
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={() => setIsLoginModalOpen(true)}
              sx={{
                bgcolor: "white",
                color: "black",
                fontWeight: "600",
                marginLeft: "10px",
                transition: ".3s",
                marginRight: "30px",
                "&:hover": {
                  backgroundColor: "gray",
                  color: "white",
                  display: {
                    transform: "translateY(-5px)",
                  },
                },
              }}
            >
              LOG IN
            </Button>
            <Button
              variant="contained"
              onClick={() => setIsRegisterModalOpen(true)}
              sx={{
                bgcolor: "white",
                color: "black",
                fontWeight: "600",
                transition: ".3s",
                marginRight: "30px",
                "&:hover": {
                  backgroundColor: "gray",
                  color: "white",
                  display: {
                    transform: "translateY(-5px)",
                  },
                },
              }}
            >
              Register
            </Button>
          </>
        )} */}
      </Box>
    </Box>
  );
}

export default Navbar;
