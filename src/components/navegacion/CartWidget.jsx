import React from "react";
import { useCartContext } from '../../context/CartContext'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Avatar } from "@mui/material";

const CartWidget = () => {

  const { getItemTotal } = useCartContext();
  const itemQty = getItemTotal();

  return (
    <div className="nav-item my-auto mx-3 px-3">

      <div className="badge rounded-pill bg-dark mx-auto position-relative">
        
        {
          itemQty !== 0 ? 
            
            <i className="fas fa-cart-plus">
              <span className="position-relative top-0 start-50 translate-middle badge rounded-pill bg-danger">
                 {itemQty}
              </span>
            </i>

            :
            
            <Avatar sx={{ bgcolor: "#222222ee", width: 28, height: 28 }}>
                  <ShoppingCartIcon />
            </Avatar>
        }

      </div>

    </div>
  )
}

export default CartWidget