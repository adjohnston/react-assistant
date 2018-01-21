import React from 'react'
import renderer from 'react-test-renderer'
import Assistant from 'src/components/Assistant'
import Switch from 'src/components/Switch'

const mockProps = {
  actions: [{
    test: () => console.log('Just a test')
  }]
}

beforeAll(() => {
  window.SpeechRecognition = () => ({
    start: () => {},
    stop: () => {}
  })
})

afterAll(() => {
  window.SpeechRecognition = null
})

test('it should render null given no SpeechRecognition API', () => {
  const tree = renderer
    .create(<Assistant {...mockProps} />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})

test('it should render null given no children', () => {
  const tree = renderer
    .create(<Assistant {...mockProps} />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})

test('it should render correctly with a default Switch component', () => {
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

test('clicking the button should change the state of the button from off to on', () => {
  const Component = (
    <Assistant {...mockProps}>
      <Switch />
    </Assistant>
  )

  const component = renderer
    .create(Component)

  component
    .getInstance()
    .toggle()

  const tree = component
    .toJSON()

  expect(tree).toMatchSnapshot()
})

test('it should render correctly with a custom Switch component', () => {
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
