import AuthProvider from "../contexts/AuthContext";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";

function App() {
  return (
    <CssBaseline>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-email" element={<ChangeEmail />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CssBaseline>
  );
}

export default App;
