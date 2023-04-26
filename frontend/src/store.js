import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productCreatedReducer,
  productDeletedReducer,
  productDetailsReducer,
  productUpdateReducer,
  reviewCreatedReducer,
  sellerShopsReducer,
  shopCreateReducer,
  shopDeletedReducer,
  shopDetailsReducer,
  shopListReducer,
  shopUpdateReducer,
} from './Reducers/shopReducers.js'
import { cartReducer } from './Reducers/cartReducers.js'
import {
  adminOrderListReducer,
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
  sellerOrderListReducer,
} from './Reducers/orderReducers.js'
import {
  adminUserDeleteReducer,
  adminUserUpdateReducer,
  detailsReducer,
  loginReducer,
  registerReducer,
  updateDetailsReducer,
  userListReducer,
} from './Reducers/userReducers.js'

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
const loginDataFromStorage = localStorage.getItem('login')
  ? JSON.parse(localStorage.getItem('login'))
  : null
const shippingAddressFromStorage = localStorage.getItem('shipAddress')
  ? JSON.parse(localStorage.getItem('shipAddress'))
  : {}

const reducer = combineReducers({
  shopList: shopListReducer,
  shopDetails: shopDetailsReducer,
  shopCreate: shopCreateReducer,
  shopDeleted: shopDeletedReducer,
  shopUpdate: shopUpdateReducer,
  sellerShops: sellerShopsReducer,
  productDetails: productDetailsReducer,
  productDeleted: productDeletedReducer,
  productCreated: productCreatedReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  login: loginReducer,
  register: registerReducer,
  details: detailsReducer,
  updateDetails: updateDetailsReducer,
  orderCreated: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  userOrdersList: orderListReducer,
  adminUserUpdate: adminUserUpdateReducer,
  usersList: userListReducer,
  adminUserDelete: adminUserDeleteReducer,
  adminOrderList: adminOrderListReducer,
  sellerOrderList: sellerOrderListReducer,
  reviewCreated: reviewCreatedReducer,
})
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  login: { userInfo: loginDataFromStorage },
}
const middleWare = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
)
export default store
