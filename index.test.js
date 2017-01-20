import React from 'react'
import { mount, shallow } from 'enzyme'
import ShouldNotUpdate from './index'

describe('ShouldNotUpdate HOC', () => {
  let InnerComponent
  let fn

  beforeEach(() => {
    fn = jest.fn()

    InnerComponent = ({ name }) => {
      fn()
      return <div className={name} />
    }
  })

  test('not enhanced component should update on prop change', () => {
    const rendered = mount(<InnerComponent name="foo" />)
    expect(fn.mock.calls.length).toEqual(1)

    rendered.setProps({ name: 'bar' })
    expect(fn.mock.calls.length).toEqual(2)
  })

  test('enhanced component should not update on prop change', () => {
    const ShouldNotUpdateInnerComponent = ShouldNotUpdate(InnerComponent)
    const rendered = mount(<ShouldNotUpdateInnerComponent name="foo" />)
    expect(fn.mock.calls.length).toEqual(1)

    rendered.setProps({ name: 'bar' })
    expect(fn.mock.calls.length).toEqual(1)
  })

  test('enhanced component should update when `exceptWhen` returns true', () => {
    const ShouldNotUpdateInnerComponent = ShouldNotUpdate(InnerComponent, (nextProps) => nextProps.name === 'bar')
    const rendered = mount(<ShouldNotUpdateInnerComponent name="foo" />)
    expect(fn.mock.calls.length).toEqual(1)

    rendered.setProps({ name: 'bar' })
    expect(fn.mock.calls.length).toEqual(2)
  })
})
