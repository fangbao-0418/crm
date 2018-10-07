import React from 'react'
import Result from '../Result'
interface Props {
  isBussiness?: boolean
  onCancel?: () => void
}
class Main extends React.Component<Props> {
  public render () {
    return (
      <div className='mt40'>
       <Result onCancel={this.props.onCancel} isBussiness={this.props.isBussiness}/>
      </div>
    )
  }
}
export default Main
