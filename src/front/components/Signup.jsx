import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://supreme-space-happiness-x5pjvprpw9q7h66r6-3001.app.github.dev/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMsg("Usuario creado, Inica Sesion!");
      setEmail("");
      setPassword("");
    } else {
      setMsg(data.msg || "Error al crear usuario");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h2>Crea Tu Usuario</h2>
      {msg && <div className="alert alert-warning">{msg}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
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
        <button className="btn btn-success" type="submit">Crear usuario</button>
      </form>
      <p className="mt-3">
        <Link to="/login" className="text-primary">
            Click aquí para iniciar sesión!
        </Link>
      </p>
    </div>
  );
}