import React from 'react'
import { mount, shallow } from 'enzyme'
import ShouldNotUpdate from './index'

describe('<ShouldNotUpdate />', () => {
  test('warns when rendered without children', () => {
    console.error = jest.fn()
    const rendered = shallow(<ShouldNotUpdate />)
    expect(console.error.mock.calls.length).toEqual(1)
    const regexp = /prop `children` is marked as required/
    expect(console.error.mock.calls[0][0]).toMatch(regexp)
  })

  test('renders as div element by default', () => {
    const rendered = shallow(<ShouldNotUpdate>wat</ShouldNotUpdate>)
    expect(rendered.find('div').length).toEqual(1)
  })

  test('renders as given tag name string', () => {
    const rendered = shallow(<ShouldNotUpdate component="footer">wat</ShouldNotUpdate>)
    expect(rendered.find('footer').length).toEqual(1)
  })

  test('renders as given react component types', () => {
    const Headline = ({ children }) => <h1>{children}</h1>
    const rendered = mount(<ShouldNotUpdate component={Headline}>wat</ShouldNotUpdate>)
    expect(rendered.find('h1').length).toEqual(1)
  })

  test('doesnt update child components on property change', () => {
    const fn = jest.fn()

    const InnerComponent = ({ name }) => {
      fn()
      return <div className={name} />
    }

    const UpdateChildren = ({ name }) => (
      <InnerComponent name={name} />
    )
    const DontUpdateChildren = ({ name }) => (
      <ShouldNotUpdate>
        <InnerComponent name={name} />
      </ShouldNotUpdate>
    )

    const rendered1 = mount(<DontUpdateChildren name="foo" />)
    const rendered2 = mount(<UpdateChildren name="foo" />)
    rendered1.setProps({ name: 'bar' })
    rendered2.setProps({ name: 'bar' })

    expect(fn.mock.calls.length).toEqual(3)
  })

  test('updates child components when given criteria matches', () => {
    const fn = jest.fn()

    const InnerComponent = ({ callback, name }) => {
      callback()
      return <div className={name} />
    }

    const SomeTimesUpdateChildren = ({ name }) => (
      <ShouldNotUpdate exceptWhen={name === 'bar'}>
        <InnerComponent name={name} callback={fn}/>
      </ShouldNotUpdate>
    )

    const rendered = mount(<SomeTimesUpdateChildren name="foo" />)
    rendered.setProps({ name: 'bar' })
    rendered.setProps({ name: 'baz' })

    expect(fn.mock.calls.length).toEqual(2)
  })
})
