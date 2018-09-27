import React from 'react'
import AllotResult from '../AllotResult'
interface Props {
  resultData?: {
    allocatedNum?: number
    total?: number
    exists?: Array<{
      name?: string
      id?: string
    }>
  }
  onCancel?: () => void
  deleteCustomer?: () => void
}
class Main extends React.Component<Props> {
  public render () {
    return (
      <div className='mt40'>
        <AllotResult onCancel={this.props.onCancel} resultData={this.props.resultData} deleteCustomer={this.props.deleteCustomer}/>
      </div>
    )
  }
}
export default Main
