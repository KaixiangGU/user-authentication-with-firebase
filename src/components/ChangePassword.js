import React, { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Container, Alert, Typography, Paper, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const initialForm = {
  email: "",
};

export default function ChangePassword() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword, currentUser } = useAuthContext();
  const navigate = useNavigate();
  console.log(currentUser);

  function handleEmailChange(e) {
    setForm({ ...form, email: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password, passwordConfirm } = form;

    try {
      setError("");
      setLoading(true);
      await resetPassword(email);
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
        sx={{ p: 5, display: "flex", textAlign: "center", flexDirection: "column", rowGap: 3 }}
        elevation={3}
      >
        <Typography variant="h4" component="h1">
          Change Password
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Your Email"
            value={form.email}
            type="email"
            fullWidth
            placeholder="We'll send you a reset link"
            InputLabelProps={{ shrink: true }}
            onChange={handleEmailChange}
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
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
