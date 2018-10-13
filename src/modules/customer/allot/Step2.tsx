import React from 'react'
import AllotResult from '../AllotResult'
interface Props {
  onCancel?: () => void
  deleteCus?: () => void
}
class Main extends React.Component<Props> {
  public render () {
    return (
      <div className='mt40'>
        <AllotResult onCancel={this.props.onCancel} deleteCus={this.props.deleteCus}/>
      </div>
    )
  }
}
export default Main
