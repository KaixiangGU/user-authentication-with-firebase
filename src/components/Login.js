import React, { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Container, Alert, Typography, Paper, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const initialForm = {
  email: "",
  password: "",
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signin, currentUser } = useAuthContext();
  const navigate = useNavigate();

  function handleEmailChange(e) {
    setForm({ ...form, email: e.target.value });
  }

  function handlePasswordChange(e) {
    setForm({ ...form, password: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = form;

    try {
      setError("");
      setLoading(true);
      await signin(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Failed to log in, please try again!");
    }
    setLoading(false);
  }

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{ p: 5, display: "flex", alignItems: "center", flexDirection: "column", rowGap: 3 }}
        elevation={3}
      >
        <Typography variant="h4" component="h1">
          Log In
        </Typography>
        <Typography variant="subtitle1">
          Don't have an account?
          <Link to="/signup" style={{ textDecoration: "none" }}>
            Sign Up
          </Link>
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            value={form.email}
            type="email"
            fullWidth
            InputLabelProps={{ shrink: true }}
            onChange={handleEmailChange}
            sx={{ mb: 3 }}
          />
          <TextField
            label="Password"
            value={form.password}
            type="password"
            fullWidth
            InputLabelProps={{ shrink: true }}
            onChange={handlePasswordChange}
            sx={{ mb: 3 }}
          />
          <Button
            color="success"
            variant="contained"
            size="medium"
            type="submit"
            disabled={loading}
            fullWidth
            sx={{ mb: 3 }}
          >
            Log In
          </Button>
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            <Link to="/forgot-password" style={{ textDecoration: "none" }}>
              Forgot Password?
            </Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
}
