export default function setup(SpeechRecognition) {
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
