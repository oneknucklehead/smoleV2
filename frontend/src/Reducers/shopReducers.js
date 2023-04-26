import {
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_RESET,
  CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  SELLER_SHOP_DETAILS_FAIL,
  SELLER_SHOP_DETAILS_REQUEST,
  SELLER_SHOP_DETAILS_SUCCESS,
  SHOP_CREATE_FAIL,
  SHOP_CREATE_REQUEST,
  SHOP_CREATE_RESET,
  SHOP_CREATE_SUCCESS,
  SHOP_DELETE_FAIL,
  SHOP_DELETE_REQUEST,
  SHOP_DELETE_SUCCESS,
  SHOP_DETAILS_FAIL,
  SHOP_DETAILS_REQUEST,
  SHOP_DETAILS_RESET,
  SHOP_DETAILS_SUCCESS,
  SHOP_LIST_FAIL,
  SHOP_LIST_REQUEST,
  SHOP_LIST_SUCCESS,
  SHOP_UPDATE_FAIL,
  SHOP_UPDATE_REQUEST,
  SHOP_UPDATE_RESET,
  SHOP_UPDATE_SUCCESS,
} from '../Constants/shopConstants'

export const shopListReducer = (state = { shops: [] }, action) => {
  switch (action.type) {
    case SHOP_LIST_REQUEST:
      return { loading: true, shops: [] }
    case SHOP_LIST_SUCCESS:
      return { loading: false, shops: action.payload }
    case SHOP_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const shopDetailsReducer = (state = { shop: {} }, action) => {
  switch (action.type) {
    case SHOP_DETAILS_REQUEST:
      return { ...state, loading: true }
    case SHOP_DETAILS_SUCCESS:
      return { loading: false, shop: action.payload }
    case SHOP_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case SHOP_DETAILS_RESET:
      return { shop: {} }
    default:
      return state
  }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_DETAILS_RESET:
      return { product: {} }
    default:
      return state
  }
}

export const productDeletedReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, result: action.payload }
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productCreatedReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true }
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const sellerShopsReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_SHOP_DETAILS_REQUEST:
      return { loading: true }
    case SELLER_SHOP_DETAILS_SUCCESS:
      return { loading: false, shops: action.payload }
    case SELLER_SHOP_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const shopDeletedReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOP_DELETE_REQUEST:
      return { loading: true }
    case SHOP_DELETE_SUCCESS:
      return { loading: false, result: action.payload }
    case SHOP_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const shopCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOP_CREATE_REQUEST:
      return { loading: true }
    case SHOP_CREATE_SUCCESS:
      return { loading: false, success: true, shop: action.payload }
    case SHOP_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case SHOP_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const shopUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOP_UPDATE_REQUEST:
      return { loading: true }
    case SHOP_UPDATE_SUCCESS:
      return { loading: false, success: true, shop: action.payload }
    case SHOP_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case SHOP_UPDATE_RESET:
      return {}

    default:
      return state
  }
}

export const reviewCreatedReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
      return { loading: true }
    case CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}
