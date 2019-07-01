import React from 'react'
import { Select } from 'antd'
import { getFirms } from '@/modules/stat/api'
import { getSales } from '@/modules/common/api'
const styles = require('./style')
const Option = Select.Option
interface Props {
  style?: React.CSSProperties
  type?: string
  infoComplete?: boolean
  onChange?: (value: ValueProps) => void
}
interface ValueProps {
  agencyId?: string
  customerSource?: string
  payTaxesNature?: string
  signSalespersonId?: string
  currentSalespersonId?: string
  /** 客户状态 */
  lifeCycle?: string
  /** 信息是否完善 */
  infoComplete?: number
}
interface State {
  /** 机构列表 */
  firms: Array<{id: string, name: string}>
  sales: Array<{salesPerson: string, saleId: string}>
  /** tab1当前跟进人 */
  currentSales: Array<{salesPerson: string, saleId: string}>
  infoComplete?: number
}
class Main extends React.Component<Props, State> {
  public values: ValueProps = {}
  public companyTypeList: string[] = ['Agent', 'DirectCompany']
  public state: State = {
    firms: [],
    sales: [],
    currentSales: [],
    infoComplete: this.props.infoComplete ? 0 : undefined
  }
  public componentWillMount () {
    this.getFirms()
    this.handleSalesRequest()
  }
  public handleSalesRequest () {
    let tab: 3 | 4 | 5
    if (this.props.type === '1') { // tab1的时候跟进人4和签约销售3都需要展示
      tab = 3
      getSales(4).then((res) => {
        this.setState({
          currentSales: res
        })
      })
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
      <div className={styles.select} style={this.props.style}>
        {this.props.children}
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
        {/* <Select
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
        </Select> */}
        <Select
          allowClear={true}
          style={{width:'150px'}}
          className='mr5'
          placeholder={this.props.type === '1' ? '请选择合作销售' : '请选择跟进人'}
          showSearch
          labelInValue
          optionFilterProp='children'
          filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(val: {key: '', label: ''}) => {
            if (this.props.type === '1') {
              this.values.signSalespersonId = val ? val.key : undefined
            } else {
              this.values.currentSalespersonId = val ? val.key : undefined
            }
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
        {
          this.props.type === '1' &&
          <Select
            allowClear={true}
            style={{width:'150px'}}
            className='mr5'
            placeholder='请选择跟进人'
            showSearch
            labelInValue
            optionFilterProp='children'
            filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(val: {key: '', label: ''}) => {
              this.values.currentSalespersonId = val ? val.key : undefined
              this.props.onChange(this.values)
            }}
          >
            {
              this.state.currentSales.map((item) => {
                return (
                  <Option key={item.saleId}>{item.salesPerson}</Option>
                )
              })
            }
          </Select>
        }
        <Select
          allowClear={true}
          style={{width:'150px'}}
          className='mr5'
          placeholder='请选择客户状态'
          onChange={(val: string) => {
            this.values.lifeCycle = val
            this.props.onChange(this.values)
          }}
        >
          {
            APP.keys.EnumCustomerLiftCycle.map((item) => {
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
        {
          this.props.type === '1' &&
          <Select
            allowClear={true}
            style={{width:'150px'}}
            placeholder='是否完善信息'
            value={this.state.infoComplete}
            onChange={(val: number) => {
              this.setState({
                infoComplete: val
              })
              this.values.infoComplete = val
              this.props.onChange(this.values)
            }}
          >
            <Option value={1}>是</Option>
            <Option value={0}>否</Option>
          </Select>
        }
      </div>
    )
  }
}
export default Main
