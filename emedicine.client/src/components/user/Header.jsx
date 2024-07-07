import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light navbar-light sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" style={{ marginLeft: 50 }} href="#">
            <img src="Images/1.png" alt="logo" className="img1" />
          </a>
          <div>
            <Link to={"/registration"} className="btn btn-outline-info mx-2">
              Register
            </Link>

            <Link to={"/"} className="btn btn-outline-primary" type="submit">
              Login
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
