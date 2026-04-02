import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  name: string;
  email: string;
}

// ✅ BASE URL only (users nahi likhna yaha)
const API_URL = "https://sapna-backend-api.onrender.com";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // ✅ GET USERS
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ ADD USER
  const addUser = async () => {
    try {
      await axios.post(`${API_URL}/users`, {
        name,
        email,
      });

      setName("");
      setEmail("");
      fetchUsers(); // refresh list
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <button onClick={addUser}>Add User</button>

      <h2>User List</h2>

      {users.length === 0 ? (
        <p>No users found 😢</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;