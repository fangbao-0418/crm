import React from 'react'
import Card from '@/components/Card'
import Storage from './Storage'
import Assign from './Assign'
import Call from './Call'
const styles = require('./style')
interface Props {
  record?: Setting.ItemProps
  selectedRowKeys?: string[]
}
class Main extends React.Component<Props> {
  public render () {
    return (
      <div className={styles.pannel}>
        <Storage record={this.props.record} selectedRowKeys={this.props.selectedRowKeys}/>
        <Assign record={this.props.record} selectedRowKeys={this.props.selectedRowKeys}/>
        {
          !this.props.selectedRowKeys &&
          <Call record={this.props.record}/>
        }
      </div>
    )
  }
}
export default Main
