import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './informacion.css'; // Importar los estilos CSS
import HeaderComputo from '../header/header';

function Informacion() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/product/${id}`);
        setProducto(response.data);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    obtenerProducto();
  }, [id]);

  const handleAddToCart = (producto) => {
    const cart = localStorage.getItem("cart") || "[]";
    const cartParsed = JSON.parse(cart);
    const productInCart = cartParsed.find((item) => item.id === producto.id); // Buscar si 

    if (productInCart) {
      const newCart = cartParsed.map((item) => {
        if (item.id === producto.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
            total: parseFloat(item.total) + parseFloat(item.price),
          };
        }

        return item;
      });

      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const newProduct = {
        ...producto,
        quantity: 1,
        total: parseFloat(producto.price),
      };

      localStorage.setItem("cart", JSON.stringify([...cartParsed, newProduct]));
    }


    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      setRedirecting(true);
      setTimeout(() => {
        window.location.href = '/cart';
      }, 2000);
    }, 2000);

    setRedirecting(true);
setShowModal(true);
setTimeout(() => {
  window.location.href = '/cart';
}, 2000);


  };

  if (!producto) {
    return <div>Cargando...</div>;
  }


  return (
    <div className="container_info">
      <HeaderComputo/>
      <div className="infoContainer_info">
        <div className="titlePriceContainer_info">
          <div className="imageContainer_info">
            <img src={producto.image} alt={producto.name} className="image_info" />
          </div>
          <div className="titlePrice_info">
            <h2 className="title_info">{producto.name}</h2>
            <p className="price_info">Precio: ${producto.price}</p>
          </div>
        </div>
        <p className="description_info">Descripción: {producto.description}</p>
        <button className="button-add-to-cart" onClick={() => handleAddToCart(producto)}>
          {addedToCart ? <span role="img" aria-label="check">✅ Producto Agregado 😊</span> : 'Añadir al carrito'}
        </button>
        {redirecting && <div className="redirect-message">Redirigiendo a la página de carrito...</div>}
        {showModal && (
  <div className="modal">
    <div className="modal-content">
      <p>Redirigiendo a la página de carrito...</p>
    </div>
  </div>
)}
      </div>
    </div>
  );
}

export default Informacion;