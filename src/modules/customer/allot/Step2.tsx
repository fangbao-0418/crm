import React from 'react'
import AllotResult from '../AllotResult'
interface Props {
  onCancel?: () => void
  deleteCustomer?: () => void
}
class Main extends React.Component<Props> {
  public render () {
    return (
      <div className='mt40'>
        <AllotResult onCancel={this.props.onCancel} deleteCustomer={this.props.deleteCustomer}/>
      </div>
    )
  }
}
export default Main
