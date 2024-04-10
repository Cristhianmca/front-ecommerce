import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../cart/cart.css';
import HeaderComputo from "../header/header";
import axios from "axios";

export const Cart = () => {
  const [cart, setCart] = useState([]);
  const [cuponAplicado, setCuponAplicado] = useState(null);
  const [cuponInput, setCuponInput] = useState('');

  useEffect(() => {
    // Cargar el carrito desde el almacenamiento local
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleDeleteProduct = (id) => {
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/cupon/${cuponInput}`);
      const cupon = response.data;
      setCuponAplicado(cupon);
    } catch (error) {
      console.error("Error al aplicar el cupón:", error);
    }
  };

  const handleRemoveCoupon = () => {
    setCuponAplicado(null);
  };

  const handleCuponInputChange = (e) => {
    setCuponInput(e.target.value);
  };

  const getDiscountedPrice = (price) => {
    if (cuponAplicado) {
      const discount = parseFloat(cuponAplicado.porcentaje_descuento) / 100;
      return price * (1 - discount);
    } else {
      return price;
    }
  };

  const getTotalPrice = () => {
    let totalPrice = cart.reduce((total, product) => {
      const price = parseFloat(product.price);
      const discountedPrice = getDiscountedPrice(price);
      return total + discountedPrice * product.quantity;
    }, 0);
    return totalPrice.toFixed(2);
  };

  return (
    <div>
      <HeaderComputo />
      <div className="cont maincont">
        <h1 className="maincont-ttl">CARRITO DE COMPRAS </h1>
        <ul className="b-crumbs">
          
          <li className="carrito_compras">CARRITO DE COMPRAS</li>
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
                        <h3><a className="nombre_carrito" href={`/producto/${product.id}`}>{product.name}</a></h3>
                      </div>
                      <div className="prod-li-prices">
                        <div className="prod-li-price-wrap">
                          <p>Precio</p>
                          <p className="prod-li-price">S/.{getDiscountedPrice(parseFloat(product.price)).toFixed(2)}</p>
                        </div>
                        <div className="prod-li-qnt-wrap">
                          <p className="qnt-wrap prod-li-qnt">
                            <a href="#" className="qnt-plus prod-li-plus"><i className="icon ion-arrow-up-b"></i></a>
                            <input className="producto_cantidad" type="text" name="cantidad" value={product.quantity} readOnly />
                            <a href="#" className="qnt-minus prod-li-minus"><i className="icon ion-arrow-down-b"></i></a>
                          </p>
                        </div>
                        <div className="prod-li-total-wrap">
                          <p>Total</p>
                          <p className="prod-li-total">S/.{(getDiscountedPrice(parseFloat(product.price)) * product.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="prod-li-info">
                      {cuponAplicado && (
                        <>
                          <p>Cupón aplicado: {cuponAplicado.codigo}</p>
                          <p>Descuento: {cuponAplicado.porcentaje_descuento}%</p>
                          <button onClick={handleRemoveCoupon}>Eliminar Cupón</button>
                        </>
                      )}
                      {!cuponAplicado && (
                        <>
                          <input type="text" value={cuponInput} onChange={handleCuponInputChange} placeholder="Ingresa tu cupón" />
                          <button onClick={handleApplyCoupon}>Aplicar Cupón</button>
                        </>
                      )}
                      <button onClick={() => handleDeleteProduct(product.id)} className="boton_eliminar">
                        <i className="boton_eliminar"></i><span>Eliminar</span>
                      </button>
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
              <button onClick={handleDeleteProduct} className="checkout-button button"></button>
            </div>
            <div className="cart-collaterals">
              <Link to='/order' className="registrar_pedido">Registrar Pedido</Link>
              <div className="order-total">
                <p className="cart-totals-ttl">Total</p>
                <p className="cart-totals-val">S/.{getTotalPrice()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};