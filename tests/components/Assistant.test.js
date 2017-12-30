import React from 'react'
import renderer from 'react-test-renderer'
import Assistant from 'src/components/Assistant'
import Switch from 'src/components/Switch'

const mockProps = {
  actions: [{
    test: () => console.log('Just a test')
  }]
}

test('it should render null given no SpeechRecognition API', () => {
  const tree = renderer
    .create(<Assistant {...mockProps} />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})

test('it should render null given no children', () => {
  window.SpeechRecognition = jest.fn()

  const tree = renderer
    .create(<Assistant {...mockProps} />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})

test('it should render correctly with a default Switch component', () => {
  window.SpeechRecognition = jest.fn()

  const Component = (
    <Assistant {...mockProps}>
      <Switch />
    </Assistant>
  )

  const tree = renderer
    .create(Component)
    .toJSON()

  expect(tree).toMatchSnapshot()
})

test('it should render correctly with a custom Switch component', () => {
  window.SpeechRecognition = jest.fn()

  const Component = (
    <Assistant {...mockProps}>
      <Switch>
        {(isListening, actionHandler) => (
          <div
            onClick={actionHandler}>
            {isListening ? `I'm listening...` : `I'm not listening`}
          </div>
        )}
      </Switch>
    </Assistant>
  )

  const tree = renderer
    .create(Component)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
