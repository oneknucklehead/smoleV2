import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { BiErrorCircle } from 'react-icons/bi'

const Message = ({ variant, color, children }) => {
  const [show, setShow] = useState(true)
  if (show) {
    return (
      <Alert
        variant={variant}
        style={{ color: `${color}` }}
        onClose={() => setShow(false)}
      >
        <span style={{ margin: '0 10px 0 0', color: `${color}` }}>
          <BiErrorCircle />
        </span>
        {children}
      </Alert>
    )
  } else {
    return <></>
  }
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
