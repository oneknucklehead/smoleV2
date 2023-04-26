import {
  REMOVE_FROM_CART,
  ADD_TO_CART,
  CLEAR_CART,
  CART_ADDRESS_SAVE,
  CART_PAYMENT_METHOD_SAVE,
} from '../Constants/cartConstants.js'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload
      const existingItem = state.cartItems.find(
        (x) => x.productId === item.productId
      )
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.productId === existingItem.productId ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.productId !== action.payload
        ),
      }
    case CART_ADDRESS_SAVE:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CART_PAYMENT_METHOD_SAVE:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    case CLEAR_CART:
      return {
        cartItems: [],
      }
    default:
      return state
  }
}
