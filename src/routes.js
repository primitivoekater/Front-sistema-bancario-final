import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Main from "./Pages/Main";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import GlobalProvider from "./contexts/GlobalContext";
import { getItem } from "./utils/storage";

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

function MyRoutes() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<ProtectedRoutes redirectTo={"/"} />}>
            <Route path="/main" element={<Main />} />
          </Route>
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default MyRoutes;
