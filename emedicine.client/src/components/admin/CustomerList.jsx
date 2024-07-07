import { useState, useEffect } from "react";
import axios from "axios";
const CustomerList = () => {
  const [id, setId] = useState("");
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [fund, setFund] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");

  async function Get() {
    const res = await axios.get("api/Users/ReadUser");
    setUsers(res.data);
    console.log(res.data);
  }
  useEffect(() => {
    (async () => await Get())();
  }, []);

  async function Edit(item) {
    setFirstName(item.firstName);
    setLastName(item.lastName);
    setEmail(item.email);
    setFund(item.fund);
    setId(item.id);
    setPassword(item.password);
    setDate(item.createdOn);
  }
  console.log(date);
  async function Update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "/api/Users/updateUser/" + users.find((u) => u.id === id).id || id,
        {
          id: id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          fund: fund,
          password: password,
          date: date,
        }
      );
      setFirstName("");
      setLastName("");
      setEmail("");
      setFund("");

      Get();
    } catch (error) {
      alert(error);
    }
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
                User Management
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
                    <label htmlFor="name">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name "
                      value={firstName}
                      onChange={(event) => {
                        setFirstName(event.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group my-2 col-6">
                    <label htmlFor="manufacturer">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="manufacturer "
                      value={lastName}
                      onChange={(event) => {
                        setLastName(event.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group my-2 col-6">
                    <label htmlFor="unitPrice">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="unitPrice"
                      aria-describedby="unitPrice"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                  </div>
                  {/* <label htmlFor="unitPrice">Password</label> */}
                  <input
                    type="password"
                    hidden
                    className="form-control"
                    id="unitPrice"
                    aria-describedby="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                  <input
                    type="text"
                    hidden
                    className="form-control"
                    id="unitPrice"
                    aria-describedby="unitPrice"
                    value={date}
                    onChange={(event) => {
                      setDate(event.target.value);
                    }}
                  />

                  <div className="form-group my-2 col-6">
                    <label htmlFor="discount">Fund</label>
                    <input
                      type="discount"
                      className="form-control"
                      id="discount"
                      value={fund}
                      onChange={(event) => {
                        setFund(event.target.value);
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
      <div className="container my-3" style={{ minHeight: 600 }}>
        <h1 className="text-center fw-bold my-3 title" style={{ fontSize: 45 }}>
          User Management
        </h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Fund</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((item) => (
              <tr key={item.id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.fund}</td>
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
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default CustomerList;
