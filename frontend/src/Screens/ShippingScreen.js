import React, { useEffect, useState } from 'react'
import { Form, Container, Row, Col } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import './ShippingScreen.css'
import { saveShippingAddress } from '../Actions/cartActions.js'
import CheckoutSteps from './CheckoutSteps.js'
import BillingComponent from '../Components/BillingComponent'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const login = useSelector((state) => state.login)
  const { userInfo } = login

  const [address, setAddress] = useState(shippingAddress?.address)
  const [city, setCity] = useState(shippingAddress?.city)
  const [state, setState] = useState(shippingAddress?.state)
  const [landmark, setLandmark] = useState(shippingAddress?.landmark)
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode)
  const [country, setCountry] = useState(shippingAddress?.country)
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      saveShippingAddress({
        address,
        city,
        state,
        landmark,
        postalCode,
        country,
      })
    )
    history.push('/payment')
  }
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [userInfo, history])

  return (
    <Container className='container'>
      <Row>
        <CheckoutSteps step1 step2 />
      </Row>
      <Row>
        <Col md={7}>
          <h3>Delivery To</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='House no., Building Name, Street name, Area*'
                value={address}
                style={{ borderRadius: '5px' }}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='landmark'>
              <Form.Label>Landmark</Form.Label>
              <Form.Control
                type='text'
                placeholder='landmark'
                value={landmark}
                style={{ borderRadius: '5px' }}
                onChange={(e) => setLandmark(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId='postalCode'>
                  <Form.Label>Postal code</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Postal code*'
                    value={postalCode}
                    style={{ borderRadius: '5px' }}
                    onChange={(e) => setPostalCode(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='city'>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='City*'
                    value={city}
                    style={{ borderRadius: '5px' }}
                    onChange={(e) => setCity(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId='State'>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='State*'
                    value={state}
                    style={{ borderRadius: '5px' }}
                    onChange={(e) => setState(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='Country'>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Country*'
                    value={country}
                    style={{ borderRadius: '5px' }}
                    onChange={(e) => setCountry(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className='justify-content-center'>
              <button className='saveBtn'>Continue to payment</button>
            </Row>
          </Form>
        </Col>
        <Col></Col>
        <Col md={4}>
          <BillingComponent />
          <Row className='justify-content-center'>
            <button
              className='saveBtn'
              style={{ width: '95%' }}
              onClick={submitHandler}
            >
              Continue to payment
            </button>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default ShippingScreen
