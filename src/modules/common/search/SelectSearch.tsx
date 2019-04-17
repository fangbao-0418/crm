import React from 'react'
import { Input, Select } from 'antd'
import { getFirms } from '@/modules/stat/api'
const styles = require('./style')
const Option = Select.Option
interface Props {
  type?: 'signed' | 'open'
  onChange?: (value: ValueProps) => void
}
interface ValueProps {
  agencyId?: string
  customerSource?: string
  payTaxesNature?: string
  /** 释放原因 */
  busSeaMemo?: string
}
interface State {
  /** 机构列表 */
  firms: Array<{id: string, name: string}>
}
class Main extends React.Component<Props> {

  public values: ValueProps = {}

  public companyTypeList: string[] = ['Agent', 'DirectCompany']

  public state: State = {
    firms: []
  }

  public componentWillMount () {
    this.getFirms()
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
        {this.props.children}
        {
          this.props.type === 'signed' &&
          <Select
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
        }
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
          className='mr5'
          style={{width:'150px'}}
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
        {
          this.props.type === 'open' &&
          <Select
            allowClear={true}
            style={{width: 150}}
            placeholder='请选择释放原因'
            onChange={(value: string) => {
              this.values.busSeaMemo = value
              this.props.onChange(this.values)
            }}
          >
            {
              APP.constants.releaseCause.map((item, index) => {
                return (
                  <Option title={item.label} key={`busSeaMemo-${index}`} value={item.label}>{item.label}</Option>
                )
              })
            }
          </Select>
        }
      </div>
    )
  }
}
export default Main
