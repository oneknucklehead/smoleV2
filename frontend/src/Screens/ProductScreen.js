import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../Components/Rating'
import Loader from '../Components/Loader'
import './ProductScreen.css'
import { createReview, productDetail } from '../Actions/shopActions.js'
import Message from '../Components/Message.js'
import { clearCart } from '../Actions/cartActions.js'
import { CREATE_REVIEW_RESET } from '../Constants/shopConstants'

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const [diffShop, setDiffShop] = useState(false)
  var diffShopSetter = false
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [itemSize, setItemSize] = useState('')

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const login = useSelector((state) => state.login)
  const { userInfo } = login

  const reviewCreated = useSelector((state) => state.reviewCreated)
  const { success: successReview, error: errorReview } = reviewCreated

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  cartItems &&
    cartItems.length > 0 &&
    // eslint-disable-next-line
    cartItems?.map((item) => {
      if (item.shopId !== match.params.shopid) {
        diffShopSetter = true
        return diffShopSetter
      }
    })
  const [open, setOpen] = useState(false)
  const dropdownHandler = () => {
    setOpen(!open)
  }
  const addToCartHandler = () => {
    if ((itemSize !== '' && !diffShop) || product.sizes !== [])
      history.push(
        `/cart/${match.params.shopid}/${match.params.productid}?qty=${qty}?size=${itemSize}`
      )
  }
  const clearCartHandler = () => {
    dispatch(clearCart())
    // diffShop = false
    setDiffShop(false)
    diffShopSetter = false
  }
  const reviewSubmitHandller = (e) => {
    e.preventDefault()
    dispatch(
      createReview(match.params.shopid, match.params.productid, {
        rating,
        comment,
      })
    )
  }
  const sizeHandler = (e) => {
    setItemSize(e.target.value)
  }
  useEffect(() => {
    if (successReview) {
      setRating(0)
      setComment('')
    }
    if (!product || !product._id || product._id !== match.params.id) {
      dispatch(productDetail(match.params.shopid, match.params.productid))
      dispatch({ type: CREATE_REVIEW_RESET })
    }
    if (diffShopSetter) {
      setDiffShop(true)
    }
    // eslint-disable-next-line
  }, [match, dispatch, diffShopSetter, successReview])

  if (loading) {
    return (
      <>
        <Loader />
      </>
    )
  }
  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Back Home
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='warning'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <div className='imageWrapper'>
              <img
                src={product.image}
                alt={product.name}
                className='productImage'
              />
            </div>
            <Row>
              <h5 className='mt-5'>Customer Reviews ({product.numReviews})</h5>
              {product.reviews?.length === 0 && (
                <Message>This product has no reviews</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews?.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <Row>
                      <Col md={1} className='reviewStar'>
                        <div className='reviewStarContent'>
                          {review.rating}
                          <i class='fas fa-star'></i>
                        </div>
                      </Col>
                      <Col className='m-0 p-0'>
                        <p className='reviewContent1'>{review.comment}</p>
                        <p className='reviewContent2'>
                          {review.name} | {review.createdAt.substring(1, 10)}
                        </p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h4>Write your review below:</h4>
                  {errorReview && (
                    <Message variant={'danger'}>{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={reviewSubmitHandller}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          className='m-0'
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Choose One..</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Great</option>
                          <option value='5'>5 - Awesome</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button className='my-3' type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      You must <Link to='/login'>login</Link> to comment
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Row>
          </Col>
          <Col></Col>
          <Col md={5}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2 className='productName'>{product.name}</h2>
                <p className='category'>{product.category}</p>
                {/* <p className='shopName'> By {shop.name}</p> */}
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item className='fw-bold price'>
                Price: ${product.price}
              </ListGroup.Item>
              {product.sizes && product.sizes !== [] && (
                <ListGroup.Item>
                  <Row>
                    <div className='my-2 fw-bold'>Please select size.</div>
                  </Row>
                  <Row>
                    {product.sizes !== '' && (
                      <ul className='sizeContainer'>
                        {product.sizes?.map((size) => (
                          <li style={{ listStyle: 'none' }} key={size}>
                            <input
                              type='radio'
                              id={size}
                              value={size}
                              name='sizeSelector'
                              disabled={product.countInStock === 0}
                              onClick={sizeHandler}
                            ></input>
                            <label htmlFor={size}>
                              <span>{size}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}

                    {product.countInStock !== 0 &&
                    product.size &&
                    itemSize === '' ? (
                      <Message variant='danger' color='red'>
                        Please select size.
                      </Message>
                    ) : (
                      ''
                    )}
                  </Row>

                  <Row>
                    <div className='my-2 fw-bold'>
                      {product.countInStock > 0 &&
                        `Total ${product.countInStock} left`}
                    </div>
                  </Row>
                </ListGroup.Item>
              )}
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <form>
                    <label htmlFor='qty' className='fw-bold'>
                      Quantity
                    </label>
                    <select
                      value={qty}
                      id='qty'
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((count) => (
                        <option key={count + 1} value={count + 1}>
                          {count + 1}
                        </option>
                      ))}
                    </select>
                  </form>
                </ListGroup.Item>
              )}
              <ListGroup.Item variant='flush'>
                <Row className='fw-bold my-2'>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              {diffShop && (
                <ListGroup.Item>
                  <Message>
                    You can only add items from one single shop to your cart at
                    a time. You can clear your cart if you wish.
                  </Message>
                  <div className='d-grid gap-2'>
                    <button
                      className='button'
                      onClick={clearCartHandler}
                      style={{
                        backgroundColor:
                          cartItems.length !== 0 ? '#37bdae' : 'gray',
                        cursor:
                          cartItems.length !== 0 ? 'pointer' : 'not-allowed',
                      }}
                    >
                      Clear Cart
                    </button>
                  </div>
                </ListGroup.Item>
              )}
              {/* {cartItems &&
                cartItems.length > 0 &&
                cartItems?.map((item) => (
                  <ListGroup.Item>
                    {match.params.shopid !== item.shopId && (
                      <>
                        <Message>
                          You can only add items from one single shop to your
                          cart at a time. You can clear your cart if you wish.
                        </Message>
                        <div className='d-grid gap-2'>
                          <button
                            className='button'
                            onClick={clearCartHandler}
                            style={{
                              backgroundColor:
                                cartItems.length !== 0 ? '#37bdae' : 'gray',
                              cursor:
                                cartItems.length !== 0
                                  ? 'pointer'
                                  : 'not-allowed',
                            }}
                          >
                            Clear Cart
                          </button>
                        </div>
                      </>
                    )}
                  </ListGroup.Item>
                ))} */}
              <ListGroup.Item>
                <div className='d-grid gap-2'>
                  <button
                    onClick={addToCartHandler}
                    className='button'
                    disabled={diffShop === true || product.countInStock === 0}
                    style={{
                      backgroundColor:
                        product.countInStock > 0 && diffShop === false
                          ? '#37bdae'
                          : 'gray',
                      cursor:
                        product.countInStock > 0 && diffShop === false
                          ? 'pointer'
                          : 'not-allowed',
                    }}
                  >
                    {product.countInStock > 0 ? 'Add to Cart' : 'Out Of Stock'}
                  </button>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='dropdownContainer' onClick={dropdownHandler}>
                  Description:<span>{open ? '▲' : '▼'}</span>
                </div>
                <div style={{ display: open ? '' : 'none' }}>
                  {product.description}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
