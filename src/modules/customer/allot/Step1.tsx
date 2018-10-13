import React from 'react'
import { Select, Switch, Button } from 'antd'
import { getCompanyByCitycode, getSalesByCompany } from '../api'
const Option = Select.Option
interface Props {
  onOk?: (value: ValueProps) => void
}
interface State {
  sales: Array<{id: number, name: string}>
  companys: Array<{id: string, name: string}>
}
interface ValueProps {
  agencyId?: string,
  customerIds?: string[]
  salesPerson?: Array<{id: string, name: string}>
  checkAllParam?: any
}
class Main extends React.Component<Props> {
  public values: ValueProps = {}
  public state: State = {
    sales: [],
    companys: []
  }
  public componentWillMount () {
    const citycode = '300171' // 从登陆信息获取城市code得到机构
    getCompanyByCitycode(citycode).then((res) => {
      this.setState({
        companys: res
      })
    })
  }
  public getSales (companyId: string) {
    getSalesByCompany(companyId).then((res) => {
      this.setState({
        sales: res
      })
    })
  }
  public render () {
    console.log(this.state.companys, 'this.state.companys')
    return (
      <div className='text-center mt10'>
        <div>
          <div className='mt12'>
            <span>选择机构：</span>
            <Select
              style={{width:'200px'}}
              onChange={(val: string) => {
                this.values.agencyId = val
                this.getSales(val)
              }}
            >
              {
                this.state.companys.length > 0 &&
                this.state.companys.map((item, index) => {
                  return (
                    <Option key={item.id}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </div>
          <div className='mt12'>
            <span>分配销售：</span>
            <Select
              labelInValue
              style={{width:'200px'}}
              mode='multiple'
              onChange={(val: Array<{key: string, label: string, id: string, name: string}>) => {
                const newVal = val.map((item) => {
                  return {
                    id: item.key,
                    name: item.label
                  }
                })
                this.values.salesPerson = newVal
              }}
            >
              {
                this.state.sales.length > 0 && this.state.sales.map((item, index) => {
                  return (
                    <Option key={item.id}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </div>
          <div className='text-right mt10'>
            <Button
              type='primary'
              onClick={() => {
                if (this.values.agencyId && this.values.salesPerson) {
                  if (this.props.onOk) {
                    this.props.onOk(this.values)
                  }
                } else {
                  APP.error('请选择机构和销售')
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
