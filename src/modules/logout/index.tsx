import React from 'react'
class Main extends React.Component {
  public componentWillMount () {
    APP.token = ''
    APP.history.push('/login')
  }
  public render () {
    return (
      <div></div>
    )
  }
}
export default Main
