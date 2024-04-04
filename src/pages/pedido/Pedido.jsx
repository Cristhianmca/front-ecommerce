import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Wallet } from "@mercadopago/sdk-react";
import HeaderComputo from "../header/header";
import './pedido.css'

const Pedido = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      // Cargar el carrito desde el almacenamiento local
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(savedCart);

      // Calcular el total del carrito
      const total = savedCart.reduce((acc, item) => acc + item.total, 0);
      setCartTotal(total);

      // Crear la preferencia de pago al cargar la página
      await createPreference();
    };

    loadCart();
  }, []);

  const handleDeleteProduct = (id) => {
    // Eliminar un producto del carrito
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const createPreference = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create-payment/"
      );
      setPreferenceId(response.data.preference_id);
    } catch (error) {
      console.error("Error al crear la preferencia de pago:", error);
    }
  };

  const handlePayment = () => {
    if (!preferenceId) {
      console.error("No hay una preferencia de pago válida.");
      return;
    }

    // Aquí necesitas pasar tu PUBLIC_KEY de Mercado Pago
    const publicKey = "TEST-105fc60a-e841-4f13-af4f-358e84cafdab";
    const script = document.createElement("script");
    script.src = "https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js";
    script.setAttribute("data-preference-id", preferenceId);
    script.setAttribute("data-public-key", publicKey); // Aquí se añade la PUBLIC_KEY
    script.async = true; // Cargar el script de manera asincrónica
    script.onload = handleMercadoPagoLoaded; // Función a ejecutar cuando el script se carga
    document.body.appendChild(script);
  };

  const handleMercadoPagoLoaded = () => {
    // Lógica a realizar una vez que se carga el script de Mercado Pago
    console.log("Script de Mercado Pago cargado correctamente");
  };

  return (
    <div>
      <HeaderComputo />
      <div className="cont maincont">
        <h1 className="maincont-ttl">Cart</h1>
        <ul className="b-crumbs">
          <li>
            <a href="index.html">Home</a>
          </li>
          <li>Cart</li>
        </ul>
        <div className="page-styling">
          <div className="woocommerce prod-litems section-list">
            {cart.length > 0 ? (
              cart.map((product) => (
                <article className="prod-li sectls" key={product.id}>
                  <div className="prod-li-inner">
                    <a href="product.html" className="prod-li-img">
                      <img src={product.image} alt="" />
                    </a>
                    <div className="prod-li-cont">
                      <div className="prod-li-ttl-wrap">
                        <p>
                          <a href="#">{product.category}</a>
                        </p>
                        <h3>
                          <a href={`/producto/${product.id}`}>{product.name}</a>
                        </h3>
                      </div>
                      <div className="prod-li-prices">
                        <div className="prod-li-price-wrap">
                          <p>Precio</p>
                          <p className="prod-li-price">S/.{product.price}</p>
                        </div>
                        <div className="prod-li-qnt-wrap">
                          <p className="qnt-wrap prod-li-qnt">
                            <a href="#" className="qnt-plus prod-li-plus">
                              <i className="icon ion-arrow-up-b"></i>
                            </a>
                            <input
                              type="text"
                              name="cantidad"
                              value={product.quantity}
                              readOnly
                            />
                            <a href="#" className="qnt-minus prod-li-minus">
                              <i className="icon ion-arrow-down-b"></i>
                            </a>
                          </p>
                        </div>
                        <div className="prod-li-total-wrap">
                          <p>Total</p>
                          <p className="prod-li-total">S/.{product.total}</p>
                        </div>
                      </div>
                    </div>
                    <div className="prod-li-info">
                      <p className="prod-li-add">
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="boton_eliminar"
                        >
                          <i className="boton_eliminar"></i>
                          <span>Eliminar</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p>Carrito sin productos</p>
            )}
          </div>

          <div className="cart-actions">
            <div className="coupon">
              <button
                onClick={handleDeleteProduct}
                className="checkout-button button"
              >
                Eliminar Carrito
              </button>
            </div>
            <div className="cart-collaterals">
              <Link to="/order" className="checkout-button button">
                Registrar Pedido
              </Link>
              <div className="order-total">
                <p className="cart-totals-ttl">Total</p>
                <p className="cart-totals-val">S/.{cartTotal}</p>
              </div>
              <button className="mercadopago-button" onClick={handlePayment}>Confirmar Pedido</button>
              {preferenceId && <Wallet initialization={{ preferenceId }} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pedido;

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import '../cart/cart.css'
// import HeaderComputo from "../header/header";
// import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
// import axios from "axios";

// export const Pedido = () => {
//       const [preferenceId, setPreferenceId] = useState(null);

//   const createPreference = async () => {
//       try {
//           const response = await axios.post('http://127.0.0.1:8000/api/create-payment/');
//           setPreferenceId(response.data.preference_id);
//       } catch (error) {
//           console.error('Error creating preference:', error);
//       }
//   };

//   const handlePayment = () => {
//     // Lógica para abrir el formulario de pago de Mercado Pago con el preferenceId obtenido
//     if (preferenceId) {
//         const script = document.createElement('script');
//         script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
//         script.setAttribute('data-preference-id', preferenceId);
//         document.getElementById('payment-form').appendChild(script);
//     }
// };

//     initMercadoPago('TEST-6e8e780b-a354-441d-83f1-76519e828ea5', {locale: 'es-PE'
// });
//   const [cart, setCart] = useState(
//     JSON.parse(localStorage.getItem("cart")) || []
//   );

//   const handleDeleteProduct = (id) => {
//     const newCart = cart.filter((product) => product.id !== id);
//     setCart(newCart);

//     localStorage.setItem("cart", JSON.stringify(newCart));
//   };

//   const cartTotal = cart.reduce((total, product) => total + product.total, 0);

//   const handleBuy = () => {
//     const products = cart.map((product) => ({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity: product.quantity
//     }));

//     fetch('http://127.0.0.1:8000/api/create-payment/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         products,
//       }),
//     })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Error en la solicitud al servidor');
//       }
//       return response.json();
//     })
//     .then((data) => {
//       if (data.payment_url) {
//         window.location.href = data.payment_url;
//       } else {
//         throw new Error('URL de pago no recibida correctamente');
//       }
//     })
//     .catch((error) => {
//       console.error('Error al realizar la compra:', error);
//     });
//   };

//   // const handleBuy = () => {
//   //   const products = cart.map((product) => ({
//   //     id: product.id,
//   //     name: product.name,
//   //     price: product.price, // Asegúrate de incluir el precio del producto
//   //     quantity: product.quantity // Y la cantidad
//   //   }));

//   //   fetch('http://127.0.0.1:8000/api/create-payment/', {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({
//   //       products,
//   //     }),
//   //   })
//   //   .then((data) => {
//   //     if (data.payment_url) {
//   //       window.location.href = data.payment_url;
//   //     } else {
//   //       console.error('Error: URL de pago no recibida correctamente');
//   //     }
//   //   })
//   //   .catch((error) => {
//   //     console.error('Error al obtener la URL de pago:', error);
//   //   });
//   // };

//   // const handleBuy = () => {
//   //   const products = cart.map((product) => ({
//   //     id: product.id,
//   //       name: product.name,

//   //   }));

//   //   fetch('http://127.0.0.1:8000/api/create-payment/', {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({
//   //       products,
//   //     }),
//   //   })
//   //     .then((response) => response.json())
//   //     .then((data) => {
//   //       setPreferenceId(data.id);
//   //     });
//   // }
//   return (
//     <div>
//       <HeaderComputo/>
//     <div className="cont maincont">
//   <h1 className="maincont-ttl">Cart</h1>
//   <ul className="b-crumbs">
//     <li><a href="index.html">Home</a></li>
//     <li>Cart</li>
//   </ul>
//   <div className="page-styling">
//     <div className="woocommerce prod-litems section-list">
//       {cart.length > 0 ? (
//         cart.map((product) => (
//           <article className="prod-li sectls" key={product.id}>
//             <div className="prod-li-inner">
//               <a href="product.html" className="prod-li-img">
//                 <img src={product.image} alt="" />
//               </a>
//               <div className="prod-li-cont">
//                 <div className="prod-li-ttl-wrap">
//                   <p>
//                     <a href="#">{product.category}</a>
//                   </p>
//                   <h3><a href={`/producto/${product.id}`}>{product.name}</a></h3>
//                 </div>
//                 <div className="prod-li-prices">
//                   <div className="prod-li-price-wrap">
//                     <p>Precio</p>
//                     <p className="prod-li-price">S/.{product.price}</p>
//                   </div>
//                   <div className="prod-li-qnt-wrap">
//                     <p className="qnt-wrap prod-li-qnt">
//                       <a href="#" className="qnt-plus prod-li-plus"><i className="icon ion-arrow-up-b"></i></a>
//                       <input type="text" name="cantidad" value={product.quantity} />
//                       <a href="#" className="qnt-minus prod-li-minus"><i className="icon ion-arrow-down-b"></i></a>
//                     </p>
//                   </div>
//                   <div className="prod-li-total-wrap">
//                     <p>Total</p>
//                     <p className="prod-li-total">S/.{product.total}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="prod-li-info">
//                 <p className="prod-li-add">
//                   <button
//                     type="button"
//                     onClick={() => handleDeleteProduct(product.id)}
//                     className="boton_eliminar"
//                   >
//                     <i className="boton_eliminar"></i><span>Eliminar</span>
//                   </button>
//                 </p>
//               </div>
//             </div>
//           </article>
//         ))
//       ) : (
//         <p>Carrito sin productos</p>
//       )}
//     </div>

//     <div className="cart-actions">
//       <div className="coupon">
//         <button onClick={handleDeleteProduct} className="checkout-button button">Eliminar Carrito</button>
//       </div>
//       <div className="cart-collaterals">
//         <Link to='/order' className="checkout-button button">Registrar Pedido</Link>
//         <div className="order-total">
//           <p className="cart-totals-ttl">Total</p>
//           <p className="cart-totals-val">S/.{cartTotal}</p>
//         </div>
//         <button onClick={handleBuy}>Comprar</button>
//         {preferenceId && <Wallet initialization={{ preferenceId }}/> }

//         <div>
//             <button onClick={createPreference}>Crear Preferencia de Pago</button>
//             <div id="payment-form"></div>
//             <button onClick={handlePayment}>Realizar Pago</button>
//         </div>

//       </div>
//     </div>
//   </div>
// </div>
// </div>
//   )
// }
