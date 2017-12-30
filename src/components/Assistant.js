import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import setup from 'src/helpers/setup'

export default class Assistant extends Component {
  SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  state = {
    isListening: false
  }

  toggle = () => {
    this.setState(state => {
      return {
        isListening: !state.isListening
      }
    })
  }

  componentDidMount() {
    setup.call(this)
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

    if (!this.SpeechRecognition)
      return null

    if (Children.count(children) === 0)
      return null

    return Children.map(children, child => {
      switch (child.type.name) {
        case 'Switch':
          return cloneElement(child, {
            isListening,
            actionHandler: this.toggle
          })

        case 'StatusBar':
          return cloneElement(child, { isListening })

        default:
          return child
      }
    })
  }
}

Assistant.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired
}
