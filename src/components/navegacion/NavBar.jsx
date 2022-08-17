import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import CartWidget from './CartWidget'

const NavBar = () => {

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light navBackground">
        <div className="container-fluid">
          <Link to="/Inicio">
            <img src="https://firebasestorage.googleapis.com/v0/b/comision41070-lachauffer.appspot.com/o/logos%2FlogoLaChauffer.png?alt=media&token=c45cf440-2732-4be0-9aee-beae3b79fa08" className="logoMarca" alt="Logo La Chuaffer" width="150" height="70" title="Logo La Chauffer"/>
          </Link>
          <button className="navbar-toggler me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse flex-nowrap" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item mx-5">
                <NavLink className={({isActive})=>isActive ? 'nav-link-active' : 'nav-link' } to="/Inicio"><i className="fas fa-laptop-house me-1"></i> Home</NavLink>
              </li>
              <li className="nav-item mx-5">
                <NavLink className={({isActive})=>isActive ? 'nav-link-active' : 'nav-link' } to="/Items/masculinos"><i className="fas fa-mars me-1"></i> Items Masculinos</NavLink>
              </li>
              <li className="nav-item mx-5">
                <NavLink className={({isActive})=>isActive ? 'nav-link-active' : 'nav-link' } to="/Items/femeninos"><i className="fas fa-venus me-1"></i> Items Femeninos</NavLink>
              </li>
              <li className="nav-item mx-5">
                <NavLink className={({isActive})=>isActive ? 'nav-link-active' : 'nav-link' } to="/About"><i className="fas fa-user-friends me-1"></i> About</NavLink>
              </li>
            </ul>
            <div className="d-flex justify-content-center">
              <Link to="/Cart">
                <CartWidget />
              </Link>  
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar