// PrivateRoute.jsx
import { Route, Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const auth = getAuth();

function PrivateRoute({ children }) {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
export default PrivateRoute;
