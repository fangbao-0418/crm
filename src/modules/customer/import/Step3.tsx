import React from 'react'
import Result from '../Result'
interface Props {
  isBussiness?: boolean
  resuleData?: {
    step2: {
      customerIds: []
      customerNames: []
      imported: number
      repeated: number
      total: number
    }
  }
  onCancel?: () => void
}
class Main extends React.Component<Props> {
  public componentWillMount () {
    console.log(this.props.resuleData, 'step3')
  }
  public render () {
    return (
      <div className='mt40'>
       <Result onCancel={this.props.onCancel} isBussiness={this.props.isBussiness} resuleData={this.props.resuleData}/>
      </div>
    )
  }
}
export default Main
