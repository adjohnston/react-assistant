import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'

export default class Assistant extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isListening: false
    }
  }

  toggleListening = () => {
    this.setState(state => {
      return {
        isListening: !state.isListening
      }
    })
  }

  componentDidUpdate() {
    if (this.state.isListening) {
      this.recognition.start()
    } else {
      this.recognition.stop()
    }
  }

  render() {
    const isListening = this.state.isListening
    const children = this.props.children

    return Children.map(children, child => {
      if (child.type.name === 'Switch')
        return cloneElement(child, {
          isListening,
          clickHandler: this.toggleListening
        })

      return child
    })
  }
}

Assistant.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired
}
