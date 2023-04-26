import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message.js'
import Loader from '../Components/Loader.js'
import FormContainer from '../Components/FormContainer.js'
import { shopDetail, updateShop } from '../Actions/shopActions.js'
import { SHOP_UPDATE_RESET } from '../Constants/shopConstants.js'

const SellerShopEditScreen = ({ match, history }) => {
  const shopId = match.params.shopid
  const dispatch = useDispatch()

  const login = useSelector((state) => state.login)
  const { userInfo } = login

  const shopDetails = useSelector((state) => state.shopDetails)
  const { loading, error, shop } = shopDetails

  const [name, setName] = useState('')
  const [tagline, setTagline] = useState('')
  const [description, setDescription] = useState('')

  const shopUpdate = useSelector((state) => state.shopUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = shopUpdate

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (successUpdate) {
      dispatch({ type: SHOP_UPDATE_RESET })
      history.push('/seller/productlist')
    } else {
      if (!shop.name || shop._id !== shopId) {
        dispatch(shopDetail(shopId))
      } else {
        setName(shop.name)
        setTagline(shop.tagline)
        setDescription(shop.description)
      }
    }
  }, [dispatch, history, userInfo, shopId, shop, successUpdate])

  const sellerShopUpdateHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateShop({
        _id: shopId,
        name,
        tagline,
        description,
      })
    )
  }

  return (
    <>
      <Link to='/seller/productlist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Shop</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={sellerShopUpdateHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='tagline'>
              <Form.Label>Tagline</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter tagline'
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>

              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}
export default SellerShopEditScreen
