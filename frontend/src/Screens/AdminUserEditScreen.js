import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message.js'
import Loader from '../Components/Loader.js'
import FormContainer from '../Components/FormContainer.js'
import { userDetails, userDetailsUpdateAdmin } from '../Actions/userActions.js'

const AdminUserEditScreen = ({ match, history }) => {
  const [isSeller, setIsSeller] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()
  const login = useSelector((state) => state.login)
  const { userInfo } = login

  const details = useSelector((state) => state.details)
  const { loading, error, user } = details
  const adminUserUpdate = useSelector((state) => state.adminUserUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = adminUserUpdate

  const adminUpdateHandler = (e) => {
    e.preventDefault()
    dispatch(
      userDetailsUpdateAdmin({
        _id: match.params.id,
        name: user.name,
        email: user.email,
        isSeller,
        isAdmin,
      })
    )
  }
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (successUpdate) {
      history.push('/admin/userlist')
    } else {
      if (!user || !user.name || user._id !== match.params.id) {
        dispatch(userDetails(match.params.id))
      } else {
        setIsSeller(user.isSeller)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, history, userInfo, match, user, successUpdate])
  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={adminUpdateHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={user.name}
                disabled={true}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={user.email}
                disabled={true}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Seller'
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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
export default AdminUserEditScreen
