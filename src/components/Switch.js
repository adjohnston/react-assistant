import React from 'react'
import PropTypes from 'prop-types'

const Switch = ({ children, isListening, actionHandler }) => {
  if (children)
    return children(isListening, actionHandler)

  return (
    <button
      onClick={actionHandler}>
      {isListening ? 'on' : 'off'}
    </button>
  )
}

Switch.propTypes = {
  isListening: PropTypes.bool,
  actionHandler: PropTypes.func,
  children: PropTypes.func
}

export default Switch
