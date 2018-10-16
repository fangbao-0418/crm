import React from 'react'
import { Row, Col, Radio, Select } from 'antd'
import { fetchGeneralList } from '../api'
import { getSalesByCompany } from '@/modules/common/api'
const Option = Select.Option
const children: JSX.Element[] = []
interface Props {
  disabled?: boolean
  onChange?: (value: ValueProps) => void
  sales: Array<{salespersonId?: string, salespersonName?: string}>
}
interface State {
  value: number
  selectSales: Array<{key: string, label: React.ReactNode}>
}
interface ValueProps {
  salesPerson?: Array<{salespersonId: string, salespersonName: string}>
}
class Main extends React.Component<Props, State> {
  public state: State = {
    value: 1,
    selectSales: []
  }
  public values: ValueProps = {}
  public componentWillMount () {
    this.getSelectSaleList()
  }
  public getSelectSaleList () {
    const select: Array<{key: string, label: string}> = []
    fetchGeneralList().then((res) => { // 默认选重中
      console.log(res, 'res')
      if (res.length) { // 证明选择的是自定义
        this.setState({
          value: 2
        })
      }
      res.forEach((item: {salespersonId?: string, salespersonName?: string}) => {
        select.push({
          key: item.salespersonId,
          label: item.salespersonName
        })
      })
      this.setState({
        selectSales: select
      })
    })
  }
  public render () {
    console.log(this.state.selectSales, 'selectSales')
    const disabled = this.props.disabled !== undefined ? this.props.disabled : true
    return (
      <div>
        <Radio.Group
          style={{width: '100%'}}
          onChange={(e) => {
            this.setState({
              value: e.target.value
            })
          }}
          value={this.state.value}
        >
          <Row>
            <Col span={6}>
              <Radio
                disabled={disabled}
                value={1}
              >
                全部销售
              </Radio>
            </Col>
            <Col span={3}>
              <Radio
                disabled={disabled}
                value={2}
              >
                自定义销售
              </Radio>
            </Col>
            <Col span={15}>
              <Select
                labelInValue
                disabled={this.state.value === 1 || disabled}
                mode='multiple'
                style={{ width: '100%' }}
                // placeholder='Please select'
                defaultValue={this.state.selectSales} // 为啥直接绑定值不对？？
                onChange={(val: Array<{key: string, label: string, salespersonId: string, salespersonName: string}>) => {
                  console.log(val, 'val')
                  const newVal = val.map((item) => {
                    console.log(item, 'item')
                    return {
                      salespersonId: item.key,
                      salespersonName: item.label
                    }
                  })
                  console.log(newVal, 'newVal')
                  this.values.salesPerson = newVal
                  this.props.onChange(this.values)
                }}
              >
                {
                  this.props.sales.map((item, index) => {
                    return (
                      <Option key={item.salespersonId}>{item.salespersonName}</Option>
                    )
                  })
                }
              </Select>
            </Col>
          </Row>
        </Radio.Group>
      </div>
    )
  }
}
export default Main
