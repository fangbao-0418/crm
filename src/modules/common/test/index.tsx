import React from 'react'
import Child1 from './Child1'
import Child2 from './Child2'
class Main extends React.Component {
  public render () {
    return (
      <div>
        <button
          onClick={() => {
            this.forceUpdate()
          }}
        >
          force update
        </button>
        <Child1 />
        <Child2 />
      </div>
    )
  }
}
export default Main
