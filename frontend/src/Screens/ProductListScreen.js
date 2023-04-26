import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../Components/Product'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { shopDetail } from '../Actions/shopActions.js'

const ProductListScreen = ({ match }) => {
  const dispatch = useDispatch()

  const shopDetails = useSelector((state) => state.shopDetails)
  const { loading, error, shop } = shopDetails

  useEffect(() => {
    dispatch(shopDetail(match.params.shopid))
  }, [dispatch, match])

  if (loading) {
    return (
      <div className='loader'>
        <Loader />
      </div>
    )
  }

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      <h3
        style={{
          textAlign: 'center',
          fontSize: '4.5em',
          letterSpacing: '-1px',
          backgroundColor: '#ed2d2f',
          color: 'white',
        }}
      >
        {shop.name} Products
      </h3>
      {error ? (
        <Message variant='warning' color='red'>
          {error}
        </Message>
      ) : (
        <Row>
          {shop &&
            shop.products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} shopId={shop._id} />
              </Col>
            ))}
        </Row>
      )}
    </>
  )
}

export default ProductListScreen
