import React from 'react'
import { Button } from 'antd'
const styles = require('./style')
interface Props {
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
          resuleData.customerNames.length > 8 &&
          <span>...</span>
        }
      </div>
    )
  }
}
export default Main
