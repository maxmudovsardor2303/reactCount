import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const addUser = () => {
    if (name && dob && email) {
      const age = calculateAge(dob);
      const newUser = { name, dob, email, address, age };

      setUsers([...users, newUser]);
      clearForm();
      setError("");
    } else {
      setError("Akajon malumotlarni tuliq kirgizing");
    }
  };

  const clearForm = () => {
    setName("");
    setDob("");
    setEmail("");
    setAddress("");
  };

  const deleteUser = (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-8">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>T/R</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => deleteUser(index)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">Malumotlarni tuliq kiriting akajon</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-md-4">
          <div className="desc">
            <div className="desc-header">
              <h3 className="text-center">Add User</h3>
            </div>
            <div className="desc-body">
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="form-control my-2"
                  required
                />
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="DOB"
                  className="form-control my-2"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="form-control my-2"
                  required
                />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="form-control my-2"
                />
                {error && <div className="text-danger">{error}</div>}
              </form>
            </div>
            <div className="desc-footer">
              <button className="btn btn-primary" onClick={addUser}>
                Add User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
