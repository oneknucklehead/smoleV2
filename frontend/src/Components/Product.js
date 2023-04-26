import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Product.css'

const Product = ({ product, shopId }) => {
  return (
    <Card className='my-3 productCard'>
      <Link to={`/${shopId}/product/${product._id}`}>
        <div className='productCard'>
          <img
            src={product.image}
            className='productImage'
            alt={product.name}
          ></img>
        </div>
        <Card.ImgOverlay>
          <span
            style={{
              background: '#ffffff9a',
              borderRadius: '5px',
              fontSize: '12px',
            }}
            className='p-1'
          >
            {product.rating}⭐| {product.numReviews}
          </span>
        </Card.ImgOverlay>
      </Link>

      <Card.Body>
        <Link
          to={`/${shopId}/product/${product._id}`}
          style={{ textDecoration: 'none' }}
        >
          <Card.Title
            as='div'
            className='m-0 p-0'
            style={{ fontSize: '16px', fontWeight: '900' }}
          >
            {product.name}
          </Card.Title>
        </Link>
        <hr className='my-2' />
        {/* <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          ></Rating>
        </Card.Text> */}
        <Card.Text
          as='p'
          className='m-0 p-0'
          style={{ fontSize: '15px', fontWeight: '900', color: '#939598' }}
        >
          {product.category}
        </Card.Text>
        <Card.Text as='p' className='m-0 p-0' style={{ color: '#58595B' }}>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
