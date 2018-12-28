import React from 'react'
import { Select } from 'antd'
import { getFirms } from '@/modules/stat/api'
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
        {
          this.props.type === '1' ?
          <Select
            allowClear={true}
            style={{width:'150px'}}
            placeholder='请选择签约销售'
            onChange={(val: string) => {
              this.values.signSalesperson = val
              this.props.onChange(this.values)
            }}
          >
            <Option key='王敏'>王敏</Option>
            <Option key='王敏2'>王敏2</Option>
            <Option key='王敏3'>王敏3</Option>
          </Select> :
          <Select
            allowClear={true}
            style={{width:'150px'}}
            placeholder='请选择跟进人'
            onChange={(val: string) => {
              this.values.currentSalesperson = val
              this.props.onChange(this.values)
            }}
          >
            <Option key='王敏'>王敏</Option>
            <Option key='王敏2'>王敏2</Option>
            <Option key='王敏3'>王敏3</Option>
          </Select>
        }
      </div>
    )
  }
}
export default Main
