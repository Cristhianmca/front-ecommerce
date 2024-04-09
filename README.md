# Crear proyecto

```bash	
npm create vite@latest
```

```bash
cd nombre_proyecto
```

```bash
npm install
```

```bash
npm run dev
```

# Se instalaron las siguientes librerias

npm i react-image-gallery

npm install react-html-parser --force // para que funcione el ckaedit en mi react ya que esta parseando el html por que no aparecia en el formato editado en django 


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
                        
                        <h3>
                          <a className="nombre_carrito" href={`/producto/${product.id}`}>{product.name}</a>
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
                            <input className="producto_cantidad"
                              type="text"
                              name="cantidad"
                              value  ={product.quantity}
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