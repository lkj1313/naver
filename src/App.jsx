import { BrowserRouter, Routes, Route } from "react-router-dom";
import app from "./firebase-config.js";
import PrivateRoute from "./PrivateRoute.jsx";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import styles from "./App.module.css";
import SignUp from "./pages/Login-SignUp/SignUp";
import Login from "./pages/Login-SignUp/Login.jsx";
import { useEffect, useState } from "react";
import Home from "./pages/main/Home.jsx";

function App() {
  const [userId, setUserId] = useState();
  const [user, setUser] = useState(null);
  const [loginId, setLoginId] = useState("");

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

  const handleLogout = async () => {
    // 로그아웃함수
    try {
      await signOut(auth);
      alert("로그아웃이 완료되었습니다.");
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다:", error.message);
    }
  };
  return (
    <div className={styles.appDiv}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                setUserId={setUserId}
                loginId={loginId}
                setLoginId={setLoginId}
              />
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home userId={userId} logout={handleLogout} />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
