import { useState } from "react";
import { Link } from "react-router-dom";
import '../cart/cart.css'
import HeaderComputo from "../header/header";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'


export const Pedido = () => {
    const [preferenceId, setPreferenceId] = useState(null);


    initMercadoPago('TEST-6e8e780b-a354-441d-83f1-76519e828ea5', {locale: 'es-PE'  
});
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const handleDeleteProduct = (id) => {
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);

    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const cartTotal = cart.reduce((total, product) => total + product.total, 0);
  const handleBuy = () => {
    const products = cart.map((product) => ({
      id: product.id,
        name: product.name,
   
    }));

    fetch('http://127.0.0.1:8000/api/create-payment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPreferenceId(data.id);
      });
  }
  return (
    <div>
      <HeaderComputo/>
    <div className="cont maincont">
  <h1 className="maincont-ttl">Cart</h1>
  <ul className="b-crumbs">
    <li><a href="index.html">Home</a></li>
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
                  <h3><a href={`/producto/${product.id}`}>{product.name}</a></h3>
                </div>
                <div className="prod-li-prices">
                  <div className="prod-li-price-wrap">
                    <p>Precio</p>
                    <p className="prod-li-price">S/.{product.price}</p>
                  </div>
                  <div className="prod-li-qnt-wrap">
                    <p className="qnt-wrap prod-li-qnt">
                      <a href="#" className="qnt-plus prod-li-plus"><i className="icon ion-arrow-up-b"></i></a>
                      <input type="text" name="cantidad" value={product.quantity} />
                      <a href="#" className="qnt-minus prod-li-minus"><i className="icon ion-arrow-down-b"></i></a>
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
                    <i className="boton_eliminar"></i><span>Eliminar</span>
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
        <button onClick={handleDeleteProduct} className="checkout-button button">Eliminar Carrito</button>
      </div>
      <div className="cart-collaterals">
        <Link to='/order' className="checkout-button button">Registrar Pedido</Link>
        <div className="order-total">
          <p className="cart-totals-ttl">Total</p>
          <p className="cart-totals-val">S/.{cartTotal}</p>
        </div>
        <button onClick={handleBuy}>Comprar</button>
        {preferenceId && <Wallet initialization={{ preferenceId }}/> }
      </div>
    </div>
  </div>
</div>
</div>
  )
}