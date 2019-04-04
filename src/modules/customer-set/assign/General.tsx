import React from 'react'
import { Row, Col, Radio, Select, Tooltip } from 'antd'
import { fetchGeneralList } from '../api'
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
  selectradio?: number
}
class Main extends React.Component<Props, State> {
  public state: State = {
    value: 3,
    selectSales: []
  }
  public companyId = APP.user.companyId
  public values: ValueProps = {}
  public componentWillMount () {
    this.getSelectSaleList()
  }
  public getSelectSaleList (companyId = this.companyId) {
    this.companyId = companyId
    const select: Array<{key: string, label: string}> = []
    fetchGeneralList(companyId).then((res) => {
      if (String(res.isBusSea) === '1') { // 选中公海
        this.setState({
          value: 3
        })
      } else {
        if (res.list.length > 0) { // 证明选择的是自定义
          this.setState({
            value: 2
          })
          res.list.forEach((item: {salespersonId?: string, salespersonName?: string}) => {
            select.push({
              key: item.salespersonName ? String(item.salespersonId) : '',
              label: item.salespersonName
            })
          })
          this.setState({
            selectSales: select
          })
        } else {
          this.setState({
            value: 1
          })
        }
      }
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
            this.values.selectradio = e.target.value
            this.props.onChange(this.values)
          }}
          value={this.state.value}
        >
          <Row>
            <Col span={3}>
              <Radio
                disabled={disabled}
                value={3}
              >
                <span>转到公海</span>
              </Radio>
            </Col>
            <Col span={3}>
              <Radio
                disabled={disabled}
                value={1}
              >
                {
                  <span>
                    全部销售
                    <Tooltip placement='top' title='勾选全部销售，系统分配资源平均分到所有销售人员库中，若全部库满，直接转到公海'>
                      <i className='fa fa-info-circle ml5 ml5' style={{color: '#C9C9C9'}}></i>
                    </Tooltip>
                  </span>
                }
              </Radio>
            </Col>
            <Col span={3}>
              <Radio
                disabled={disabled}
                value={2}
              >
                {
                  <span>
                    自定义销售
                    <Tooltip placement='top' title='若勾选多个销售，可直接平均分配到各销售库中，若全部库满，直接转到公海'>
                      <i className='fa fa-info-circle ml5 ml5' style={{color: '#C9C9C9'}}></i>
                    </Tooltip>
                  </span>
                }
              </Radio>
            </Col>
            <Col span={15}>
              <Select
                labelInValue
                disabled={this.state.value === 1 || disabled}
                mode='multiple'
                style={{ width: '100%' }}
                value={this.state.selectSales}
                onChange={(val: Array<{key: string, label: string, salespersonId: string, salespersonName: string}>) => {
                  const newVal = val.map((item) => {
                    return {
                      salespersonId: item.key,
                      salespersonName: item.label
                    }
                  })
                  this.setState({
                    selectSales: val
                  })
                  this.values.selectradio = this.state.value
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
