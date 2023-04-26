import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, ListGroup, Image } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../Actions/cartActions'
import './CartScreen.css'

const CartScreen = ({ match, location, history }) => {
  const shopId = match.params.shopid
  const productId = match.params.productid
  const qty = location.search ? location.search.split('?')[1].split('=')[1] : 1
  const size = location.search
    ? location.search.split('?')[2].split('=')[1]
    : ''

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkOutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  const dispatch = useDispatch()
  useEffect(() => {
    if (shopId && productId) {
      dispatch(addToCart(shopId, productId, qty, size))
    }
  }, [dispatch, shopId, productId, qty, size])

  return (
    <Row className='justify-content-md-center '>
      {cartItems.length === 0 ? (
        <Col md={8}>
          <div className='emptyContainer'>
            <Image
              src='https://media.istockphoto.com/photos/crying-baby-in-a-shopping-cart-picture-id518657878?k=20&m=518657878&s=170667a&w=0&h=43y-guvRVuQJkyjXK_4AhtxH5RwcnMXQjH7wdiTPyuk='
              alt='crying cart'
              fluid
            />
            <p className='hero'>Your shopping cart is empty.</p>
            <p className='heroSubtitle'>
              {' '}
              Please add something soon, carts have feelings too.
            </p>
            <button className='goHomeButton '>
              <Link
                to='/'
                style={{ color: 'rgb(4, 145, 155)', textDecoration: 'none' }}
              >
                Continue shopping
              </Link>
            </button>
          </div>
        </Col>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup>
              <h1
                style={{
                  textAlign: 'center',
                  fontSize: '3em',
                  padding: '5px',
                  letterSpacing: '-1px',
                  backgroundColor: '#ed2d2f',
                  color: 'white',
                }}
              >
                Cart
              </h1>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.productId}>
                  <Row>
                    <Col md={3}>
                      <Image src={item.image} fluid></Image>
                    </Col>
                    <Col md={6} lg={7} className='my-2'>
                      <Row>
                        <Link
                          to={`/${item.shopId}/product/${item.productId}`}
                          style={{
                            textDecoration: 'none',
                            fontWeight: '900',
                            fontSize: '16px',
                          }}
                        >
                          {item.name}
                        </Link>
                      </Row>
                      <Row>
                        <p className='category'>{item.category}</p>
                      </Row>
                      <div className='optionsContainer'>
                        <div className='qtyContainer'>
                          <label htmlFor='qty'>Qty:</label>
                          <select
                            value={item.quantity}
                            id='qty'
                            onChange={(e) =>
                              dispatch(
                                addToCart(
                                  item.shopId,
                                  item.productId,
                                  e.target.value,
                                  item.size
                                )
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map(
                              (count) => (
                                <option key={count + 1} value={count + 1}>
                                  {count + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div className='sizeOptionContainer'>
                          <label htmlFor='size'>Size:</label>
                          <select
                            id='size'
                            value={item.size}
                            onChange={(e) =>
                              dispatch(
                                addToCart(
                                  item.shopId,
                                  item.productId,
                                  item.quantity,
                                  e.target.value
                                )
                              )
                            }
                          >
                            {item.sizes?.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <Row>
                        <button
                          className='removeBtn my-2'
                          onClick={() => removeFromCartHandler(item.productId)}
                        >
                          Remove
                        </button>
                      </Row>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <h3>
              BILLING DETAILS (
              {cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)}{' '}
              items)
            </h3>
            <ListGroup>
              <ListGroup.Item>
                Price: $
                {cartItems
                  .reduce(
                    (acc, item) => acc + Number(item.quantity) * item.price,
                    0
                  )
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <button
                  className='orderbutton '
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                >
                  Place order
                </button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </Row>
  )
}

export default CartScreen
