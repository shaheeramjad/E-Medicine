import "./App.css";
import Login from "./components/Login";
import Header from "./components/user/Header";
import Registration from "./components/Registration";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from "./components/Footer";
import Dashboard from "./components/user/Dashboard";
import Logout from "./components/Logout";
import Profile from "./components/user/Profile";
import AdminHeader from "./components/admin/AdminHeader";
import Medicine from "./components/admin/Medicine";
import AdminDashboard from "./components/admin/AdminDashboard";
import CustomerList from "./components/admin/CustomerList";
import MedicineDisplay from "./components/user/MedicineDisplay";
import Cart from "./components/user/Cart";
import Order from "./components/user/Order";
import AdminOrders from "./components/admin/AdminOrders";
function App() {
  const router = new createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Login />
          <Footer />
        </>
      ),
    },
    {
      path: "/registration",
      element: (
        <>
          <Header />
          <Registration />
          <Footer />
        </>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <>
          <Dashboard />

          <Footer />
        </>
      ),
    },
    {
      path: "/logout",
      element: (
        <>
          <Logout />

          <Footer />
        </>
      ),
    },
    {
      path: "/profile",
      element: (
        <>
          <Profile />

          <Footer />
        </>
      ),
    },
    {
      path: "/admin_dashboard",
      element: (
        <>
          <AdminHeader />
          <AdminDashboard />
          <Footer />
        </>
      ),
    },
    {
      path: "/med_management",
      element: (
        <>
          <AdminHeader />
          <Medicine />
          <Footer />
        </>
      ),
    },
    {
      path: "/user_management",
      element: (
        <>
          <AdminHeader />
          <CustomerList />
          <Footer />
        </>
      ),
    },
    {
      path: "/products",
      element: (
        <>
          <MedicineDisplay />
          <Footer />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <Cart />
          <Footer />
        </>
      ),
    },
    {
      path: "/myOrder",
      element: (
        <>
          <Order />
          <Footer />
        </>
      ),
    },
    {
      path: "/order_management",
      element: (
        <>
          <AdminHeader />
          <AdminOrders />
          <Footer />
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
