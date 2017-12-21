import React from 'react'
import PropTypes from 'prop-types'

const Switch = ({ children, isListening, clickHandler }) => {
  if (children)
    return children(isListening, clickHandler)

  return (
    <button
      onClick={clickHandler}>
      {isListening ? 'on' : 'off'}
    </button>
  )
}

Switch.propTypes = {
  isListening: PropTypes.bool,
  clickHandler: PropTypes.func,
  children: PropTypes.func
}

export default Switch
