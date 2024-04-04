import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'


export const Register = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e) => {
    setClient({
      ...client,
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
  <div className="contenedor_login">
    <div className="login-box">
  <div className="contenedor1">
    <img className="logo_deluxer" src= 'https://i.postimg.cc/4yPDpmkf/Deluxecomputer2.png' alt="" />
  </div>

  <form onSubmit={handleSubmit} className="login-form">
    <label htmlFor="username"></label>
    <input id="username" type="text" name="username" placeholder="  &#128100; │ USERNAME" onChange={handleInputChange} className="input" />

    <label htmlFor="password"></label>
    <input id="password" type="password" name="password" placeholder="  &#x1F512; │ PASSWORD" onChange={handleInputChange} className="input" />

    <input className="button submit-button" type="submit" value="LOGIN" />
    <a href="">PASSWORD │ REGISTER</a>
  </form>
</div>
</div>
  );
};
