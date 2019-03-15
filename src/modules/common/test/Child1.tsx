import React from 'react'
import Child11 from './Child11'
class Main extends React.Component {
  public text = 'child1'
  public componentDidMount () {
    this.text = 'child11'
  }
  public componentWillReceiveProps () {
    console.log('child1 will receive')
  }
  public componentWillUpdate () {
    console.log('child1 will update')
  }
  public componentDidUpdate () {
    console.log('child1 didupdate')
  }
  public render () {
    console.log('child1 render')
    return (
      <div style={{background: 'red', padding: 20}}>
        <div>
          {this.text}
          <button
            onClick={() => {
              this.forceUpdate()
            }}
          >
            force update
          </button>
        </div>
        <Child11 />
      </div>
    )
  }
}
export default Main
