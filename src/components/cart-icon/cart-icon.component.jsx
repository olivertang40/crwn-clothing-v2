import { useContext, useState } from 'react'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { CartContext } from '../../contexts/cart.context'

import "./cart-icon.styles.scss"

const CartIcon = () => {
  const { IsCartOpen, setIsCartOpen } = useContext(CartContext)
  const toggleIsCartOpen = () => setIsCartOpen(!IsCartOpen)

  return (
    <div className="cart-icon-container">
      <ShoppingIcon onClick={toggleIsCartOpen} className="shopping-icon" />
      <span className='item-count'>0</span>
    </div>
  )
}

export default CartIcon