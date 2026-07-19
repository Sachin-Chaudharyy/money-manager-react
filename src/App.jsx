import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home.jsx";
import Income from "./pages/Income.jsx";
import Expense from "./pages/Expense.jsx";
import Category from "./pages/Category.jsx";
import Filter from "./pages/Filter.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Landing from "./pages/Landing.jsx";
import { useState, useEffect } from "react";
import axiosConfig from "./util/axiosConfig";
import { API_ENDPOINTS } from "./util/apiEndPoints";

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/category" element={<Category />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

const Root = () => {
  const [status, setStatus] = useState("checking"); // "checking" | "valid" | "invalid"

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setStatus("invalid");
      return;
    }

    axiosConfig.get(API_ENDPOINTS.GET_USER_INFO)
      .then(() => setStatus("valid"))
      .catch(() => {
        localStorage.removeItem("token");
        setStatus("invalid");
      });
  }, []);

  if (status === "checking") return null; // could show a spinner here instead
  return status === "valid" ? <Navigate to="/dashboard" /> : <Landing />;
}
export default App;