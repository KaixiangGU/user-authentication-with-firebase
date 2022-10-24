import React, { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Container, Alert, Typography, Paper, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const initialForm = {
  email: "",
};

export default function ForgotPassword() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuthContext();

  function handleEmailChange(e) {
    setForm({ ...form, email: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email } = form;

    try {
      setError("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your email to reset password!");
    } catch (error) {
      console.log(error);
      setError("Email not fount, please try again!");
    }
    setLoading(false);
  }

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          p: 5,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          rowGap: 3,
        }}
        elevation={3}
      >
        <Typography variant="h4" component="h1">
          Reset Password
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
        {message && (
          <Alert severity="success" sx={{ width: "100%" }}>
            {message}
          </Alert>
        )}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Email"
            value={form.email}
            type="email"
            fullWidth
            InputLabelProps={{ shrink: true }}
            placeholder="Please enter your email"
            onChange={handleEmailChange}
            sx={{ mb: 3 }}
          />
          <Button variant="contained" size="medium" type="submit" disabled={loading} fullWidth>
            Reset Password
          </Button>
        </form>
        <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            Log In
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
