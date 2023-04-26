import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message.js'
import Loader from '../Components/Loader.js'
import FormContainer from '../Components/FormContainer.js'
import { userLogin } from '../Actions/userActions.js'
import './LoginScreen.css'

const LoginScreen = ({ history, location }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const login = useSelector((state) => state.login)
  const { loading, error, userInfo } = login

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const loginHandler = (e) => {
    e.preventDefault()
    // console.log(email + ' ' + password)
    dispatch(userLogin({ email, password }))
  }
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, redirect, userInfo])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer>
          <div className='formContainer'>
            <p className='header'>Login with Smole</p>
            {error && <Message variant='danger'>{error}</Message>}
            <Row className='navContainer'>
              <NavLink
                to='/login'
                className={(isActive) =>
                  isActive ? 'navLink selectedLogin' : 'navLink'
                }
              >
                Login
              </NavLink>
              <NavLink
                to='/register'
                className={(isActive) =>
                  isActive ? 'navLink selectedRegister' : 'navLink'
                }
              >
                Register
              </NavLink>
            </Row>
            <Row className='infoContainer'>
              <Form onSubmit={loginHandler}>
                <Form.Group controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email*'
                    value={email}
                    style={{ borderRadius: '5px' }}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                  <Form.Label className='my-3'>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter password*'
                    value={password}
                    style={{ borderRadius: '5px' }}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Row>
                  <Col className='d-grid my-4'>
                    <button className='loginButton'>Proceed</button>
                  </Col>
                </Row>
              </Form>
              <Row style={{ textAlign: 'center' }}>
                <Col>
                  New user?{' '}
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : '/register'
                    }
                  >
                    Create account
                  </Link>
                </Col>
              </Row>
            </Row>
          </div>
        </FormContainer>
      )}
    </>
  )
}
export default LoginScreen
