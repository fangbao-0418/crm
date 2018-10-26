import React from 'react'
import { userLogout } from '@/modules/common/api'
class Main extends React.Component {
  public componentWillMount () {
    userLogout()
    APP.user = undefined
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
