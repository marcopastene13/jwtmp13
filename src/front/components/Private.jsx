import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Private() {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrivate = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setMsg("You must be logged in to view this page.");
        return;
      }

      const res = await fetch("https://supreme-space-happiness-x5pjvprpw9q7h66r6-3001.app.github.dev/api/private", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        setMsg(data.msg);
      } else {
        setMsg(data.msg || "Access denied");
      }
    };

    fetchPrivate();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <h2>Pagina Privada</h2>
      {msg && <div className="alert alert-info">{msg}</div>}
      {user && (
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.id}</p>
        </div>
      )}
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        LogOut
      </button>
    </div>
  );
}