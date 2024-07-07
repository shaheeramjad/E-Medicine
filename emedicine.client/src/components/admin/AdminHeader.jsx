import { Link } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
const AdminHeader = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light navbar-light sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="Images/2.png" alt="logo" className="img2" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link
                  className="nav-link nav"
                  aria-current="page"
                  to={"/admin_dashboard"}
                >
                  Admin Dashboard
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link to={"/med_management"} className="nav-link nav">
                  Medicine Management
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link nav" to={"/user_management"}>
                  User Management
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link nav" to={"/order_management"}>
                  Order Management
                </Link>
              </li>
            </ul>
            <Link to={"/logout"} className="btn btn-outline-danger mx-2">
              LogOut
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
export default AdminHeader;
