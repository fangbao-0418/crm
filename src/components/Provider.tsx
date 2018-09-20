import React from 'react'
import { Provider } from 'react-redux'
import store from '@/store'
class Main extends React.Component {
  public render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}
export default Main
