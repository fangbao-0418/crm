import React from 'react'
import { Select, Switch, Button } from 'antd'
import { allotCustomer } from '../api'
const Option = Select.Option
interface Status {
  isChecked: boolean
}
interface Props {
  onOk?: () => void
}
class Main extends React.Component<Props> {
  public state: Status = {
    isChecked: true
  }
  public onChange (e: any) {
    this.setState({
      isChecked: e.target
    })
  }
  public render () {
    return (
      <div className='text-center mt10'>
        <div>
          <div className='mt12'>
            <span>选择机构：</span>
            <Select
              style={{width:'200px'}}
            >
              <Option key='1'>机构1</Option>
              <Option key='2'>机构2</Option>
            </Select>
          </div>
          <div className='mt12'>
            <span>分配销售：</span>
            <Select
              style={{width:'200px'}}
              mode='multiple'
            >
              <Option key='1'>销售1</Option>
              <Option key='2'>销售2</Option>
            </Select>
          </div>
          <div className='text-right mt10'>
            <Button
              type='primary'
              onClick={() => {
                const params = {
                  agencyId: '11',
                  customerIds: ['1q2w', '2q2w', '3q2w'],
                  salesPersonIds: [{
                    id: '1',
                    name: 'aaa'
                  }, {
                    id: '2',
                    name: 'bbbb'
                  }]
                }
                allotCustomer(params).then((res) => {
                  if (res.status) {
                    if (this.props.onOk) {
                      this.props.onOk()
                    }
                  }
                })
                if (this.props.onOk) {
                  this.props.onOk()
                }
              }}
            >
              下一步
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
export default Main
