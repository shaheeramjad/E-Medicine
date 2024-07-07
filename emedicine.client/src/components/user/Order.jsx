import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const Order = () => {
  const [profile, setProfile] = useState();
  const [order, setOrder] = useState([]);
  const [showOrder, setShowOrder] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("api/Users/profile", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setProfile(data);
          // setUsersId(data.id); // Ensure userId is set when profile is fetched
        } else {
          console.error("Error fetching profile:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      Get(profile.id);
    }
  }, [profile]);

  async function Get(sno) {
    try {
      const res = await axios.get("/api/OrderItem/GetOrder/" + sno);
      setOrder(res.data);
      console.log(res.data);
      setShowOrder(res.data.length > 0);
      // setShowCart(res.data.length > 0);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  }

  async function Delete(id) {
    await axios.delete(`/api/OrderItem/deleteOrder/${id}`);
    Get(profile.id);
  }
  return (
    <>
      <Navbar />
      <div className="container my-3" style={{ minHeight: 550 }}>
        <h1 className="text-center fw-bold my-3 title" style={{ fontSize: 45 }}>
          My Orders
        </h1>
        {showOrder ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Order-ID</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Discount</th>
                <th scope="col">Total Price</th>
                <th scope="col">Status</th>
                <th scope="col">Cancel Order</th>
              </tr>
            </thead>
            <tbody>
              {order?.map((item) => (
                <tr key={item.id}>
                  <td>{item.orderId}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.discount}</td>
                  <td>{item.totalPrice}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        if (item.status != "Delivered") {
                          if (confirm("Are you sure to delete order?")) {
                            Delete(item.id);
                          }
                        }
                      }}
                    >
                      Cancel Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-5 mb-4 bg-body-tertiary rounded-3">
            <div className="container-fluid py-4">
              <div>
                <h1 className="display-5 fw-bold text-center">
                  No Order Placed
                </h1>
                <p className="mt-3 fs-5 text-center">Please place an order</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Order;
