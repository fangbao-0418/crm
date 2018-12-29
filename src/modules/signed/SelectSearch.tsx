import React from 'react'
import { Select } from 'antd'
import { getFirms } from '@/modules/stat/api'
import { getSales } from '@/modules/common/api'
const styles = require('./style')
const Option = Select.Option
interface Props {
  type?: string
  onChange?: (value: ValueProps) => void
}
interface ValueProps {
  agencyId?: string
  customerSource?: string
  payTaxesNature?: string
  signSalesperson?: string
  currentSalesperson?: string
}
interface State {
  /** 机构列表 */
  firms: Array<{id: string, name: string}>
  sales: Array<{salesPerson: string, saleId: string}>
}
class Main extends React.Component<Props, State> {
  public values: ValueProps = {}
  public companyTypeList: string[] = ['Agent', 'DirectCompany']
  public state: State = {
    firms: [],
    sales: []
  }
  public componentWillMount () {
    this.getFirms()
    this.handleSalesRequest()
  }
  public handleSalesRequest () {
    let tab: 3 | 4 | 5
    if (this.props.type === '1') {
      tab = 3
    } else if (this.props.type === '2') {
      tab = 5
    } else if (this.props.type === '3') {
      tab = 4
    }
    getSales(tab).then((res) => {
      this.setState({
        sales: res
      })
    })
  }
  public getFirms () {
    getFirms(this.companyTypeList).then((res) => {
      this.setState({
        firms: res
      })
    })
  }
  public render () {
    return (
      <div className={styles.select}>
        <Select
          showSearch
          optionFilterProp='children'
          filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
          allowClear={true}
          className='mr5'
          style={{width: 150}}
          placeholder='请选择机构'
          onChange={(value: string) => {
            this.values.agencyId = value
            this.props.onChange(this.values)
          }}
        >
          {
            this.state.firms.length > 0 &&
            this.state.firms.map((item) => {
              return (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              )
            })
          }
        </Select>
        <Select
          allowClear={true}
          style={{width:'150px'}}
          className='mr5'
          placeholder='请选择客户来源'
          onChange={(val: string) => {
            this.values.customerSource = val
            this.props.onChange(this.values)
          }}
        >
          {
            APP.keys.EnumCustomerSource.map((item) => {
              return (
                <Option
                  key={item.value}
                >
                  {item.label}
                </Option>
              )
            })
          }
        </Select>
        <Select
          allowClear={true}
          style={{width:'150px'}}
          className='mr5'
          placeholder='请选择纳税类别'
          onChange={(val: string) => {
            this.values.payTaxesNature = val
            this.props.onChange(this.values)
          }}
        >
          {
            APP.keys.EnumPayTaxesNature.map((item) => {
              return (
                <Option
                  key={item.value}
                >
                  {item.label}
                </Option>
              )
            })
          }
        </Select>
        <Select
          allowClear={true}
          style={{width:'150px'}}
          placeholder={this.props.type === '1' ? '请选择签约销售' : '请选择跟进人'}
          showSearch
          labelInValue
          optionFilterProp='children'
          filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(val: {key: '', label: ''}) => {
            this.values.signSalesperson = val.label
            this.props.onChange(this.values)
          }}
        >
          {
            this.state.sales.map((item) => {
              return (
                <Option key={item.saleId}>{item.salesPerson}</Option>
              )
            })
          }
        </Select>
      </div>
    )
  }
}
export default Main
