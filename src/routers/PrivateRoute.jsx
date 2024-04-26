import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isUser = localStorage.getItem("role");

  useEffect(() => {
    if (!isUser || isUser !== "user" || !user) {

      navigate("/sign-in");
    }
  }, [isUser, navigate, user]);

  // Render the children only if the user is authenticated
  return user ? <div>{children}</div> : null;
};

export default PrivateRoute;
