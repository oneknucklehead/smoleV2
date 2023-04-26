import React, { useEffect } from 'react'
import { Col, ListGroup, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../Components/Loader.js'
import Message from '../Components/Message.js'
import './ProfileScreen.css'
import { listUserOrders } from '../Actions/orderActions.js'

const OrdersListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const userOrdersList = useSelector((state) => state.userOrdersList)
  const { loading, error, orders } = userOrdersList

  const login = useSelector((state) => state.login)
  const { userInfo } = login

  const details = useSelector((state) => state.details)
  const { user } = details

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listUserOrders())
    }
  }, [dispatch, history, userInfo, user])
  return (
    <>
      <Row>
        <Col md={3}>
          <ListGroup>
            <Link to='/profile' className='link'>
              <ListGroup.Item action>Profile</ListGroup.Item>
            </Link>
            <Link to='/myorders' className='link'>
              <ListGroup.Item action>Orders</ListGroup.Item>
            </Link>
          </ListGroup>
        </Col>
        {loading ? (
          <Loader />
        ) : (
          <Col md={9}>
            <h3
              style={{
                textAlign: 'center',
                fontSize: '2em',
                letterSpacing: '-1px',
                backgroundColor: '#b87c9b',
                color: 'white',
              }}
              className='my-4'
            >
              Orders
            </h3>

            {error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <Table striped bordered responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>DETAILS</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <p className='my-0'>
                          Order ID: #
                          <Link to={`/order/${order._id}`}>{order._id}</Link>
                        </p>
                        <p className='my-0'>
                          Order Date: {order.createdAt.substring(0, 10)}
                        </p>
                        <p className='my-0'>Items: {order.orderItems.length}</p>
                        <p>Total Price: {order.totalPrice}</p>
                      </td>
                      <td>
                        {order.isPaid ? order.paidAt.substring(0, 10) : '❌'}
                      </td>
                      <td>
                        {order.isDelivered
                          ? order.deliveredAt.substring(0, 10)
                          : '❌'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        )}
      </Row>
    </>
  )
}

export default OrdersListScreen
