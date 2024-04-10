import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const CuponContext = createContext();

export const CuponProvider = ({ children }) => {
  const [cuponAplicado, setCuponAplicado] = useState(null);

  const applyCupon = async (cuponCodigo) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/cupon/${cuponCodigo}`);
      const cupon = response.data;
      setCuponAplicado(cupon);
    } catch (error) {
      console.error("Error al aplicar el cupón:", error);
    }
  };

  const removeCupon = () => {
    setCuponAplicado(null);
  };

  const getCuponDiscount = () => {
    if (cuponAplicado) {
      return parseFloat(cuponAplicado.porcentaje_descuento);
    } else {
      return 0;
    }
  };

  return (
    <CuponContext.Provider value={{ cuponAplicado, applyCupon, removeCupon, getCuponDiscount }}>
      {children}
    </CuponContext.Provider>
  );
};

export const useCupon = () => useContext(CuponContext); // Path: src/pages/cart/cart.jsx