import axios from 'axios'
import { ORDER_LIST_RESET } from '../Constants/orderConstants'
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
  UPDATE_DETAILS_SUCCESS,
  USERS_LIST_FAIL,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
} from '../Constants/userConstants'

export const userLogin =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      )

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      })
      localStorage.setItem('login', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const logout = () => (dispatch) => {
  localStorage.removeItem('login')
  // localStorage.removeItem('shipAddress')
  localStorage.removeItem('paymentMethod')
  localStorage.removeItem('cartItems')
  dispatch({ type: LOGOUT })
  dispatch({ type: DETAILS_RESET })
  dispatch({ type: ORDER_LIST_RESET })
}

export const userRegister =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
      )

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      })
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      })
      localStorage.setItem('login', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const userDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DETAILS_REQUEST,
    })

    const {
      login: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, Token failed') {
      dispatch(logout())
    }
    dispatch({
      type: DETAILS_FAIL,
      payload: message,
    })
  }
}

export const userDetailsUpdateAdmin = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_USER_UPDATE_REQUEST,
    })

    const {
      login: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/${user._id}`, user, config)

    dispatch({
      type: ADMIN_USER_UPDATE_SUCCESS,
    })
    dispatch({
      type: DETAILS_SUCCESS,
      payload: data,
    })
    dispatch({ type: ADMIN_USER_UPDATE_RESET })
    // dispatch({ type: DETAILS_RESET })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, Token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ADMIN_USER_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const userDeleteAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_USER_DELETE_REQUEST,
    })

    const {
      login: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/users/${id}`, config)

    dispatch({
      type: ADMIN_USER_DELETE_SUCCESS,
    })

    // dispatch({ type: DETAILS_RESET })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, Token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ADMIN_USER_DELETE_FAIL,
      payload: message,
    })
  }
}

//for profile
export const updateUserDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_DETAILS_REQUEST,
    })

    const {
      login: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/profile`, user, config)

    dispatch({
      type: UPDATE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: UPDATE_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_LIST_REQUEST,
    })

    const {
      login: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users`, config)

    dispatch({
      type: USERS_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USERS_LIST_FAIL,
      payload: message,
    })
  }
}
