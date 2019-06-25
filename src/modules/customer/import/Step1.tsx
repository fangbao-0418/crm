import React from 'react'
import { Select, Switch, Button, Tooltip, Radio, Input } from 'antd'
import { fetchRegion } from '@/modules/common/api'
import { getAllCompany } from '../api'
import { getSalesByCompany } from '@/modules/common/api'
const styles = require('../style')
const Option = Select.Option
const RadioGroup = Radio.Group
interface State {
  type: number,
  // citys: Common.RegionProps[]
  sales: Array<{id: string, name: string}>
  companys: Array<{id: string, name: string}>
}
interface Props {
  onOk?: (value: ValueProps) => void
}
interface ValueProps {
  agencyId?: string
  agencyName?: string
  customerSource?: string
  salesPerson?: Array<{id: string, name: string}>
  // city?: {cityCode: string, cityName: string}
  type?: number
  /** 后缀 */
  customerNameSuffix?: string
}
class Main extends React.Component<Props> {
  public values: ValueProps = {
    type: 3
  }
  public state: State = {
    type: 3,
    // citys: [],
    sales: [],
    companys: []
  }
  public componentWillMount () {
    // fetchRegion({level: 2}).then((res) => {
    //   this.setState({
    //     citys: res
    //   })
    // })
    this.getCompany()
  }
  public getCompany () {
    // getCompanyByCitycode(citycode).then((res) => {
    //   this.setState({
    //     companys: res
    //   })
    // })
    getAllCompany().then((res) => {
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
    // if (this.state.type === 2) {
    //   getSalesByCompany(companyId).then((res) => {
    //     this.setState({
    //       sales: res
    //     })
    //   })
    // }
  }
  public downFile () {
    const fileUrl = require('@/assets/files/客资导入模版.xlsx')
    const el = document.createElement('a')
    el.setAttribute('href', fileUrl)
    el.setAttribute('download', '客资导入模版')
    el.click()
  }
  public render () {
    console.log(this.state.companys, 'this.state.companys')
    return (
      <div className='text-center mt10'>
        <p className='mt20'>
          <span>导入说明：导入文件仅支持excel格式</span>
          <span
            className='href'
            onClick={this.downFile.bind(this)}
          >
            下载客户模版
          </span>
        </p>
        <div>
          <span>客户来源：</span>
          <Select
            style={{width:'200px'}}
            placeholder='请选择客户来源'
            onChange={(val: string) => {
              this.values.customerSource = val
            }}
          >
            {
              APP.keys.EnumCustomerOfflineSource.map((item) => {
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
        {/* <div className='mt12'>
            <span>选择城市：</span>
            <Select
              showSearch
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
              optionFilterProp='children'
              filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {
                this.state.citys.map((item, index) => {
                  return (
                    <Option key={item.code}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </div> */}
          <div>
            <div className='mt12' style={{ textAlign: 'left', marginLeft: 250 }}>
              <span>导入设置：</span>
              <RadioGroup
                onChange={(e) => {
                  this.setState({
                    type: e.target.value
                  })
                  this.values.type = e.target.value
                }}
                value={this.state.type}
              >
                <Radio value={3}>转到客资池</Radio>
                <Radio value={1}>转到公海</Radio>
                <Radio value={2}>转给销售</Radio>
              </RadioGroup>
            </div>
            <div>
              {
                this.state.type !== 3 &&
                <div className='mt12'>
                  <span>选择机构：</span>
                  <Select
                    showSearch
                    labelInValue
                    placeholder='请选择机构'
                    style={{width:'200px'}}
                    optionFilterProp='children'
                    filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    // onChange={(val: string) => {
                    //   this.values.agencyId = val
                    //   console.log(val, '111111')
                    //   this.getSales(val)
                    // }}
                    onChange={(val: {key: string, label: string}) => {
                      this.values.agencyId = val.key
                      this.values.agencyName = val.label
                      console.log(val, '111111')
                      this.getSales(val.key)
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
              }
              {
                this.state.type === 2 &&
                <div className='mt12'>
                  <span style={{marginLeft: '-18px'}}>
                    <Tooltip placement='top' title='若勾选多个销售，可直接平均分配到各销售库中'>
                      <i className='fa fa-exclamation-circle ml5' style={{color: '#FBCD5D', marginRight: 5}}></i>
                    </Tooltip>
                    分配销售：
                  </span>
                  <Select
                    showSearch
                    placeholder='请选择销售'
                    optionFilterProp='children'
                    filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
              }
              {
                this.state.type !== 3 &&
                <div style={{color: 'red', margin: '5px 0px 0px 80px'}}>选中机构后，仅支持导入同一城市的客资</div>
              }
              <div className='mt12'>
                <span>导入批次：</span>
                <Input
                  maxLength={5}
                  style={{width:'200px'}}
                  onChange={(e) => {
                    this.values.customerNameSuffix = e.target.value
                  }}
                />
              </div>
            </div>
          </div>
        <div className='text-right mt10'>
          <Button
            type='primary'
            onClick={() => {
              if (this.state.type === 3) { // 转客资池
                if (this.values.customerSource) {
                  this.values.salesPerson = []
                  this.values.agencyId = ''
                  if (this.props.onOk) {
                    this.props.onOk(this.values)
                  }
                } else {
                  APP.error('请选择客户来源')
                }
              } else if (this.state.type === 1) { // 转公海
                if (this.values.customerSource && this.values.agencyId) {
                  if (this.props.onOk) {
                    this.props.onOk(this.values)
                  }
                } else {
                  APP.error('请选择客户来源／机构')
                }
              } else if (this.state.type === 2) { // 转销售
                if (this.values.customerSource && this.values.agencyId && this.values.salesPerson && this.values.salesPerson.length > 0) {
                  if (this.props.onOk) {
                    this.props.onOk(this.values)
                  }
                } else {
                  APP.error('请选择客户来源／机构／销售')
                }
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
