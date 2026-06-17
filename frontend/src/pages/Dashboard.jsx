import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/auth/get-me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        alert("Unauthorized");
      });
  }, []);

  return (
  <div className="container">
    <Navbar />
    <h2>Dashboard</h2>

    {user ? (
      <>
        <p><b>Username:</b> {user.username}</p>
        <p><b>Email:</b> {user.email}</p>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </div>
);
}

export default Dashboard;