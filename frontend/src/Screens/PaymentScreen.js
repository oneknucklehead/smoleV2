import React, { useState, useEffect } from 'react'
import { Form, Container, Row, Col } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../Actions/cartActions.js'
import BillingComponent from '../Components/BillingComponent.js'
import CheckoutSteps from './CheckoutSteps.js'
import './PaymentScreen.css'
const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const login = useSelector((state) => state.login)
  const { userInfo } = login
  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [userInfo, history])

  return (
    <Container className='container'>
      <Row>
        <CheckoutSteps step1 step2 step3 />
      </Row>
      <Row>
        <Col md={6}>
          <h3>Payment options</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as='legend'>Select Method</Form.Label>
              <Col>
                <Form.Check
                  type='radio'
                  label='PayPal or Credit Card'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
                {/* <Form.Check
                  type='radio'
                  label='RazorPay'
                  id='RazorPay'
                  name='paymentMethod'
                  value='RazorPay'
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check> */}
              </Col>
            </Form.Group>
            <Row className='justify-content-center'>
              <button className='paymentBtn'>Continue</button>
            </Row>
          </Form>
        </Col>
        <Col></Col>
        <Col md={4}>
          <BillingComponent />
          <Row className='justify-content-center'>
            <button
              className='paymentBtn'
              onClick={submitHandler}
              style={{ width: '95%' }}
            >
              Continue
            </button>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default PaymentScreen
