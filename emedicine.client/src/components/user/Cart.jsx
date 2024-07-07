import Navbar from "./Navbar";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [usersId, setUsersId] = useState("");
  const [profile, setProfile] = useState();
  const [showCart, setShowCart] = useState(false);
  const [medId, setMedId] = useState("");
  const [medDiscount, setMedDiscount] = useState("");
  const [medPrice, setMedPrice] = useState("");
  const [medTotalPrice, setMedTotalPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [userId, setUserId] = useState("");

  const orderDetailsRef = useRef(null);

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
          setUsersId(data.id); // Ensure userId is set when profile is fetched
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
      const res = await axios.get("/api/Cart/CartItems/" + sno);
      setCart(res.data);
      setShowCart(res.data.length > 0);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  }

  async function Delete(id) {
    await axios.delete(`/api/Cart/deleteItem/${id}`);
    Get(profile.id);
  }

  async function handleAdd() {
    if (!orderDetailsRef.current) return;

    try {
      const { medicineId, unitPrice, discount, quantity, totalPrice, userId } =
        orderDetailsRef.current;

      await axios.post("api/OrderItem/AddOrder", {
        orderId: `EM-${profile.id}-${medicineId}`,
        medicineId: medicineId,
        unitPrice: unitPrice,
        discount: discount,
        quantity: quantity,
        totalPrice: totalPrice,
        userId: profile.id,
        status: "Pending",
      });

      alert("Order Placed Successfully!");

      Get(profile.id); // Ensure the cart is refreshed after placing the order
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Error adding item to cart");
    }
  }

  const handleOrderNow = (item) => {
    setMedId(item.medicineId);
    setMedDiscount(item.discount);
    setMedPrice(item.unitPrice);
    setMedTotalPrice(item.totalPrice);
    setQuantity(item.quantity);

    orderDetailsRef.current = {
      medicineId: item.medicineId,
      unitPrice: item.unitPrice,
      discount: item.discount,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
    };

    if (window.confirm("Are you sure to place Order")) {
      handleAdd();
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="login-container mb-3 container"
        style={{ minHeight: 551 }}
      >
        <h1 className="text-center fw-bold my-3 title" style={{ fontSize: 45 }}>
          My Cart
        </h1>
        <div className="row my-4">
          {showCart ? (
            cart?.map((item) => (
              <div className="col-md-4 my-2" key={item.id}>
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{item.productName}</h5>
                    Quantity: {item.quantity} <br />
                    Price per pack: Rs.{item.unitPrice} <br />
                    Discount per pack: Rs.{item.discount} <br />
                    Total Price: Rs.{item.totalPrice} <br />
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => {
                        handleOrderNow(item), Delete(item.id);
                      }}
                    >
                      Order Now
                    </button>
                    <button
                      className="btn btn-danger mt-2 ms-2"
                      onClick={() => {
                        if (window.confirm("Are you sure to Delete?")) {
                          Delete(item.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-5 mb-4 bg-body-tertiary rounded-3">
              <div className="container-fluid py-4">
                <div>
                  <h1 className="display-5 fw-bold text-center">
                    Nothing in Cart
                  </h1>
                  <p className="mt-3 fs-5 text-center">
                    Please Enter something to Cart
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
