import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './informacion.css'; // Importar los estilos CSS
import HeaderComputo from '../header/header';

function Informacion() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});

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

  if (!producto) {
    return <div>Cargando...</div>;
  }

  const handleAddToCart = (producto) => {
    const cart = localStorage.getItem("cart") || "[]";
    const cartParsed = JSON.parse(cart);
    const productInCart = cartParsed.find((item) => item.id === producto.id);

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

    setAddedToCart(prevState => ({ ...prevState, [producto.id]: true }));
    setTimeout(() => {
      setAddedToCart(prevState => ({ ...prevState, [producto.id]: false }));
    }, 2000);
  };

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
        <Link to="/pedido" className="button-add-to-cart" onClick={() => handleAddToCart(producto)}>
          {addedToCart[producto.id] ? <span role="img" aria-label="check">✅ Producto Agregado</span> : 'Añadir al carrito'}
        </Link>
      </div>
    </div>
  );
}

export default Informacion;