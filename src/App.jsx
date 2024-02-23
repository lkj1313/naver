import { BrowserRouter, Routes, Route } from "react-router-dom";
import app from "./firebase-config.js";
import PrivateRoute from "./PrivateRoute.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./App.css";
import SignUp from "./pages/Login-SignUp/SignUp";
import Login from "./pages/Login-SignUp/Login.jsx";
import { useEffect, useState } from "react";
import Home from "./pages/main/Home.jsx";

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      await setUser(user);
    });

    // cleanup 함수
    return () => {
      unsubscribe();
    };
  }, [auth]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
