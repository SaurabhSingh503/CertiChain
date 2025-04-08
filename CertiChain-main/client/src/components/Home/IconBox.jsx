import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const IconBox = ({ icon, text, onClick }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "10rem",
        height: "10rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        backgroundColor: "rgba(124, 122, 122, 0.48)",
        backdropFilter: "blur(10px)",
        transition: '.3s ease-in-out',
        "&:hover": {
          backgroundColor: "action.hover",
          transform: 'translateY(-7px)'
        },
        paddingX: '3rem',
        paddingY: '1rem',
        border: '1px solid #ffffff',
        boxShadow: '1px 1px 20px 7px rgba(141, 140, 140, 0.8)'
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          width: "5rem",
          height: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="h6"
        align="center"
        color={"white"}
        fontWeight={"bold"}
      >
        {text}
      </Typography>
    </Paper>
  );
};

export default IconBox;
