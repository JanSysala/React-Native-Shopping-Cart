import React, { createContext, useReducer } from 'react';
import { productsData } from '../data/products';
import { Product } from '../models/shop';

import { CartReducer, sumItems } from './CartReducer';

export const CartContext = createContext({} as any)

const initialState = { cartItems: [], ...sumItems(productsData), checkout: false };

const CartContextProvider = ({ children }: any) => {

  const [state, dispatch] = useReducer(CartReducer, initialState)

  const increase = (payload: Product) => {
    dispatch({ type: 'INCREASE', payload })
  }

  const decrease = (payload: Product) => {
    dispatch({ type: 'DECREASE', payload })
  }

  const addProduct = (payload: Product) => {
    dispatch({ type: 'ADD_ITEM', payload })
  }

  const removeProduct = (payload: Product) => {
    dispatch({ type: 'REMOVE_ITEM', payload })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR' })
  }

  const handleCheckout = () => {
    dispatch({ type: 'CHECKOUT' })
  }

  const contextValues = {
    removeProduct,
    addProduct,
    increase,
    decrease,
    clearCart,
    handleCheckout,
    ...state
  }

  return (
    <CartContext.Provider value={contextValues} >
      { children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
