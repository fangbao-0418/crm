import React from 'react'
import { Select, Switch, Button } from 'antd'
import { fetchRegion } from '@/modules/common/api'
const Option = Select.Option
interface Status {
  isChecked: boolean,
  citys: Common.RegionProps[]
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
  public state: Status = {
    isChecked: true,
    citys: []
  }
  public componentWillMount () {
    fetchRegion({level: 2}).then((res) => {
      this.setState({
        citys: res
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
                    }}
                  >
                    <Option key='1001'>机构1</Option>
                    <Option key='1002'>机构2</Option>
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
                    <Option key='1'>销售1</Option>
                    <Option key='2'>销售2</Option>
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
