import React, { Fragment, useEffect } from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  adminDeleteShop,
  listShops,
  productDelete,
} from '../Actions/shopActions.js'
import Loader from '../Components/Loader'
import Message from '../Components/Message.js'
import './AdminAllProductsScreen.css'

const AdminAllProducts = ({ history }) => {
  const dispatch = useDispatch()
  const shopList = useSelector((state) => state.shopList)
  const { loading, error, shops } = shopList

  const login = useSelector((state) => state.login)
  const { userInfo } = login

  const productDeleted = useSelector((state) => state.productDeleted)
  const {
    loading: loadingProduct,
    error: errorProduct,
    result: resultProduct,
  } = productDeleted
  const shopDeleted = useSelector((state) => state.shopDeleted)
  const {
    loading: loadingShop,
    error: errorShop,
    result: resultShop,
  } = shopDeleted

  const deleteProductHandler = (shopid, productid) => {
    if (window.confirm('are you sure you want to delete this product?')) {
      dispatch(productDelete(shopid, productid))
    }
  }
  const deleteShopHandler = (shopid) => {
    if (window.confirm('are you sure you want to delete this shop?')) {
      dispatch(adminDeleteShop(shopid))
    }
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listShops())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, resultProduct, resultShop])

  return (
    <>
      <Row>
        <Col>
          <h1>Shops</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              {loadingProduct && <Loader />}
              {loadingShop && <Loader />}
              {errorProduct && (
                <Message variant='danger'>{errorProduct}</Message>
              )}
              {errorShop && <Message variant='danger'>{errorShop}</Message>}
              {resultProduct && (
                <Message variant='success'>{resultProduct.message}</Message>
              )}
              {resultShop && (
                <Message variant='success'>{resultShop.message}</Message>
              )}
              {shops?.map((shop) => (
                <Fragment key={shop._id}>
                  <Row className='my-3'>
                    <Col>
                      <span>
                        <button
                          className='shopDelete'
                          onClick={() => deleteShopHandler(shop._id)}
                        >
                          ✕
                        </button>
                      </span>
                      <p className='shopHeader'>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/shop/${shop._id}`}
                        >
                          {shop.name}
                        </Link>
                      </p>
                    </Col>
                  </Row>
                  <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>BRAND</th>
                        <th>CATEGORY</th>
                        <th>PRICE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shop.products.map((product) => (
                        <tr key={product._id}>
                          <td>{product._id}</td>
                          <td>{product.name}</td>
                          <td>{product.brand}</td>
                          <td>{product.category}</td>
                          <td>{product.price}</td>
                          <td>
                            <button
                              className='deleteBtn'
                              onClick={() =>
                                deleteProductHandler(shop._id, product._id)
                              }
                            >
                              <i className='fas fa-trash'></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Fragment>
              ))}
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default AdminAllProducts
