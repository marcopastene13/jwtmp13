import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://supreme-space-happiness-x5pjvprpw9q7h66r6-3001.app.github.dev/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("access_token", data.access_token);
      setMsg("Login successful!");
      setEmail("");
      setPassword("");
     
      navigate("/private");
    } else {
      setMsg(data.msg || "Login failed");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h2>Iniciar Sesion</h2>
      {msg && <div className="alert alert-warning">{msg}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Usuario</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-success" type="submit">Iniciar Sesion</button>
      </form>
      <p className="mt-3">
        <Link to="/signup" className="text-primary">
          Haz click aquí para crear un usuario!
        </Link>
      </p>
    </div>
  );
}