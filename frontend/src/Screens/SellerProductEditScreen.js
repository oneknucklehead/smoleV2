import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../Components/Message.js'
import Loader from '../Components/Loader.js'
import FormContainer from '../Components/FormContainer.js'
import { productDetail, updateProduct } from '../Actions/shopActions'
import { PRODUCT_UPDATE_RESET } from '../Constants/shopConstants'
import axios from 'axios'

const SellerProductEditScreen = ({ history, match }) => {
  const shopId = match.params.shopid
  const productId = match.params.productid

  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0.0)
  const [countInStock, setCountInStock] = useState(1)
  const [uploading, setUploading] = useState(false)
  const [errUpload, setErrUpload] = useState(null)
  let [sizes, setSizes] = useState([])

  const login = useSelector((state) => state.login)
  const { userInfo } = login

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = productUpdate

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
      setErrUpload(null)
    } catch (error) {
      console.error(error)
      setErrUpload('Only .jpeg, .jpg, .png files allowed')
      setUploading(false)
    }
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/seller/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(productDetail(shopId, productId))
      } else {
        setName(product.name)
        setImage(product.image)
        setDescription(product.description)
        setBrand(product.brand)
        setCategory(product.category)
        setPrice(product.price)
        setCountInStock(product.countInStock)
        setSizes(product.sizes)
      }
    }
  }, [dispatch, history, userInfo, shopId, productId, product, successUpdate])

  const sellerProductUpdateHandler = (e) => {
    e.preventDefault()
    if (sizes !== product.sizes) {
      sizes = sizes.split(',')
    }

    dispatch(
      updateProduct(shopId, {
        _id: productId,
        name,
        image,
        description,
        brand,
        category,
        price,
        sizes,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link to='/seller/productlist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={sellerProductUpdateHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                disabled
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image-file'>
              <Form.Control
                type='file'
                label='Choose File'
                custom='true'
                onChange={uploadFileHandler}
                className='my-3'
              ></Form.Control>
              {errUpload && <Message variant='danger'>{errUpload}</Message>}
              {uploading && <Loader />}
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

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>

              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>

              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>

              <Form.Control
                type='number'
                placeholder='Enter Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {product.sizes ? (
              <p>
                Already available sizes are:
                {product.sizes}
              </p>
            ) : (
              <p>Your product has no sizes</p>
            )}
            {
              <>
                <p>
                  You can edit/change the sizes by entering the sizes one by
                  one, each size followed by a comma
                </p>
                <Form.Group controlId='sizes'>
                  <Form.Label>Sizes</Form.Label>

                  <Form.Control
                    type='text'
                    placeholder='Enter the sizes'
                    value={sizes}
                    onChange={(e) => setSizes(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </>
            }
            {/* <Form.Group controlId='sizes'>
              <Form.Label>Sizes</Form.Label>

              <Form.Control
                type='text'
                placeholder='Enter Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>

              <Form.Control
                type='number'
                placeholder='Enter Count In Stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default SellerProductEditScreen
