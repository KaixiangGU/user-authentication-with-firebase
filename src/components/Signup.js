import React, { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Container, Alert, Typography, Paper, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const initialForm = {
  email: "",
  password: "",
  passwordConfirm: "",
};

export default function Signup() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, currentUser } = useAuthContext();
  const navigate = useNavigate();

  function handleEmailChange(e) {
    setForm({ ...form, email: e.target.value });
  }

  function handlePasswordChange(e) {
    setForm({ ...form, password: e.target.value });
  }

  function handlePasswordConfirmChange(e) {
    setForm({ ...form, passwordConfirm: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password, passwordConfirm } = form;

    if (password !== passwordConfirm) {
      return setError("Passwords do not match!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Something went wrong, please try again!");
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
          Sign Up
        </Typography>
        <Typography variant="body1">
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Log In
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
          <TextField
            label="Password Confirmation"
            value={form.passwordConfirm}
            type="password"
            fullWidth
            InputLabelProps={{ shrink: true }}
            onChange={handlePasswordConfirmChange}
            sx={{ mb: 3 }}
          />
          <Button
            color="success"
            variant="contained"
            size="medium"
            type="submit"
            disabled={loading}
            fullWidth
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
