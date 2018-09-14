/* global describe:false, it:false expect:false */
import React from 'react'
import sinon from 'sinon'
import { render, shallow, mount } from 'enzyme'
class Demo extends React.Component {
  constructor () {
    super()
    this.state = {
      name: 'jasmine'
    }
  }
  componentDidMount () {
    $(this.refs.demo).hover(() => {
      this.setState({
        name: 'hover'
      })
    })
  }
  toClick () {
    console.log('click')
    this.setState({
      name: 'sinon'
    })
  }
  render () {
    return (
      <div>
        <button onClick={this.toClick.bind(this)} ref='demo'>
          {this.state.name}
        </button>
      </div>
    )
  }
}
function Bar1 () {
  return (
    <div>
      <div className="in-bar1" />
    </div>
  )
}
function Bar () {
  return (
    <div>
      <div className="in-bar">
        <Bar1 />
      </div>
    </div>
  )
}
function Foo () {
  return (
    <div>
      <Bar />
    </div>
  )
}
describe('test demo', () => {
  it('test demo component', (done) => {
    const wrapper = mount(<Demo foo={3} />)
    expect(wrapper.find({ foo: 4 }).length).toBeFalsy()
    expect(wrapper.text()).toBe('jasmine')
    expect(wrapper.find('button').length).toBe(1)
    $(wrapper.find('button').getDOMNode()).trigger('mouseover')
    expect(wrapper.state('name')).toBe('hover')
    setTimeout(() => {
      wrapper.setState({
        name: 'test'
      })
      console.log(wrapper.state(), 'settimeout')
      expect(wrapper.state('name')).toBe('test')
      done()
    }, 300)
  })
  it('test shallow', () => {
    const foo = shallow(<Foo />)
    expect(foo.find('.in-bar').length).toBe(0)
  })
  it('test shallow children', () => {
    const foo = shallow(<Foo />)
    console.log(foo.find('Bar'), foo.find(Bar), 'Bar')
    expect(foo.find('Bar').dive().find('.in-bar').length).toBe(1)
    expect(foo.find('Bar').dive().find('Bar1').dive().find('.in-bar1').length).toBe(1)
  })
  it('test mount', () => {
    const foo = mount(<Foo />)
    expect(foo.find('.in-bar').length).toBe(1)
  })
})
