import React from 'react'
import ItemListContainer from '../ItemList/ItemListContainer'

const Inicio = () => {

    const styleHome = { backgroundImage: "radial-gradient(circle, #857e7e99, #c9dfdd, #cad9c3)",
                        fontSize: '1rem',
                        paddingTop: '12vh',
                        paddingBottom: '5vh'
                    }

  return (
    <div
        style={ styleHome }
    >
        <img className="imgHomePage" src="https://firebasestorage.googleapis.com/v0/b/comision41070-lachauffer.appspot.com/o/logos%2FlogoLaChauffer.png?alt=media&token=c45cf440-2732-4be0-9aee-beae3b79fa08" alt="Logo Perfumes" width="250" height="170" title="La Chauffer"/>
        <h1><strong>LaChauffer</strong> Home Page</h1>
        <div>
            <hr />
              <ItemListContainer />
            <br />
          </div>
        
    </div>
  )
}

export default Inicio