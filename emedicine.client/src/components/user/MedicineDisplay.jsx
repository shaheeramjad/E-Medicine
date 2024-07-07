import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MedicineDisplay = () => {
  const [userId, setUserId] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [profile, setProfile] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [medId, setMedId] = useState("");
  const [medDiscount, setMedDiscount] = useState("");
  const [medPrice, setMedPrice] = useState("");
  const [productName, setProductName] = useState("");

  async function Get() {
    try {
      const res = await axios.get("/api/Admin");
      setMedicines(res.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  }

  useEffect(() => {
    (async () => await Get())();
  }, []);

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
          setUserId(data.id); // Ensure userId is set when profile is fetched
        } else {
          console.error("Error fetching profile:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  async function handleAdd(event) {
    event.preventDefault();

    if (!quantity || !medId || !medPrice) {
      alert("Please Enter Complete Details");
      return;
    }

    try {
      console.log("Sending data:", {
        quantity,
        userId: profile.id,
        medId,
        discount: medDiscount,
        price: medPrice,
        productName: productName,
      });
      console.log(
        await axios.post("api/Cart/Add", {
          quantity,
          userId: profile.id,
          medicineId: medId,
          productName: productName,
          discount: medDiscount,
          unitPrice: medPrice,
          totalPrice: medPrice * quantity - medDiscount * quantity,
        })
      );

      alert("Item Added to Cart");
      setQuantity("");
      // Get();
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Error adding item to cart");
    }
  }

  const handleSetMedDetails = (id, discount, unitPrice, productName) => {
    setMedId(id);
    setMedDiscount(discount);
    setMedPrice(unitPrice);
    setProductName(productName);
    console.log("Medicine details set:", {
      medId,
      medDiscount,
      medPrice,
      productName,
    });
  };

  return (
    <>
      <Navbar />

      <div
        className="login-container mb-3 container"
        style={{ minHeight: 551 }}
      >
        <h1 className="text-center fw-bold my-3 title" style={{ fontSize: 45 }}>
          All Products
        </h1>
        <div className="row my-4">
          {medicines?.map((item) => (
            <div className="col-md-4 my-2" key={item.id}>
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  {/* <p className="card-text"> */}
                  <ul>
                    <li>Pack Quantity: {item.quantity}</li>
                    <li>Price per pack: Rs.{item.unitPrice}</li>
                    <li>Discount per pack: Rs.{item.discount}</li>
                    <li>Expiry Date: {item.expDate}</li>
                    <li>Manufacturer: {item.manufacturer}</li>
                  </ul>
                  {/* </p> */}
                  <Link
                    className="btn btn-outline-success"
                    style={{ color: "#76bc21" }}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() =>
                      handleSetMedDetails(
                        item.id,
                        item.discount,
                        item.unitPrice,
                        item.name
                      )
                    }
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Order Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <input
                  type="text"
                  hidden
                  className="form-control"
                  id="userId"
                  value={userId}
                  readOnly
                />
                <input
                  type="text"
                  hidden
                  className="form-control"
                  id="medId"
                  value={medId}
                  readOnly
                />

                <input
                  type="text"
                  hidden
                  className="form-control"
                  id="medDiscount"
                  value={medDiscount}
                  readOnly
                />
                <input
                  type="text"
                  hidden
                  className="form-control"
                  id="medPrice"
                  value={medPrice}
                  readOnly
                />

                <div className="form-group my-2">
                  {/* <label htmlFor="quantity">Product Name</label> */}
                  <input
                    type="text"
                    hidden
                    className="form-control"
                    id="quantity"
                    value={productName}
                    onChange={(event) => setProductName(event.target.value)}
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="text"
                    className="form-control"
                    id="quantity"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={handleAdd}
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicineDisplay;
