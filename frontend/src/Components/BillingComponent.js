import React from 'react'
import { Card, ListGroup, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const BillingComponent = () => {
  const cart = useSelector((state) => state.cart)

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 999 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  )
  return (
    <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2 style={{ textAlign: 'center' }}>Order Summary</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Items</Col>
            <Col>${cart.itemsPrice}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Shipping</Col>
            <Col>${cart.shippingPrice}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Tax</Col>
            <Col>${cart.taxPrice}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Total</Col>
            <Col>${cart.totalPrice}</Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default BillingComponent
