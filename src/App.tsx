import React, { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  // ✅ GET USERS
  const getUsers = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };

  // ✅ ADD USER
  const addUser = async () => {
    <button onClick={addUser}>Add User</button>
  try {
    const response = await fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }), // name aur email state se aa rahe hain
    });

    if (response.ok) {
      setName(''); // Input box khali karne ke liye
      setEmail('');
      getUsers();  // <--- Ye sabse important hai, isse list turant update hogi
    }
  } catch (err) {
    console.error("Add error:", err);
  }
};

  // ✅ DELETE USER
  const deleteUser = async (id: number) => {
    try {
      await fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE",
      });

      getUsers();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // ✅ UPDATE USER
  const updateUser = async (id: number) => {
    const newName = prompt("Enter new name");
    const newEmail = prompt("Enter new email");

    if (!newName || !newEmail) return;

    try {
      await fetch(`http://127.0.0.1:8000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
        }),
      });

      getUsers();
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  // ✅ AUTO LOAD USERS
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>

      {/* FORM */}
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

      <hr />

      <h3>User List</h3>

      {users.length === 0 ? (
        <p>No users found 😢</p>
      ) : (
        <ul>
          {users.map((user: any) => (
            <li key={user.id}>
              {user.name} - {user.email}

              <button
                onClick={() => deleteUser(user.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete ❌
              </button>

              <button
                onClick={() => updateUser(user.id)}
                style={{ marginLeft: "5px" }}
              >
                Update ✏️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;