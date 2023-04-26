import React, { useState, useEffect } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import {
  ListGroup,
  Row,
  Col,
  Image,
  Card,
  Alert,
  Button,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message.js'
import Loader from '../Components/Loader.js'
import './PlaceOrderScreen.css'
import { getOrderDetails, payOrder } from '../Actions/orderActions.js'
import axios from 'axios'
import {
  ORDER_DETAILS_RESET,
  ORDER_PAY_RESET,
  ORDER_DELIVERED_RESET,
} from '../Constants/orderConstants.js'
import { deliverOrder } from '../Actions/orderActions.js'

const OrderScreen = ({ history, match }) => {
  const [sdkReady, setSdkReady] = useState(false)
  const dispatch = useDispatch()
  const orderId = match.params.id
  const login = useSelector((state) => state.login)
  const { userInfo } = login
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  if (!loading && !error) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    )
  }

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get(
        `/api/config/paypal/${orderId}`
      )
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVERED_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (order._id !== orderId) {
      dispatch({ type: ORDER_DETAILS_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [
    dispatch,
    match,
    orderId,
    successPay,
    successDeliver,
    order,
    history,
    userInfo,
  ])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h4>
        Order No.: <span>{order._id}</span>
      </h4>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <div className='addressContainer'>
                Deliver To:{' '}
                <span className='postalAndName'>
                  {order.user.name}, {order.shippingAddress.postalCode}
                </span>
              </div>
              <p className='address'>
                {order.shippingAddress.address},
                {order.shippingAddress.landmark &&
                  order.shippingAddress.landmark + ','}{' '}
                {order.shippingAddress.city}, {order.shippingAddress.state},{' '}
                {order.shippingAddress.country}
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
              <p className='my-0'>Method: {order.paymentMethod}</p>
              {order.isPaid ? (
                <p className='my-0'>
                  Payment Status:
                  <Alert variant='success'>
                    Paid on {order.paidAt.substring(0, 10)}
                  </Alert>
                </p>
              ) : (
                <p className='my-0'>
                  Payment Status: <span style={{ color: 'red' }}>Not paid</span>
                </p>
              )}
              {order.isDelivered ? (
                <p className='my-0'>
                  Delivery Status:
                  <Alert variant='success'>
                    Delivered on {order.deliveredAt.substring(0, 10)}
                  </Alert>
                </p>
              ) : (
                <p className='my-0'>
                  Delivery Status:{' '}
                  <span style={{ color: 'red' }}>Not Delivered</span>
                </p>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 className='paymentHeader'>Order Items:</h4>
              {order.orderItems.length === 0 || !order ? (
                <Message>Your Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems?.map((item) => (
                    <ListGroup.Item key={item._id}>
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
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  <Row>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </Row>
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo?.isSeller && order.isPaid && !order.isDelivered && (
                <ListGroup.Item className='d-grid gap-2'>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
