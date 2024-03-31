import { useState } from "react";
import { Link } from "react-router-dom";
import '../cart/cart.css'
import HeaderComputo from "../header/header";

export const Cart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const handleDeleteProduct = (id) => {
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);

    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const cartTotal = cart.reduce((total, product) => total + product.total, 0);

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
      </div>
    </div>
  </div>
</div>
</div>
  )
}
//     <div>
//       <h1>Carrito</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Producto</th>
//             <th>Cantidad</th>
//             <th>Precio</th>
//             <th>Total</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cart.length > 0 ? (
//             cart.map((product) => (
//               <tr key={product.id}>
//                 <td>{product.name}</td>
//                 <td>{product.quantity}</td>
//                 <td>{product.price}</td>
//                 <td>{product.total}</td>
//                 <td>
//                   <button
//                     type="button"
//                     onClick={() => handleDeleteProduct(product.id)}
//                     className="p-3 bg-white text-gray-900"
//                   >
//                     X
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td>Carrito sin productos</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <Link to='/order'>GENERAR PEDIDO</Link>
//     </div>
//   );
// };
// termino

// {% extends 'layout.html' %}
// {% block content %}
// <div class="cont maincont">
//     <h1 class="maincont-ttl">Cart</h1>
//     <ul class="b-crumbs">
//         <li><a href="index.html">Home</a></li>
//         <li>Cart</li>
//     </ul>
//     <div class="page-styling">
//     <div class="woocommerce prod-litems section-list">
//         {% for key,value in request.session.cart.items %}
//         <article class="prod-li sectls">
//             <div class="prod-li-inner">
//                 <a href="product.html" class="prod-li-img">
//                     <img src="{{value.imagen}}" alt="">
//                 </a>
//                 <div class="prod-li-cont">
//                     <div class="prod-li-ttl-wrap">
//                         <p>
//                             <a href="#">{{value.categoria}}</a>
//                         </p>
//                         <h3><a href="/producto/{{value.producto_id}}">{{value.nombre}}</a></h3>
//                     </div><!--
//     No Space
//     --><div class="prod-li-prices">
//                     <div class="prod-li-price-wrap">
//                         <p>Precio</p>
//                         <p class="prod-li-price">S/.{{value.precio}}</p>
//                     </div>
//                     <div class="prod-li-qnt-wrap">
//                         <p class="qnt-wrap prod-li-qnt">
//                             <a href="#" class="qnt-plus prod-li-plus"><i class="icon ion-arrow-up-b"></i></a>
//                             <input type="text" name="cantidad" value="{{value.cantidad}}">
//                             <a href="#" class="qnt-minus prod-li-minus"><i class="icon ion-arrow-down-b"></i></a>
//                         </p>
//                     </div>
//                     <div class="prod-li-total-wrap">
//                         <p>Total</p>
//                         <p class="prod-li-total">S/.{{value.subtotal}}</p>
//                     </div>
//                 </div><!--
// No Space
// --></div>
//                 <div class="prod-li-info">
//                     <div class="prod-li-rating-wrap">
//                         <p data-rating="5" class="prod-li-rating">
//                             <i class="rating-ico" title="1"></i><i class="rating-ico" title="2"></i><i class="rating-ico" title="3"></i><i class="rating-ico" title="4"></i><i class="rating-ico" title="5"></i>
//                         </p>
//                         <p class="prod-li-rating-count">12</p>
//                     </div>
//                     <p class="prod-li-add">
//                         <a href="/carrito/del/{{value.producto_id}}" class="button hover-label prod-addbtn"><i class="icon ion-close-round"></i><span>Eliminar</span></a>
//                     </p>
//                     <p class="prod-li-compare">
//                         <a href="compare.html" class="hover-label prod-li-compare-btn"><span>Compare</span><i class="icon ion-arrow-swap"></i></a>
//                     </p>
//                     <p class="prod-quickview">
//                         <a href="#" class="hover-label quick-view"><i class="icon ion-plus"></i><span>Quick View</span></a>
//                     </p>
//                     <div class="prod-li-favorites">
//                         <a href="wishlist.html" class="hover-label add_to_wishlist"><i class="icon ion-heart"></i><span>Add to Wishlist</span></a>
//                     </div>
//                     <p class="prod-li-information">
//                         <a href="#" class="hover-label"><i class="icon ion-more"></i><span>Show Information</span></a>
//                     </p>
//                 </div>
//             </div>
//         </article>
//         {% endfor %}
//     </div>


//     <div class="cart-actions">
//         <div class="coupon">
//             <a href="/carrito/clear" class="checkout-button button">Limpiar Carrito</a>
//         </div>
//         <div class="cart-collaterals">
//             <a href="/pedido" class="checkout-button button">Registrar Pedido</a>
//             <div class="order-total">
//                 <p class="cart-totals-ttl">Total</p>
//                 <p class="cart-totals-val">S/.{{request.session.cart_total}}</p>
//             </div>
//         </div>
//     </div>


// </div>
// </div>
// {% endblock %}
