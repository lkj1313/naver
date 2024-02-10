import app from "./firebase-config.js";
import "./App.css";
import SignUp from "./components/Login-SignUp/SignUp";
import Login from "./components/Login-SignUp/Login.jsx";

function App() {
  return (
    <div>
      <Login />
      <SignUp />
    </div>
  );
}

export default App;
