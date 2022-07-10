import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { createBuyOrder } from '../../services/firestore';
import { CartContext } from '../../context/CartContext';

const Cart = () => {
  const { cart, removeItem, clearCart, totalCost } = useContext(CartContext);

  // {buyer:{name,phone,email),items:[[id,title,price}],total}


  function handleBuyOrder() {
    const dataOrder = {
      buyer: {
        name: 'John',
        phone: 1164953225,
        email: "Johnson@gmail.com"
      },
      items: cart,
      total: totalCost()
    }
    createBuyOrder(dataOrder).then(() =>{
      clearCart();
    })
    

  }


  if (cart.length === 0) {
    return (
      <>
        <div>

          <h1 className="text-center">El carrito esta vacio</h1>

          <div>

            <Link to="/" className="bg-yellow-500 py-2 px-8 rounded-md font-bold text-white mt-5" >
              Volver al Inicio
            </Link>

          </div>

        </div>
      </>
    )
  }

  return (
    <>
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
        {
          cart.map((item) => (

            <div className="bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative" key={item.id}>
              <div className="mb-5 py-3 text-center">
                <h1 className="text-3xl text-gray-900 mt-2 mb-4 font-medium title-font">{item.name}</h1>

                <p className="mt-4 text-green-700 text-md font-bold" >${item.price}</p>

                <p>
                  Subtotal:{" "}
                  <span className="text-green-600">
                    ${item.price * item.qty}
                  </span>
                </p>

                <button onClick={() => { removeItem(item.id) }} className="bg-red-500 py-2 px-8 rounded-md font-bold text-white mt-5">X</button>
                <p>Cantidad: {item.qty}</p>
              </div>
            </div>
          ))


        }

      </div>

      <div>
        <p className="total">Total de la compra: ${totalCost()}</p>

        <button onClick={clearCart} className="bg-red-500 py-2 px-8 rounded-md font-bold text-white mt-5">Vaciar Carrito</button>

        <button onClick={handleBuyOrder} className="bg-green-500 py-2 px-8 rounded-md font-bold text-white mt-5">Comprar</button>
      </div>
    </>
  )
}

export default Cart
