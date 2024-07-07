import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Slider from "./Slider";
import Top from "./Top";
import Logo from "./Logo";
const Dashboard = () => {
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
      <Navbar />

      <div
        className="container"
        style={{
          minHeight: 559,
        }}
      >
        <div
          id="carouselExampleAutoplay"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner mt-2 rounded-5">
            <div className="carousel-item active">
              <img src="Images/b1.webp" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="Images/b2.webp" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="Images/b3.webp" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="Images/b4.webp" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="Images/b5.webp" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="Images/b6.webp" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="Images/b7.webp" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="Images/b8.webp" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="Images/b9.webp" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplay"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplay"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <h2 className="my-5" style={{ color: "#76bc21" }}>
          Catagories
        </h2>
        <Slider />
        <h2 className="my-5" style={{ color: "#76bc21" }}>
          Top Selling Items
        </h2>
        <Top />
        <h2 className="my-5" style={{ color: "#76bc21" }}>
          Deals
        </h2>
        <Top />
        <h2 className="my-5" style={{ color: "#76bc21" }}>
          Featured Products
        </h2>
        <Top />
        <h2 className="my-5" style={{ color: "#76bc21" }}>
          Brands
        </h2>
        <div className="m-5">
          <Logo />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
