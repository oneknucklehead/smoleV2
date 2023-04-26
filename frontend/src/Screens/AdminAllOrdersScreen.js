import React, { useEffect } from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listAdminOrders } from '../Actions/orderActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message.js'

const AdminAllOrdersScreen = ({ history }) => {
  const dispatch = useDispatch()

  const login = useSelector((state) => state.login)
  const { userInfo } = login

  const adminOrderList = useSelector((state) => state.adminOrderList)
  const { loading, error, orders } = adminOrderList

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAdminOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, userInfo, history])
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'}>{error}</Message>
      ) : (
        <Row>
          <Col>
            <h1>All Orders</h1>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>SHOP</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <Link to={`/order/${order._id}`}>{order._id}</Link>
                    </td>
                    <td>{order.user && order.user.name}</td>
                    <td>
                      <Link to={`/shop/${order.shop._id}`}>
                        {order.shop && order.shop.name}
                      </Link>
                    </td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </>
  )
}

export default AdminAllOrdersScreen
