import axios from "axios";
import { useState, useEffect } from "react";

const AdminOrders = () => {
  const [order, setOrder] = useState([]);
  const [showOrder, setShowOrder] = useState(false);
  const [id, setId] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [medId, setMedId] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    (async () => await Get())();
  }, []);

  async function Get() {
    try {
      const res = await axios.get("/api/OrderItem/GetOrder");
      setOrder(res.data);
      console.log(res.data);
      setShowOrder(res.data.length > 0);
      // setShowCart(res.data.length > 0);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  }

  async function Edit(item) {
    setOrderId(item.orderId);
    setMedId(item.medicineId);
    setUserId(item.userId);
    setStatus(item.status);
    setTotalPrice(item.totalPrice);
    setUnitPrice(item.unitPrice);
    setDiscount(item.discount);
    setQuantity(item.quantity);
    setId(item.id);
  }

  async function Update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "/api/OrderItem/updateOrder/" + order.find((u) => u.id === id).id || id,
        {
          id: id,
          unitPrice: unitPrice,
          discount: discount,
          quantity: quantity,
          medicineId: medId,
          orderId: orderId,
          totalPrice: totalPrice,
          userId: userId,
          status: status,
        }
      );
      alert("Status Updated Successfully!");
      setOrderId("");
      setMedId("");
      setUserId("");
      setStatus("");
      setTotalPrice("");
      setUnitPrice("");
      setDiscount("");
      setQuantity("");
      setId("");
      Get();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <div className="container my-3" style={{ minHeight: 550 }}>
        <h1 className="text-center fw-bold my-3 title" style={{ fontSize: 45 }}>
          Order Management
        </h1>
        {showOrder ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Order-ID</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th scope="col">Status</th>
                <th scope="col">Edit Status</th>
              </tr>
            </thead>
            <tbody>
              {order?.map((item) => (
                <tr key={item.id}>
                  <td>{item.orderId}</td>
                  <td>{item.quantity}</td>
                  <td>{item.totalPrice}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      className="btn btn-info text-light"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        Edit(item);
                      }}
                    >
                      Edit Status
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
                  value={discount}
                  readOnly
                />
                <input
                  type="text"
                  hidden
                  className="form-control"
                  id="medPrice"
                  value={unitPrice}
                  readOnly
                />

                <div className="form-group my-2">
                  {/* <label htmlFor="quantity">Product Name</label> */}
                  <input
                    type="text"
                    hidden
                    className="form-control"
                    id="quantity"
                    value={totalPrice}
                  />
                </div>
                <div className="form-group my-2">
                  <select
                    class="form-select form-select-sm"
                    aria-label="Small select example"
                    id="status"
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={Update}
                className="btn btn-primary"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminOrders;
