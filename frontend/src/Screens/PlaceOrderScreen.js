import React, { useEffect } from 'react'
import { ListGroup, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from './CheckoutSteps'
import Message from '../Components/Message.js'
import './PlaceOrderScreen.css'
import BillingComponent from '../Components/BillingComponent'
import { orderCreator } from '../Actions/orderActions.js'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!cart.shippingAddress.address) {
    history.push('/shipping')
  } else if (!cart.paymentMethod) {
    history.push('/payment')
  }
  const login = useSelector((state) => state.login)
  const { userInfo } = login

  const orderCreated = useSelector((state) => state.orderCreated)
  const { order, success, error } = orderCreated

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (success) {
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, success, userInfo])

  const placeOrderHandler = () => {
    dispatch(
      orderCreator({
        orderItems: cart.cartItems,
        shop: cart.cartItems[0].shopId,
        shippingAddress: shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <div className='addressContainer'>
                Deliver To:{' '}
                <span className='postalAndName'>
                  {userInfo?.name}, {shippingAddress.postalCode}
                </span>
              </div>
              <p className='address'>
                {shippingAddress.address},
                {shippingAddress.landmark && shippingAddress.landmark + ','}{' '}
                {shippingAddress.city}, {shippingAddress.state},{' '}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <ListGroup className='my-4'>
            <ListGroup.Item>
              <h4 className='paymentHeader'>Payment Method:</h4>
              <strong>Method:</strong> {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 className='paymentHeader'>Order Items:</h4>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item) => (
                    <ListGroup.Item key={item.productId}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/${item.shopId}/product/${item.productId}`}
                            style={{ textDecoration: 'none' }}
                          >
                            {item.name}
                          </Link>
                          <p className='categoryStyle'>{item.category}</p>
                          <ListGroup horizontal>
                            <ListGroup.Item>Size: {item.size}</ListGroup.Item>
                            <ListGroup.Item>
                              Quantity: {item.quantity}
                            </ListGroup.Item>
                          </ListGroup>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x {item.price} = $
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <BillingComponent />
          {error && <Message variant='danger'>{error}</Message>}
          <Row className='justify-content-center'>
            <button
              className='orderBtn'
              disabled={cart.cartItems === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
