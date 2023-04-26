import {
  ADMIN_USER_DELETE_FAIL,
  ADMIN_USER_DELETE_REQUEST,
  ADMIN_USER_DELETE_SUCCESS,
  ADMIN_USER_UPDATE_FAIL,
  ADMIN_USER_UPDATE_REQUEST,
  ADMIN_USER_UPDATE_RESET,
  ADMIN_USER_UPDATE_SUCCESS,
  DETAILS_FAIL,
  DETAILS_REQUEST,
  DETAILS_RESET,
  DETAILS_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_DETAILS_FAIL,
  UPDATE_DETAILS_REQUEST,
  UPDATE_DETAILS_RESET,
  UPDATE_DETAILS_SUCCESS,
  USERS_LIST_FAIL,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
} from '../Constants/userConstants'

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true }
    case LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { loading: true }
    case REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export const detailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case DETAILS_REQUEST:
      return { ...state, loading: true }
    case DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}
//for profile
export const updateDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DETAILS_REQUEST:
      return { loading: true }
    case UPDATE_DETAILS_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case UPDATE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case UPDATE_DETAILS_RESET:
      return {}
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USERS_LIST_REQUEST:
      return { loading: true }
    case USERS_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USERS_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminUserUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADMIN_USER_UPDATE_REQUEST:
      return { loading: true }
    case ADMIN_USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case ADMIN_USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case ADMIN_USER_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const adminUserDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USER_DELETE_REQUEST:
      return { loading: true }
    case ADMIN_USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ADMIN_USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
