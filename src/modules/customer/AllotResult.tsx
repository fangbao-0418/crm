import React from 'react'
import { Button } from 'antd'
const styles = require('./style')
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
    console.log(this.props)
    const result = Object.assign({}, {
      exists: []
    }, this.props.resultData)
    return (
      <div className={styles.content}>
        <div>应分配{result.total}条，已分配{result.allocatedNum}条，{result.exists.length}条公司信息已经存在</div>
        {
          result.exists.length < 9 && result.exists.map((item) => {
            return (
              <div key={item.id}>{item.name}：已经存在！</div>
            )
          })
        }
        <div className={styles.info}>是否删除已重复客户?</div>
        <div className='fr'>
          <Button type='primary' className='mr5' onClick={this.props.deleteCustomer}>删除</Button>
          <Button onClick={this.props.onCancel}>取消</Button>
        </div>
      </div>
    )
  }
}
export default Main
