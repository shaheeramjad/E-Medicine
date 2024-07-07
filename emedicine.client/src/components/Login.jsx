import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [users, setUsers] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  async function Login(e) {
    e.preventDefault();
    if (email != "") {
      const result = await axios.get(`/api/Users/ReadUser/email/${email}`);
      // console.log(result.data);
      if (result.data.length > 0) {
        let pass = result.data[0].password;
        let type = result.data[0].type;
        console.log(result.data[0].password);
        setUsers(result.data);

        try {
          if (password == pass) {
            const response = await fetch("api/Users/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({ firstName, lastName, email, password }),
            });
            const data = await response.json();
            console.log(data);
            setProfile(data);
            if (response.ok) {
              if (type == "Admin") {
                navigate("/admin_dashboard");
              } else {
                navigate("/dashboard");
              }
            } else {
              navigate("/");
            }
            alert("You have Logged In successfully!");
            setEmail("");
            setPassword("");
          } else {
            alert("Wrong Password");
          }
        } catch (error) {
          alert(error);
        }
      } else {
        alert("Email doesn't exists");
      }
    } else {
      alert("Please Enter Your Valid Credentials");
    }
  }

  return (
    <>
      <div
        className="container mb-3 d-flex flex-column justify-content-center align-items-center"
        style={{
          minHeight: 559,
          backgroundColor: "white",
          border: "solid black",
          borderRadius: 20,
        }}
      >
        {/* <h1 className="text-center fw-bold mb-4 title" style={{ fontSize: 45 }}>
          Login To E-Medicine
        </h1> */}
        <form className="col-6">
          <img src="Images/1.png" className="my-2" />
          <div className="mb-3">
            <label for="email">Email address</label>
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
          <div className="mb-3">
            <label for="password">Password</label>
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
          <button type="submit" className="btn btn-warning " onClick={Login}>
            Login
          </button>
          <div className="text-end" style={{ fontFamily: "sens-serif" }}>
            <p>
              Don't have an account?
              <Link to={"/registration"} className="text-danger">
                Register Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
