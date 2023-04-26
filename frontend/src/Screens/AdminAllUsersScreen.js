import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message.js'
import Loader from '../Components/Loader.js'
import { listUsers, userDeleteAdmin } from '../Actions/userActions.js'
import './AdminAllUsersScreen.css'

const AdminAllUsersScreen = ({ history }) => {
  const dispatch = useDispatch()
  const login = useSelector((state) => state.login)
  const { userInfo } = login

  const usersList = useSelector((state) => state.usersList)
  const { loading, error, users } = usersList

  const adminUserDelete = useSelector((state) => state.adminUserDelete)
  const { success } = adminUserDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, success])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(userDeleteAdmin(id))
    }
    //DELETE THE USER
  }

  return (
    <>
      <Row>
        <Col>
          <h1>Users</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>SELLER</th>
                  <th>ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>{user.isSeller ? '✔️' : '❌'}</td>
                    <td>{user.isAdmin ? '✔️' : '❌'}</td>
                    <td>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <button className='editBtn'>
                          <i className='fas fa-edit'></i>
                        </button>
                      </LinkContainer>
                      <button
                        className='deleteBtn'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  )
}
export default AdminAllUsersScreen
