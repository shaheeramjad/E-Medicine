import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
const Profile = () => {
  const [profile, setProfile] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("api/Users/profile", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      // console.log(data);
      if (response.ok) {
        setProfile(data);
      } else {
        console.log(data.message);
      }
    };
    // console.log(profile);
    fetchProfile();
  }, []);
  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setEmail(profile.email);
      setPassword(profile.password);
      Get(profile.id);
    }
  }, [profile]);

  async function Get(sno) {
    try {
      const res = await axios.get("/api/Users/ReadUser/" + sno);
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function Update() {
    try {
      await axios.patch("/api/Users/updateUser/" + profile.id, {
        id: profile.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      alert("User Updated Successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <Navbar />
      <div
        className="login-container mb-3 container d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: 551 }}
      >
        <h1 className="text-center fw-bold my-2 title" style={{ fontSize: 45 }}>
          Your Profile
        </h1>
        <form
          className="col-6"
          onSubmit={(event) => {
            event.preventDefault();
            Update();
          }}
        >
          <div className="form-group my-2">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              style={{ border: "solid gray", borderRadius: 10 }}
              id="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              style={{ border: "solid gray", borderRadius: 10 }}
              id="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              style={{ border: "solid gray", borderRadius: 10 }}
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              style={{ border: "solid gray", borderRadius: 10 }}
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Save
          </button>
        </form>
      </div>
    </>
  );
};
export default Profile;
