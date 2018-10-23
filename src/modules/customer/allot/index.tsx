import React from 'react'
import ImportSteps from '@/modules/common/allot-steps'
import Step1 from './Step1'
import Step2 from './Step2'
import _ from 'lodash'
import { connect } from 'react-redux'
import { getSaleCapacity, allotCustomer, deleteCustomer } from '../api'
interface Props extends Customer.Props {
  selectedRowKeys: string[]
  params: any
  pagetotal?: number
  onClose?: () => void
}
class Main extends React.Component<Props> {
  public state = {
    step: 1
  }
  public config = [
    {
      title: '1、导入设置',
      component: (
        <Step1
          onOk={(value) => {
            console.log(value, 'value')
            const ids: string[] = []
            value.salesPerson.forEach((item: {id: string, name: string}) => {
              ids.push(item.id)
            })
            const saleCapacityParams = {
              agencyId: value.agencyId,
              customerNum: this.props.selectedRowKeys.length,
              salesPersons: ids.join(',')
            }
            // if (this.props.selectAll) {
            //   value.checkAllParam = this.props.params
            //   value.customerIds = []
            //   saleCapacityParams.customerNum = this.props.pagetotal
            // } else {
            //   value.customerIds = this.props.selectedRowKeys
            // }
            value.customerIds = this.props.selectedRowKeys
            // console.log(saleCapacityParams, 'saleCapacityParams')
            getSaleCapacity(saleCapacityParams).then((res1) => { // 查询销售库容是不是足够
              if (res1.data.result === 1) {
                allotCustomer(value).then((res: any) => {
                  this.setState({
                    step: 2
                  })
                  APP.dispatch({
                    type: 'change customer data',
                    payload: {
                      assignResult: res.data
                    }
                  })
                })
              } else {
                APP.error('销售库容不足')
              }
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
          deleteCus={() => {
            const result = this.props.assignResult.repeatCustomers
            const ids: string[] = []
            result.map((item) => {
              ids.push(item.id)
            })
            const payload = ids.join(',')
            deleteCustomer(payload).then(() => {
              APP.success('操作成功')
              this.props.onClose()
            })
          }}
        />
      )
    }
  ]
  public render () {
    return (
      <div>
        <ImportSteps step={this.state.step} config={this.config} />
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Main)
