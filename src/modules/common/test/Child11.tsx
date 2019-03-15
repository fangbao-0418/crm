import React from 'react'
class Main extends React.Component {
  public text = 'child1-son'
  public componentDidMount () {
    this.text = 'child1-son'
  }
  public componentWillReceiveProps () {
    console.log('child1-son will receive')
  }
  public componentWillUpdate () {
    console.log('child1-son will update')
  }
  public componentDidUpdate () {
    console.log('child1-son did update')
  }
  public render () {
    console.log('child1-son render')
    return (
      <div style={{background: 'yellow'}}>
        {this.text}
        <button
          onClick={() => {
            this.forceUpdate()
          }}
        >
          force update
        </button>
      </div>
    )
  }
}
export default Main
