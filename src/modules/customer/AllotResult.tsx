import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
const styles = require('./style')
interface Props extends Customer.Props {
  onCancel?: () => void
  deleteCus?: () => void
}
class Main extends React.Component<Props> {
  public render () {
    console.log(this.props)
    const result = this.props.assignResult
    const successCustomers = APP.fn.objectToArray(result.successCustomers)
    // console.log(APP.fn.objectToArray(successCustomers), 'APP.fn.objectToArray')
    return (
      <div className={styles.content}>
        <div>应分配{result.total}条，已分配{result.allocatedNum}条，</div>
        {
          result.successCustomers && successCustomers.map((item, index) => {
            return (
              <div key={item.key}>
                <span>{item.key}分配{item.value}条；</span>
              </div>
            )
          })
        }
        <div>{result.repeatCustomers.length}条公司信息已经存在</div>
        {
          result.repeatCustomers.map((item, index) => {
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
          result.repeatCustomers.length > 8 &&
          <span>...</span>
        }
        {
          result.repeatCustomers.length > 0 &&
          <div>
            <div className={styles.info}>是否删除已重复客户?</div>
            <div className='fr'>
              <Button onClick={this.props.onCancel}>取消</Button>
              <Button type='primary' className='mr5' onClick={this.props.deleteCus}>删除</Button>
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
