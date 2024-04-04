import { Link, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../helpers/auth";
import {getUserProfile,getClientProfileByUserId} from '../../services/auth_services';
import { useState } from "react";


import './order.css'


export const Order = () => {
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [email,setEmail] = useState('')
  const [address,setAdress] = useState('')
  const [phone,setPhone] = useState('')

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  getUserProfile().then((data) => {
    if (data) {
      console.log(data);
      setFirstName(data.first_name)
      setLastName(data.last_name)
      setEmail(data.email)
      getClientProfileByUserId(data.id).then((data)=>{
        console.log(data)
        setAdress(data.address);
        setPhone(data.phone);
      })
    }
  });
  

  return(
    <>
    
    <h2 className="datos_usuario">Datos del Usuario</h2>
    <form className="formu">
        Nombre : <input className="nombre" type="text" name="firstName" value={firstName}/>
        Apellidos: <input className="apellido" type="text" name="lastName" value={lastName}/>
        Email :<input className="email" type="text" name="email" value={email}/>
    </form>
    <h2 className="datos_cliente">Datos del Cliente</h2>
    <form className="formu2">
        Dirección : <input className="direccion" type="text" name="address" value={address}/>
        Telefono : <input className="telefono" type="text" name="phone" value={phone}/>
      
              <Link to="/Pedido" className="btn_confirmar_pedido">               
                    <button className="">Confirmar pedido</button>
              </Link>
                    
                 
    </form>
    
    </>
  )
};
