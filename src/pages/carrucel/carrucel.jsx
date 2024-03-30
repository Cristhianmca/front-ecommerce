import React from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

const Carru = () => {

  const images = [

    { 
      original: 'https://i.postimg.cc/c1p4LDr7/3.jpg'
    },
    {
      original: 'https://i.postimg.cc/3ND6qFhY/4.jpg'
    },
    {original: 'https://i.postimg.cc/hhWwRQ4x/6.jpg'
    },
    {original: 'https://i.postimg.cc/SQ2xq0NN/7.jpg'
  },
   
  ]

  return (
    <div className='carru_gamer2'>
      <ImageGallery clasname="carrucel_gamer2"
      items={images}

      //muestra el boton de play
      showPlayButton={false}

      //muestra el boton de maximizar
      showFullscreenButton={false}

      //muestra los puntos de navegacion
      showBullets={true}

      //autoPlay
      autoPlay={true}

      //duracion de cada imagen
      slideInterval={5000}

      //duracion al pasar de una imagen a otra
      slideDuration={2000}

      

      
        

      
      />
    </div>
  )
}

export default Carru