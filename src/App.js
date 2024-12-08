import React, { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";

const App = () => {
  const [users, setUsers] = useState([]);

  // Fetch users 
  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Add user
  const addUser = (formData) => {
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newUser) => setUsers([...users, newUser]))
      .catch((error) => console.error("Error adding user:", error));
  };

  // Update user
  const updateUser = (updatedUserData) => {
    fetch(`http://localhost:3001/users/${updatedUserData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUserData),
    })
      .then(() => {
        setUsers(users.map((user) => (user.id === updatedUserData.id ? updatedUserData : user)));
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  // Delete user
  const deleteUser = (userId) => {
    fetch(`http://localhost:3001/users/${userId}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return <>
    <div className="container">
      <h1 className="my-4">User Management</h1>
      <UserForm addUser={addUser} />
      <UserTable users={users} updateUser={updateUser} deleteUser={deleteUser} />
    </div>
  </>
};

export default App;
