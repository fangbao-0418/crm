import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
const styles = require('./style')
interface Props extends Customer.Props {
  onCancel?: () => void
  deleteCustomer?: () => void
}
class Main extends React.Component<Props> {
  public render () {
    console.log(this.props)
    const result = this.props.assignResult
    return (
      <div className={styles.content}>
        <div>应分配{result.total}条，已分配{result.allocatedNum}条，{result.exists.length}条公司信息已经存在</div>
        {
          result.exists.map((item, index) => {
            if (index > 7) {
              return
            } else {
              return (
                <div key={item.id}>{item.name}：已经存在！</div>
              )
            }
          })
        }
        {
          result.exists.length > 8 &&
          <span>...</span>
        }
        {
          result.exists.length > 0 &&
          <div>
            <div className={styles.info}>是否删除已重复客户?</div>
            <div className='fr'>
              <Button type='primary' className='mr5' onClick={this.props.deleteCustomer}>删除</Button>
              <Button onClick={this.props.onCancel}>取消</Button>
            </div>
          </div>
        }
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Main)
