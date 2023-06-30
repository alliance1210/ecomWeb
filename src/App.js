import { Routes, Route } from "react-router-dom";
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ResetPassword from './components/auth/ResetPassword';
import Navbar from './components/navbar/Navbar';
import { useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import PrivateRoutes from './components/utils/PrivateRoutes';
import Home from './components/Home';
import { AuthProvider } from "./components/utils/AuthContext";
import './App.css'
import Cart from "./components/Cart";
import { Box } from "@mui/material";
function App() {


  return (
    <>
      <AuthProvider>
      <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoutes />} >
            <Route index element={<Home />} path="/" exact />
            <Route path="/cart" element={<Cart/>} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resetpassword" element={<ResetPassword />}/>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
