import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Registration = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [users, setUsers] = useState();

  async function handleSave(event) {
    event.preventDefault();
    if (email != "" && /\S+@\S+\.\S+/.test(email)) {
      const result = await axios.get(`/api/Users/ReadUser/email/${email}`);
      setUsers(result.data);

      console.log(result.data.length);
      if (result.data.length == 0) {
        try {
          if (!firstName && !lastName) {
            alert("Please Enter Name");
          } else if (password.length < 6) {
            alert("Password Must be 6 Characters.");
          } else {
            await axios.post("/api/Users/registration", {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
              type: type,
            });
            alert("Data Inserted");
            navigate("/");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setType("");
          }
        } catch (error) {
          alert(error);
        }
      } else {
        alert("Email Already Exist");
      }
    } else {
      alert("Please Enter Valid Name or Email.");
    }
  }

  return (
    <>
      <div
        className="login-container mb-3 container d-flex flex-column justify-content-center align-items-center"
        style={{
          minHeight: 551,
          backgroundColor: "white",
          border: "solid black",
          borderRadius: 20,
        }}
      >
        {/* <h1 className="text-center fw-bold my-2 title" style={{ fontSize: 45 }}>
          {" "}
          Register To E-Medicine
        </h1> */}
        <form className="col-6">
          <img src="Images/1.png" className="my-2" />
          <div className="form-group my-2 ">
            <label htmlFor="username">First Name</label>
            <input
              type="text"
              className="form-control"
              style={{ border: "solid gray", borderRadius: 50 }}
              id="firstName "
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </div>
          <div className="form-group my-2 ">
            <label htmlFor="username">Second Name</label>
            <input
              type="text"
              className="form-control"
              style={{ border: "solid gray", borderRadius: 50 }}
              id="lastName "
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              style={{ border: "solid gray", borderRadius: 50 }}
              id="email"
              aria-describedby="emailHelp"
              placeholder="e.g: st@email.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div className="form-group my-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              style={{ border: "solid gray", borderRadius: 50 }}
              id="password"
              placeholder="At least six characters"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-warning"
            onClick={handleSave}
          >
            Register
          </button>
          <div className="text-end" style={{ fontFamily: "sens-serif" }}>
            <p>
              Already have an account?
              <Link to={"/"} className="text-danger">
                Login Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
