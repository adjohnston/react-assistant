import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

export default class Assistant extends Component {
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

  init = () => {
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition()

      this.recognition.onend = () => {
        if (this.state.isListening)
          this.recognition.start()
      }

      this.recognition.onresult = event => {
        const {
          transcript
        } = event.results[0][0]

        if (event.results[0].isFinal) {
          this.props.actions.forEach(action => {
            const identifier = Object.keys(action)[0]

            transcript.includes(identifier)
              ? action[identifier].call(this, event)
              : null
          })
        }
      }
    }
  }

  componentDidMount() {
    this.init()
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

    if (!SpeechRecognition)
      return null

    return Children.map(children, child => {
      switch (child.type.name) {
        case 'Switch':
          return cloneElement(child, {
            isListening,
            clickHandler: this.toggle
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
