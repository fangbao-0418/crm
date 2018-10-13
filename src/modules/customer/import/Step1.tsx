import React from 'react'
import { Select, Switch, Button } from 'antd'
import { fetchRegion } from '@/modules/common/api'
import { getCompanyByCitycode, getSalesByCompany } from '../api'
const Option = Select.Option
interface State {
  isChecked: boolean,
  citys: Common.RegionProps[]
  sales: Array<{id: number, name: string}>
  companys: Array<{id: string, companyname: string}>
}
interface Props {
  onOk?: (value: ValueProps) => void
}
interface ValueProps {
  agencyId?: string
  customerSource?: string,
  salesPerson?: Array<{id: string, name: string}>,
  city?: {cityCode: string, cityName: string}
}
class Main extends React.Component<Props> {
  public values: ValueProps = {}
  public state: State = {
    isChecked: true,
    citys: [],
    sales: [],
    companys: []
  }
  public componentWillMount () {
    fetchRegion({level: 2}).then((res) => {
      this.setState({
        citys: res
      })
    })
  }
  public getCompany (citycode: string) {
    citycode = '300171' // 先默认这个值有数据
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
  public onChange (checked: any) {
    this.setState({
      isChecked: checked
    })
  }
  public render () {
    return (
      <div className='text-center mt10'>
        <div>
          <span>客户来源：</span>
          <Select
            style={{width:'200px'}}
            onChange={(val: string) => {
              this.values.customerSource = val
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
        </div>
        <div className='mt12'>
            <span>选择城市：</span>
            <Select
              labelInValue
              style={{width:'200px'}}
              onChange={(val: {key: string, label: string, cityCode: string, cityName: string}) => {
                console.log(val, 'val')
                const newVal = {
                  cityCode: val.key,
                  cityName: val.label
                }
                this.getCompany(val.key)
                this.values.city = newVal
              }}
            >
              {
                this.state.citys.map((item, index) => {
                  return (
                    <Option key={item.code}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </div>
          <div>
            <div className='mt12' style={{ textAlign: 'left', marginLeft: 250 }}>
              <span>是否分配：</span>
              <Switch onChange={this.onChange.bind(this)} defaultChecked/>
            </div>
            {
              this.state.isChecked &&
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
                        <Option key={item.id}>{item.companyname}</Option>
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
              </div>
            }
          </div>
        <div className='text-right mt10'>
          <Button
            type='primary'
            onClick={() => {
              // console.log(this.values, 'values 导入')
              if (this.values.city && this.values.customerSource) {
                if (this.state.isChecked) {
                  if (this.values.agencyId && this.values.salesPerson) {
                    if (this.props.onOk) {
                      this.props.onOk(this.values)
                    }
                  } else {
                    APP.error('请选择机构和销售')
                  }
                } else {
                  if (this.props.onOk) {
                    this.props.onOk(this.values)
                  }
                }
              } else {
                APP.error('请选择客户来源和城市')
              }
            }}
          >
            下一步
          </Button>
        </div>
      </div>
    )
  }
}
export default Main
