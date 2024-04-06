import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './catalogo.css'; // Importar el archivo CSS

function Catalogo() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('productos');
  const [categories, setCategorias] = useState([]);
  const [products, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [addedToCart, setAddedToCart] = useState({}); // Estado para los productos agregados al carrito

  useEffect(() => {
    obtenerCategorias();
    obtenerProductos();
    obtenerMarcas();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/categories');
      setCategorias(response.data);
      
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  const obtenerProductos = async (categoria = null, marca = null) => {
    let url = 'http://127.0.0.1:8000/api/products';
    if (categoria !== null) {
      url += `?category=${categoria.id}`;
    }
    if (marca !== null) {
      url += marca === null ? '' : (url.includes('?') ? '&' : '?') + `marca=${marca.id}`;
    }
    try {
      const response = await axios.get(url);
      setProductos([...response.data]); // Actualizar productos en el estado
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  const obtenerMarcas = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/marca');
      setMarcas(response.data);
    } catch (error) {
      console.error('Error al obtener las marcas:', error);
    }
  };

  const handleCategoriaSeleccionada = (categoria) => {
    obtenerProductos(categoria);
    setCategoriaSeleccionada(categoria);
  };

  const handleMarcaSeleccionada = (marca) => {
    obtenerProductos(null, marca);
    setCategoriaSeleccionada(marca);
  };

  const handleAddToCart = (product) => {
    const cart = localStorage.getItem("cart") || "[]";
    const cartParsed = JSON.parse(cart);
    const productInCart = cartParsed.find((item) => item.id === product.id);

    if (productInCart) {
      const newCart = cartParsed.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
            total: parseFloat(item.total) + parseFloat(item.price),
          };
        }

        return item;
      });

      localStorage.setItem("cart", JSON.stringify(newCart));
      setAddedToCart(prevState => ({ ...prevState, [product.id]: true })); // Actualizar el estado a true para el producto actual
      setTimeout(() => setAddedToCart(prevState => ({ ...prevState, [product.id]: false })), 2000); // Reiniciar el estado después de 2 segundos
      return;
    }

    const newProduct = {
      ...product,
      quantity: 1,
      total: parseFloat(product.price),
    };

    localStorage.setItem("cart", JSON.stringify([...cartParsed, newProduct]));
    setAddedToCart(prevState => ({ ...prevState, [product.id]: true })); // Actualizar el estado a true para el producto actual
    setTimeout(() => setAddedToCart(prevState => ({ ...prevState, [product.id]: false })), 2000); // Reiniciar el estado después de 2 segundos
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2>Categorias</h2>
        <ul>
          {categories.map((categoria) => (
            <li key={categoria.id}>
              <button onClick={() => handleCategoriaSeleccionada(categoria.id + categoria.name)}>{categoria.name}</button>
            </li>
          ))}
        </ul>
        <h2>Marcas</h2>
        <ul>
          {marcas.map((marca) => (
            <li key={marca.id}>
              <button onClick={() => handleMarcaSeleccionada(marca.name)}>{marca.name}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        <h2>{categoriaSeleccionada === 'productos' ? 'Productos' : categoriaSeleccionada}</h2>
        <div className="productos">
          {products.map((product) => (
            <div key={product.id} className="producto">
              <img src={product.image} alt={product.name} />
              <p className="nombre-producto">{product.name}</p>
              <p className="precio">S/. {product.price}</p>
              <button className="button-add-to-cart" onClick={() => handleAddToCart(product)}>
                {addedToCart[product.id] && <span>&#10003; Se agregó al carrito 😊</span>}
                {!addedToCart[product.id] && 'Agregar al carrito'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalogo;