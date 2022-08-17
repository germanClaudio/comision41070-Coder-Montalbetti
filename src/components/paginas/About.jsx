import React from 'react'

const About = () => {

    const styleAbout = {
                        backgroundImage: "radial-gradient(circle, #74EBD5, #9FACE6, #b2fefa)",
                        fontSize: '1rem',
                        paddingTop: '12vh',
                        paddingBottom: '50%'
                      }

  return (
    <div
      style={styleAbout}
    >
      <h1><strong>About page</strong></h1>
      <hr />
        <h5>LaChauffer React App</h5>
        <div className="container my-5 mx-auto">
        <p>E-commerce generico que permite navegacion por categoria de detales y global. Elegir items donde muetra descripcion de productos y aumentar/disminiur cantidad del mismo item a comprar y adjuntar al carrito de compras. En el carrito se listan los detalles con sus decripciones y cantiddades elegidas. Se puede eliminar de a un item o elimnar el carrito completo con confirmaciones. Además, introduiir datos de usuario por Formulario, chequear estos datos y generar order. Por ultimo, generar pdf que se descarga a la maquina del usuario con todos los datos de la orden. Esta SPA está conectada a la BBDD de Firebase donde se alojan los datos de los productos y el stock de los mismos, a su vez, es donde se alojan las ordenes generadas por el usuaio en sus compras. </p>
        </div>
      <br />
    </div>
  )
}

export default About