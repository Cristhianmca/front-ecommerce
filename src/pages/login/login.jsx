import { useState } from "react";
import { postLoginService } from "../../services/auth_services";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"; // Importa tu archivo CSS para los estilos adicionales

export const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    postLoginService(credentials).then((data) => {
      if (!data) {
        alert("Usuario o contraseña incorrectos");
        return;
      }

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      navigate("/order");
    });
  };

  return (
    <div className="login-container_de_login">
      <div className="login-form-de-login">
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              name="username"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="boton_ingresar">Ingresar</button>
        </form>
        <Link to="/register" className="boton_nuevo_cliente">Nuevo Cliente</Link>
      </div>
    </div>
  );
};