import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const isUser = localStorage.getItem("role");

  //   console.log(isUser);

  useEffect(() => {
    if (!isUser || isUser !== "user") {
      // Corrected condition
      navigate("/sign-in");
    }
  }, [isUser, navigate]);

  return <div>{children}</div>;
};

export default PrivateRoute;
