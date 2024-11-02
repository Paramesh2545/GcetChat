import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import "../styles/app.css";
import Home from "../pages/Home";
import Authentication from "../pages/Authentication";
import { useAuthStore } from "../store/AuthStore";
import ProtectiveRoute from "../util/ProtectiveRoute";
import VerificationEmail from "../pages/VerificationEmail";
import { Toaster } from "react-hot-toast";
import PageNotFound from "../pages/PageNotFound";
import Chats from "../components/home/Chats";
import Groups from "../components/home/Groups";
import Search from "../components/home/Search";
import Archive from "../components/home/Archive";
import Profile from "../components/home/Profile";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectiveRoute>
                <Home />
              </ProtectiveRoute>
            }
          >
            <Route index Component={Chats} />
            <Route path="groups" Component={Groups} />
            <Route path="search" Component={Search} />
            <Route path="archive" Component={Archive} />
            <Route path="profile" Component={Profile} />
          </Route>
          <Route path="/auth" element={<Authentication />} />
          <Route path="/verify-email" element={<VerificationEmail />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
