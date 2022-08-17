import {React, createContext, useState, useContext} from 'react'
import Swal from 'sweetalert2';
  
const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext)
  
const CartContextProvider = ({ children }) => {

    const [cartList, setCartList] = useState([])
    
    // add an Item to the Cart, if the item is already on the cart, just add qty.
    const addToCart = (objProducto) => {
        const cartCopy = cartList.slice();
            const index = cartCopy.findIndex((item) => objProducto.id === item.id);
            
            if (index === -1) {
            cartCopy.push({ ...objProducto, quantity: objProducto.quantity });
            
            } else {
                const product = cartCopy[index];
                cartCopy[index] = { ...product, quantity: objProducto.quantity + product.quantity, totalPrice: objProducto.totalPrice };
            }
            setCartList(cartCopy);
    };
    
    // Just empty the Cart
    const emptyCart = () => {
        Swal.fire({
            icon: 'warning',
            title: `Are you sure you want to empty the Cart?`,
            text: `This action can't be undone!`,
            footer: `Keep buying!!`,
            showCancelButton: true,
            confirmButtonColor: '#d63030',
            cancelButtonColor: '#2e7d32',
            confirmButtonText: 'Empty anyway!',
        }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire('Your Cart has been Emptied', '', 'success')
              setCartList([]);
            } else {
              Swal.fire('Your Items still remains in your Cart', '', 'info')
            }
          })
    }

    // Final Empty Cart finishing the shopping
    const finalEmptyCart = () => {
      setCartList([]);
    }

  // remove only one item form cart
    const removeItem = (id) => {
        const newList = cartList.filter((item) => item.id !== id);

        Swal.fire({
            icon: 'warning',
            title: `Are you sure you want to delete this Item?`,
            text: `This action can't be undone!`,
            footer: `Keep buying!!`,
            showCancelButton: true,
            confirmButtonColor: '#d63030',
            cancelButtonColor: '#2e7d32',
            confirmButtonText: 'Delete anyway!',
        }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire('Your Item has been Deleted', '', 'success')
              setCartList(newList);
            } else {
              Swal.fire('Your Item still remains in your Cart', '', 'info')
            }
          })
    }

    // get the cart count of items of the cart
    const getCartCount = () => {
        return cartList.length;
        // =======OR=========
        //return cart.reduce((total, product) => total + product.count, 0);
      };

    // get the total amount $ of the cart according to prices & qty's.  
    const getCartTotal = () => {
        return cartList.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
    };
    
    // get the total qty. of products of the cart
    const getItemTotal = () => {
        return cartList.reduce(
          (total, item) => total + item.quantity,
          0
        );
    };

    // get actual date of the shopping
    const dateOrderCreated = () => {
      let today = new Date();

      const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
      const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      const currentTime = 'Date: ' + date + ' - Time: ' + time;
      return currentTime;
    }

    // get actual date of printingPDF
    const dateOrderPrinted = () => {
      let today = new Date();

      const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
      const time = today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();
      const currentPrintTime = date + '_' + time;
      
      return currentPrintTime;
    }

    return(
        <CartContext.Provider value={{
            cartList,
            addToCart,
            emptyCart,
            removeItem,
            getCartCount,
            getCartTotal,
            getItemTotal,
            finalEmptyCart,
            dateOrderCreated,
            dateOrderPrinted,
        }}>
            { children }
        </CartContext.Provider>
    )
}

export default CartContextProvider