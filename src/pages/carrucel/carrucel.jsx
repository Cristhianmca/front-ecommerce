import React from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import '../../index.css'

const Carru = () => {

  const images = [

    { 
      original: 'https://i.postimg.cc/Qtt7YCcq/1.jpg'
    },
    {
      original: 'https://i.postimg.cc/wMRmHrfy/9.jpg'
    },
    {original: 'https://i.postimg.cc/GpzYjGT2/2.jpg'
    },
    {original: 'https://i.postimg.cc/JhRZJPnv/10.jpg'
  },
   
  ]

  return (
    <div className='carru'>
      <ImageGallery clasname="carrucel"
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
      slideInterval={4000}

      //duracion al pasar de una imagen a otra
      slideDuration={1000}

      
      />
    </div>
  )
}

export default Carru
