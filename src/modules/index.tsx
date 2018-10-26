import React from 'react'
export default class extends React.Component {
  public componentWillMount () {
    if (APP.homepage !== '/') {
      APP.history.push(APP.homepage)
    }
  }
  public render () {
    return (
      <div>
        首页
      </div>
    )
  }
}
