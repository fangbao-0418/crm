import React from 'react'
import Cloud from './Cloud'
import Mobile from './Mobile'
interface Props {
  phone: string
  name: string
  detail: Customer.DetailProps
  style?: React.CSSProperties
  canCall?: boolean
}
class Main extends React.Component<Props> {
  public render () {
    const node: any = {
      0: null,
      1: <Cloud {...this.props} />,
      2: null,
      3: <Mobile {...this.props} />
    }
    return (
      node[APP.user.tqType || 0]
    )
  }
}
export default Main
