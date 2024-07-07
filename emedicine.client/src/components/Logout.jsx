import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
const Logout = () => {
  const [profile, setProfile] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const handleLogout = async () => {
      const response = await fetch("api/Users/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setProfile(null);
    };

    handleLogout();
    navigate("/");
  }, []);
  return;
};

export default Logout;
