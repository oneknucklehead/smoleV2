import React, { useEffect } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import './HomeScreen.css'
import { listShops } from '../Actions/shopActions.js'
import Message from '../Components/Message'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const shopList = useSelector((state) => state.shopList)
  const { loading, error, shops } = shopList
  useEffect(() => {
    dispatch(listShops())
  }, [dispatch])

  return (
    <>
      <h1
        style={{
          textAlign: 'center',
          fontSize: '4.5em',
          letterSpacing: '-1px',
          backgroundColor: '#ed2d2f',
          color: 'white',
        }}
      >
        Shops
      </h1>
      {loading ? (
        <div className='loader'>
          <Loader />
        </div>
      ) : error ? (
        <Message variant='warning' color='red'>
          {error}
        </Message>
      ) : (
        <Row>
          {shops.map((shop) => (
            <Col key={shop._id} sm={12} md={6} lg={3} xl={3} className='my-2 '>
              <Card>
                <Link to={`/shop/${shop._id}`} className='cardShop'>
                  <div className='cardOverlay'>
                    <div className='cardHeader'>
                      <svg
                        className='cardArc'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path />
                      </svg>
                      <div className='cardHeaderText'>
                        <h3 className='cardTitle'>{shop.name}</h3>
                        <span className='cardTagline'>{shop.tagline}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
