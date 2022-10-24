import React, { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Container, Alert, Typography, Paper, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const initialForm = {
  email: "",
};

export default function ChangeEmail() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { changeEmail, currentUser } = useAuthContext();
  const navigate = useNavigate();

  function handleEmailChange(e) {
    setForm({ ...form, email: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email } = form;

    if (currentUser.email === email) {
      return setError("Your new Email must be different than your current Email");
    }

    try {
      setError("");
      setLoading(true);
      await changeEmail(email);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(`${error.message}`);
    }
    setLoading(false);
  }

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          rowGap: 3,
        }}
        elevation={3}
      >
        <Typography variant="h4" component="h1">
          Change Email
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}
        <Typography variant="subtitle1">Your current email is: {currentUser.email}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="New Email"
            value={form.email}
            type="email"
            fullWidth
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
        <Typography variant="body1">
          <Link to="/" style={{ textDecoration: "none" }}>
            Cancel
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
