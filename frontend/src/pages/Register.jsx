import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/");
    } catch (err) {
      console.log(err.response);
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
  <div className="container">
    <h2>Register</h2>

    <form onSubmit={handleRegister}>
      <label>Username</label>
      <input onChange={(e) => setUsername(e.target.value)} />

      <label>Email</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />

      <label>Password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />

      <button type="submit">Register</button>
    </form>

    <p>
      Already have an account? <Link to="/">Login</Link>
    </p>
  </div>
);
}

export default Register;