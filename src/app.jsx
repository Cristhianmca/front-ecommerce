import { useEffect, useState } from "react";
import { getProductsService } from "./services/products_services";
import { Link } from "react-router-dom";
import HeaderComputo from "./pages/header/header"
import Carru from "./pages/carrucel/carrucel";
import Slider from "./pages/carrucel/slider";
import './index.css'

import Catalogo from "./pages/catalogo/catalogo";


export const App = () => {



  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsService().then((data) => {
      if (data) {
        setProducts(data);
      }
    });
  }, []);

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
      return;
    }

    const newProduct = {
      ...product,
      quantity: 1,
      total: parseFloat(product.price),
    };

    localStorage.setItem("cart", JSON.stringify([...cartParsed, newProduct]));
  };

  return (
    <div>
      <HeaderComputo/>
      <Carru/>
      <Catalogo />
      <Slider/>
      
    </div>
    
  );
};



{/* <div className="flex justify-between">
<h1>Productos</h1>

</div>
<div className="card_contenedor">
{products.length > 0 ? (
  products.map((product) => (
    <div key={product.id} className=" bg-white border-2 rounded-md ">
      <picture className="overlay hover:translate-y-2.5 hover:transition-all hover:rounded-md text-center">
      <img className="card_img" src={product.image} alt="" />

    <h2 className="card_name">{product.name} </h2>
      </picture>
      <div className="pt-5">
        
        <p>{}</p>
        <div className="contenedor_precio_logo  ">
            <img
              className="card_logo_bbva"
              src="https://i.postimg.cc/1tzLVnM4/Post-de-instagram-de-venta-de-tecnolog-a-morado-con-azul-11.png"
              alt=""
            />
            <p className="card_info text-[#0039a6] font-bold ">
              {product.price}
            </p>
          </div>
          <div className="contenedor_precio_logo ">
            <del className=" text-slate-400 font-bold">
              {" "}
              {product.price}{" "}
            </del>
            <p className="card_info font-bold ">{product.price*1.2}</p>
          </div>
          <div className="contenedor_precio_logo ">
            <img
              className="card_logo_bbva"
              src="https://i.postimg.cc/Y9y6DD9b/11.png"
              alt=""
            />

            <p className="card_info text-[#3bc667] font-bold ">
              {product.price}
            </p>
          </div>
        <button
          type="button"
          onClick={() => handleAddToCart(product)}
          className="boton_compra flex items-center"
        >
         <p className="text-white font-bold" target="_blank" href="">
              Agregar
              <i class="bi bi-cart4"></i>
            </p>
        </button>
      </div>
    </div>
  ))
) : (
  <p>No hay productos</p>
)}
</div> */}