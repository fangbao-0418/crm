import React, { Component } from 'react'

class Bundle extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      mod: null
    }
    this.isDestroy = false
  }
  componentWillMount () {
    this.load(this.props)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }
  componentWillUnmount () {
    this.isDestroy = true
  }
  load (props) {
    if (this.isDestroy) {
      return
    }
    this.setState({
      mod: null
    })
    props.load((mod) => {
      if (this.isDestroy) {
        return
      }
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render () {
    try {
      return this.state.mod ? this.props.children(this.state.mod) : null
    } catch (e) {
      console.log(e)
    }
  }
}
export default Bundle
