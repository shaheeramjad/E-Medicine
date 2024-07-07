import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
const Medicine = () => {
  const [id, setId] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expDate, setExpDate] = useState("");
  async function handleAdd(event) {
    event.preventDefault();

    try {
      if (name && manufacturer && expDate && quantity) {
        await axios.post("/api/Admin/medicine", {
          name: name,
          manufacturer: manufacturer,
          unitPrice: unitPrice,
          discount: discount,
          quantity: quantity,
          expDate: expDate,
        });
        alert("Item Added");
        setName("");
        setManufacturer("");
        setUnitPrice("");
        setDiscount("");
        setQuantity("");
        setExpDate("");
        Get();
      } else {
        alert("Please Enter Complete Details");
      }
    } catch (error) {
      alert(error);
    }
  }

  async function Get() {
    const res = await axios.get("/api/Admin");
    setMedicines(res.data);
    console.log(res.data);
  }
  useEffect(() => {
    (async () => await Get())();
  }, []);

  async function Edit(item) {
    setName(item.name);
    setManufacturer(item.manufacturer);
    setUnitPrice(item.unitPrice);
    setDiscount(item.discount);
    setQuantity(item.quantity);
    setExpDate(item.expDate);
    setId(item.id);
  }

  async function Update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "/api/Admin/updateMed/" + medicines.find((u) => u.id === id).id || id,
        {
          id: id,
          name: name,
          manufacturer: manufacturer,
          unitPrice: unitPrice,
          discount: discount,
          quantity: quantity,
          expDate: expDate,
        }
      );
      alert("Medicine Updated Successfully!");
      setId("");
      setName("");
      setManufacturer("");
      setUnitPrice("");
      setDiscount("");
      setQuantity("");
      setExpDate("");
      Get();
    } catch (error) {
      alert(error);
    }
  }

  async function Delete(id) {
    await axios.delete(`/api/Admin/deleteMed/${id}`);
    // alert("Student Deleted Successfully!");
    setId("");
    setName("");
    setManufacturer("");
    setUnitPrice("");
    setDiscount("");
    setQuantity("");
    setExpDate("");
    Get();
  }
  return (
    <>
      <div
        class="modal fade"
        id="editModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Medicine Management
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    hidden
                    className="form-control"
                    id="id"
                    value={id}
                    onChange={(event) => {
                      setId(event.target.value);
                    }}
                  />
                </div>
                <div className="row">
                  <div className="form-group my-2 col-6">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name "
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group my-2 col-6">
                    <label htmlFor="manufacturer">Manufacturer</label>
                    <input
                      type="text"
                      className="form-control"
                      id="manufacturer "
                      value={manufacturer}
                      onChange={(event) => {
                        setManufacturer(event.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group my-2 col-6">
                    <label htmlFor="unitPrice">Unit Price</label>
                    <input
                      type="text"
                      className="form-control"
                      id="unitPrice"
                      aria-describedby="unitPrice"
                      value={unitPrice}
                      onChange={(event) => {
                        setUnitPrice(event.target.value);
                      }}
                    />
                  </div>

                  <div className="form-group my-2 col-6">
                    <label htmlFor="discount">Discount</label>
                    <input
                      type="discount"
                      className="form-control"
                      id="discount"
                      value={discount}
                      onChange={(event) => {
                        setDiscount(event.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group my-2 col-6">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="quantity"
                      className="form-control"
                      id="quantity"
                      value={quantity}
                      onChange={(event) => {
                        setQuantity(event.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group my-2 col-6">
                    <label htmlFor="expDate">Expiry Date</label>
                    <input
                      type="expDate"
                      className="form-control"
                      id="expDate"
                      placeholder="dd/mm/yyyy"
                      value={expDate}
                      onChange={(event) => {
                        setExpDate(event.target.value);
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" onClick={Update}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-center fw-bold my-3 title" style={{ fontSize: 45 }}>
        Medicine Management
      </h1>
      <div
        className="login-container mb-3 container "
        style={{ minHeight: 551 }}
      >
        <form>
          <div className="form-group">
            <input
              type="text"
              hidden
              className="form-control"
              id="id"
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
          </div>
          <div className="row">
            <div className="form-group my-2 col-6">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                style={{ border: "solid gray", borderRadius: 10 }}
                id="name "
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div className="form-group my-2 col-6">
              <label htmlFor="manufacturer">Manufacturer</label>
              <input
                type="text"
                className="form-control"
                style={{ border: "solid gray", borderRadius: 10 }}
                id="manufacturer "
                value={manufacturer}
                onChange={(event) => {
                  setManufacturer(event.target.value);
                }}
              />
            </div>
            <div className="form-group my-2 col-6">
              <label htmlFor="unitPrice">Unit Price</label>
              <input
                type="text"
                className="form-control"
                style={{ border: "solid gray", borderRadius: 10 }}
                id="unitPrice"
                aria-describedby="unitPrice"
                value={unitPrice}
                onChange={(event) => {
                  setUnitPrice(event.target.value);
                }}
              />
            </div>

            <div className="form-group my-2 col-6">
              <label htmlFor="discount">Discount</label>
              <input
                type="discount"
                className="form-control"
                style={{ border: "solid gray", borderRadius: 10 }}
                id="discount"
                value={discount}
                onChange={(event) => {
                  setDiscount(event.target.value);
                }}
              />
            </div>
            <div className="form-group my-2 col-6">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="quantity"
                className="form-control"
                style={{ border: "solid gray", borderRadius: 10 }}
                id="quantity"
                value={quantity}
                onChange={(event) => {
                  setQuantity(event.target.value);
                }}
              />
            </div>
            <div className="form-group my-2 col-6">
              <label htmlFor="expDate">Expiry Date</label>
              <input
                type="expDate"
                className="form-control"
                style={{ border: "solid gray", borderRadius: 10 }}
                id="expDate"
                placeholder="mm/yyyy"
                value={expDate}
                onChange={(event) => {
                  setExpDate(event.target.value);
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-outline-success px-3 py-1 d-grid gap-2 mx-auto"
            onClick={handleAdd}
          >
            Add
          </button>
        </form>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Manufacturer</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Discount</th>
              <th scope="col">Quantity</th>
              <th scope="col">Exp Date</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {medicines?.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.manufacturer}</td>
                <td>{item.unitPrice}</td>
                <td>{item.discount}</td>
                <td>{item.quantity}</td>
                <td>{item.expDate}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onClick={() => {
                      Edit(item);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      if (confirm("Are you sure to Delete?")) {
                        Delete(item.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Medicine;
