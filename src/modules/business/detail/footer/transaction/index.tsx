import React from 'react'
import { Button } from 'antd'
import Modal from 'pilipa/libs/modal'
import Info from './Info'
import { connect } from 'react-redux'
interface Props extends Customer.Props {
  onOk?: () => void
  onCancel?: () => void
  showBtn: boolean
}
class Main extends React.Component<Props> {
  public render () {
    let record = this.props.detail
    return (
      <Button
        type='ghost'
        hidden={this.props.showBtn}
        className='mr5'
        onClick={() => {
          const modal2 = new Modal({
            content: (
              <Info
                enterSignTime={record.enterSignTime}
                enterSignMoney={record.enterSignMoney}
                customerId={record.id}
                onOk={(params) => {
                  const payload = {
                    enterSignTime: params.enterSignTime,
                    enterSignMoney: params.enterSignMoney
                  }
                  record = Object.assign({}, record, payload)
                  APP.dispatch<Customer.Props>({
                    type: 'change customer data',
                    payload: {
                      detail: record
                    }
                  })
                  modal2.hide()
                }}
                onCancel={() => {
                  modal2.hide()
                }}
              />
            ),
            title: '成交信息',
            mask: true,
            footer: null,
            onCancel: () => {
              modal2.hide()
            }
          })
          modal2.show()
        }}
      >
        {record.enterSignTime ? '查看成交信息' : '录入成交信息'}
      </Button>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Main)
