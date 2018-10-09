import React from 'react'
import { Button } from 'antd'
const styles = require('./style')
interface Props {
  isBussiness?: boolean
  resuleData?: {
    customerIds: []
    customerNames: []
    imported: number
    repeated: number
    total: number
  }
  onCancel?: () => void
}
class Main extends React.Component<Props> {
  public render () {
    return (
      <div className={styles.content}>
        <div>
          应导入{this.props.resuleData.total}条，
          实际导入{this.props.resuleData.imported}条，
          {
            !this.props.isBussiness &&
            <span>已分配80条，</span>
          }
          {this.props.resuleData.repeated}条公司信息已经存在
        </div>
        {
          this.props.resuleData.customerNames.map((item, index) => {
            if (index > 8) {
              return false
            }
            return (
              <div key={index}>{item}：已经存在！</div>
            )
          })
        }
        {
          !this.props.isBussiness &&
          <div>
            <div className={styles.info}>是否删除已重复客户?</div>
            <div className='fr'>
              <Button type='primary' className='mr10'>删除</Button>
              <Button onClick={this.props.onCancel}>取消</Button>
            </div>
          </div>
        }
      </div>
    )
  }
}
export default Main
