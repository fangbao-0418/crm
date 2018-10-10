import React from 'react'
import { Button } from 'antd'
const styles = require('./style')
interface Props {
  isBussiness?: boolean
  resuleData?: {
    step2?: {
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
    console.log(this.props.resuleData, 'this.props.resuleData')
  }
  public render () {
    const resuleData = this.props.resuleData.step2
    return (
      <div className={styles.content}>
        <div>
          应导入{resuleData.total}条，
          实际导入{resuleData.imported}条，
          {/* 我的客资&&选择了分配 两个条件显示已分配数 */}
          {
            !this.props.isBussiness &&
            <span>已分配80条，</span>
          }
          {resuleData.repeated}条公司信息已经存在
        </div>
        {
          resuleData.customerNames.map((item, index) => {
            if (index > 7) {
              return
            } else {
              return (
                <div key={index}>{item}：已经存在！</div>
              )
            }
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
