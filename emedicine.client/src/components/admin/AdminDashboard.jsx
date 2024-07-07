import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("api/Users/profile", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
      } else {
        console.log(data.message);
        navigate("/");
      }
    };
    // console.log(profile.id)
    fetchProfile();
  }, []);

  return (
    <>
      <div className="container" style={{ minHeight: 559 }}>
        <div className="p-5 mb-4 bg-body-tertiary rounded-3">
          <div className="container-fluid py-4">
            <div>
              <marquee direction="left">
                <h1 className="display-5 fw-bold text-center title">
                  Welcome Admin
                </h1>
              </marquee>
              <p className="col-md-10 fs-5"></p>
            </div>
            <hr className="my-4" />
            <p>
              &#x2022;We're delighted to have you with us. <br />
              &#x2022;At E-Medicine, we strive to make managing your health
              simple, accessible, and personalized. <br />
              &#x2022;Here, you can easily track your orders, manage your cart,
              and explore a wide range of healthcare products tailored to your
              needs. <br />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminDashboard;
