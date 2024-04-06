import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postClientFullService } from "../../services/auth_services";
import "./register.css";

export const Register = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleInputChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.currentTarget.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    postClientFullService(client).then((data) => {
      if (!data) {
        alert("Hubo un error");
        return;
      }
      setRegistrationStatus("success");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirige después de 2 segundos
    });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Registrar Nuevo Cliente</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="username">Usuario</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={client.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={client.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="first_name">Nombre</label>
                <input
                  id="first_name"
                  type="text"
                  name="first_name"
                  value={client.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="last_name">Apellidos</label>
                <input
                  id="last_name"
                  type="text"
                  name="last_name"
                  value={client.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={client.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={client.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Dirección</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={client.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <button type="submit" className={`boton_registrado_exitoso ${registrationStatus === "success" ? "button-success" : ""}`}>
            {registrationStatus === "success" ? (
              <span className="animate-pulse">Registrado con éxito</span>
            ) : (
              "Registrar Nuevo Cliente"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};