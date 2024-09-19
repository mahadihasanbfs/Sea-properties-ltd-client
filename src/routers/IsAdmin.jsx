import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const IsAdmin = ({ children }) => {
      const navigate = useNavigate();

      useEffect(() => {
            const isAdmin = localStorage.getItem("role");

            if (!isAdmin || !isAdmin == "admin") {
                  navigate("/sign-in");
            }
      }, [navigate]);
      return <div>{children}</div>;
};

export default IsAdmin;
