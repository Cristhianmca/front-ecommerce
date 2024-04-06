import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './catalogo.css';
import { Link } from 'react-router-dom';

function Catalogo() {
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    obtenerCategorias();
    obtenerMarcas();
    obtenerProductos();
  }, []);

  useEffect(() => {
    filtrarProductos();
  }, [categoriaSeleccionada, marcaSeleccionada, productos]);

  const obtenerCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  const obtenerMarcas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/marca');
      setMarcas(response.data);
    } catch (error) {
      console.error('Error al obtener las marcas:', error);
    }
  };

  const obtenerProductos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  const handleCategoriaSeleccionada = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setMarcaSeleccionada(null);
  };

  const handleMarcaSeleccionada = (marca) => {
    setMarcaSeleccionada(marca);
    setCategoriaSeleccionada(null);
  };

  const filtrarProductos = () => {
    if (categoriaSeleccionada && marcaSeleccionada) {
      setProductosFiltrados(productos.filter(producto => producto.category === categoriaSeleccionada.id && producto.marca === marcaSeleccionada.id));
    } else if (categoriaSeleccionada) {
      setProductosFiltrados(productos.filter(producto => producto.category === categoriaSeleccionada.id));
    } else if (marcaSeleccionada) {
      setProductosFiltrados(productos.filter(producto => producto.marca === marcaSeleccionada.id));
    } else {
      setProductosFiltrados(productos);
    }
  };

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
    <div className="container_catalogo">
      <div className="sidebar">
        <h2>Categorías</h2>
        <ul>
          {categorias.map((categoria) => (
            <li key={categoria.id}>
              <button onClick={() => handleCategoriaSeleccionada(categoria)}>{categoria.name}</button>
            </li>
          ))}
        </ul>
        <h2>Marcas</h2>
        <ul>
          {marcas.map((marca) => (
            <li key={marca.id}>
              <button  onClick={() => { handleMarcaSeleccionada(marca); }}>{marca.name}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        <h2 className='m-auto'>Productos</h2>
        <div className="productos">
          {productosFiltrados.map((producto) => (
            
              <div key={producto.id} className="producto">
                <img src={producto.image} alt={producto.name} />
                <Link to={`/informacion/${producto.id}`}>{producto.name}</Link>
                <p className="precio">S/. {producto.price}</p>
                <button className="button-add-to-cart" onClick={() => handleAddToCart(producto)}>
                  {addedToCart[producto.id] ? <span role="img" aria-label="check">✅ Producto Agregado</span> : 'Añadir al carrito'}
                </button>
              </div>
           
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalogo;