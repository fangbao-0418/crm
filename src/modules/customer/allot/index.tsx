import React from 'react'
import ImportSteps from '@/modules/common/allot-steps'
import Step1 from './Step1'
import Step2 from './Step2'
import _ from 'lodash'
import { allotCustomer, deleteCustomer } from '../api'
interface Props {
  selectAll: boolean
  selectedRowKeys: string[]
  params: any
  onClose?: () => void
}
class Main extends React.Component<Props> {
  public state = {
    step: 1,
    resultData: {}
  }
  public config = [
    {
      title: '1、导入设置',
      component: (
        <Step1
          onOk={(value) => {
            console.log(value, 'value')
            if (this.props.selectAll) {
              value.checkAllParam = this.props.params
              value.customerIds = []
            } else {
              value.customerIds = this.props.selectedRowKeys
            }
            allotCustomer(value).then((res: any) => {
              APP.dispatch({
                type: 'change customer data',
                payload: {
                  assignResult: res
                }
              })
            })
          }}
        />
      )
    },
    {
      title: '2、执行结果',
      component: (
        <Step2
          onCancel={() => {
            if (this.props.onClose) {
              this.props.onClose()
            }
          }}
          deleteCustomer={() => {
            console.log(this.state.resultData, 'resultData')
            let result = [{name: '111', id: '1000111118'}]
            let ids: string[] = []
            result.map((item) => {
              ids.push(item.id)
            })
            const payload = ids.join(',')
            deleteCustomer(payload).then((res) => {
              if (res.status) {
                console.log('aa')
              }
            })
          }}
        />
      )
    }
  ]
  public render () {
    console.log(this.state.resultData, 'result')
    return (
      <div>
        <ImportSteps step={this.state.step} config={this.config} />
      </div>
    )
  }
}
export default Main
