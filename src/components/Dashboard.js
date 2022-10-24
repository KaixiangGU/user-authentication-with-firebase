import React, { useState } from "react";
import { Container, Paper, Typography, Button, Alert } from "@mui/material";
import { useAuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { currentUser, logout } = useAuthContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError("Failed to log out");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "stretch",
          alignItems: "center",
          rowGap: 3,
        }}
      >
        <Typography variant="h5" component="h1">
          Profile
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}
        <Typography variant="subtitle1">Email: {currentUser.email}</Typography>
        <Button variant="contained" color="success" fullWidth>
          <Link to="/change-email" style={{ textDecoration: "none", color: "white" }}>
            Change Email
          </Link>
        </Button>
        <Button variant="contained" color="success" fullWidth>
          <Link to="/change-password" style={{ textDecoration: "none", color: "white" }}>
            Change Password
          </Link>
        </Button>
        <Button variant="contained" type="button" fullWidth onClick={handleLogout}>
          Log out
        </Button>
      </Paper>
    </Container>
  );
}
