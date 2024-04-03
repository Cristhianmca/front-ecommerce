
import images from '../categorias/images'

import { Link } from 'react-router-dom'


const Slider1 = () => {
  return (
    <div className="sliderC-container scroll">
      <div className="containerZonaSaltos" drag = 'x' dragConstraints={{right:-20, left:-200}}>
        {images.map(image =>(

            <div className='sub-zonaSaltos flex'>

             {/* ------zona Gamer #1------ */}
              <Link to='zonagamer'>
            <div>
              <a href="">
                <img className='animated-border' src={image.img1} alt="" />
                <p>{image.text1}</p>
              </a>
            </div>
              </Link>

            {/* -----Zona Teclados #2----- */}
              <Link to='zonaTeclados'>
            <div>
              <a  href="">
                <img className='animated-border' src={image.img2} alt="" />
                <p>{image.text2}</p>
              </a>
            </div>
              </Link>

                   {/* -----Zona Microfonos #3----- */}
              <Link to='zonaMicrofonos'>
            <div>
              <a  href="">
                <img className='animated-border' src={image.img3} alt="" />
                <p>{image.text3}</p>
              </a>
            </div>
              </Link>
              
               {/* -----Zona Microfonos #4----- */}
               <Link to='zonaAudifonosGamer'>
            <div>
              <a  href="">
                <img className='animated-border' src={image.img4} alt="" />
                <p>{image.text4}</p>
              </a>
            </div>
              </Link>

               {/* -----Zona Audifonos #5----- */}
               <Link to='zonaLaptops'>
            <div>
              <a  href="">
                <img className='animated-border' src={image.img5} alt="" />
                <p>{image.text5}</p>
              </a>
            </div>
              </Link>

               {/* -----Zona Cargadores #6----- */}
               <Link to='zonaCargadores'>
            <div>
              <a  href="">
                <img className='animated-border' src={image.img6} alt="" />
                <p>{image.text6}</p>
              </a>
            </div>
              </Link>

               {/* -----Zona Pc gamer #7----- */}
               <Link to='ZonaPcGamer'>
            <div>
              <a  href="">
                <img className='animated-border' src={image.img7} alt="" />
                <p>{image.text7}</p>
              </a>
            </div>
              </Link>

               {/* -----Zona Monitores #8----- */}
               <Link to='zonaMonitores'>
            <div>
              <a  href="">
                <img className='animated-border' src={image.img8} alt="" />
                <p>{image.text8}</p>
              </a>
            </div>
              </Link>

            </div>
        ))}
        </div>
    </div>
  )
}

export default Slider1
