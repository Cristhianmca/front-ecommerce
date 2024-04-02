
import { Link } from "react-router-dom";
import '../../index.css'



const HeaderComputo = ({ user }) => {
    return (
      //aqui se le agrego la posicion fixed para que la posicion de los elementos sea fija al hacer scrool , un top 0 que asegura que el elemento siempre este en la parte superior de la pagina y un z-50 asegura que el elemento siempre este por encima de los demas elementos de la pagina osea que este superior a cualquier otro contenido de la pagina
      <div className="w-[100%] mx-auto  overflow-hidden border-1  bg-[#009fe3]      border-black fixed top-0 z-50  ">
        <header>
          <nav className="flex h-32  justify-between   ">
            <Link
              to="/"
              className="w-3/4  text-4xl text-black font-bold   flex items-center "
            >
              <img
                className=" w-80 h-32 object-cover "
                src="https://i.postimg.cc/4yPDpmkf/Deluxecomputer2.png"
                alt="foto de la empresa"
              />
            </Link>
            <input type="checkbox" id="menu" className=" peer/menu hidden" />
            <label
              htmlFor="menu"
              className="hamburguer   w-10 h-10  bg-open-menu bg-cover bg-center rounded-lg  cursor-pointer peer-checked/menu:bg-close-menu transition-all z-40 md:hidden "
            ></label>
            <ul className=" bg-[#009fe3] fixed inset-0  text-lg text-black font-light px-[5%] grid auto-rows-max gap-8 content-center justify-items-center clip-circle-0 peer-checked/menu:clip-circle-full transition-[clip-path] duration-500 md:clip-circle-full md:relative md:grid-flow-col md:p-4 md:bg-transparent ">
            
                <li className=" ">
                 
                  <Link
                    className=" px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900"
                    to="/login"
                  >
                    <i className="bi bi-person-fill"></i>
                    
                  </Link>
                </li>
             
                {/* //aqui a las li le agregue un w-[120px] para que no se desacomode el menu y un mb-10 para que se separe del el borde del menu hacia arriba// */}
  
             
          
  
              <li className="">
              <Link
          to="cart"
          className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900"
        >
          <i className="bi bi-cart-fill"></i>
        </Link>
              </li>
  
              {user && (
                <li className=" py-1 px-1 rounded-lg ">
                  <button
                    className="carrito font-semibold flex
                  flex-col items-center w-20 "
                  
                  >
                    <i className="bi bi-calendar-x-fill"></i>| Salir
                  </button>
                </li>
              )}
              <li>
                <a className="hover:font-bold" href="#"></a>
              </li>
            </ul>
           
          </nav>
        </header>
      </div>
    );
  }
  export default HeaderComputo;