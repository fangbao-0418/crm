import React from 'react'
import { Select, Switch, Button, Tooltip, Radio } from 'antd'
import FormItem from '@/components/form/Item1'
import { getSalesList } from '@/modules/common/api'
const styles = require('../style')
const Option = Select.Option
const RadioGroup = Radio.Group
interface Props {
  onOk?: (value: ValueProps) => void
}
interface State {
  sales: Array<{id: string, name: string}>
  type?: number
}
interface ValueProps {
  customerSource?: string,
  salesPerson?: Array<{id: string, name: string}>
  type?: number
}
class Main extends React.Component<Props> {
  public values: ValueProps = {
    type: 1
  }
  public state: State = {
    sales: [],
    type: 1
  }
  public componentWillMount () {
    getSalesList().then((res) => {
      this.setState({
        sales: res
      })
    })
  }
  public downFile () {
    const fileUrl = require('@/assets/files/商机导入模板.xlsx')
    const el = document.createElement('a')
    el.setAttribute('href', fileUrl)
    el.setAttribute('download', '商机导入模版')
    el.click()
  }
  public render () {
    return (
      <div className='text-center mt10'>
        <p className='mt20'>
          <span style={{marginLeft: 32}}>导入说明：导入文件仅支持excel格式</span>
          <span
            className='href'
            onClick={this.downFile.bind(this)}
          >
            下载客户模版
          </span>
        </p>
        <div style={{marginBottom: 12}}>
          <span className={styles.label}>客户来源：</span>
          <Select
            style={{width:'200px'}}
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
        <div>
          <span className={styles.label} style={{paddingRight: 4}}>导入设置：</span>
          <RadioGroup
            onChange={(e) => {
              this.setState({
                type: e.target.value
              })
              this.values.type = e.target.value
            }}
            value={this.state.type}
          >
            <Radio value={1}>转到公海</Radio>
            <Radio value={2}>转给销售</Radio>
          </RadioGroup>
        </div>
        {
          this.state.type === 2 &&
          <div className='mt12'>
            <span className={styles.label}>
              <Tooltip placement='top' title='默认分给自己；若勾选其他多个销售，可直接平均分配到其他销售库中'>
                <i className='fa fa-exclamation-circle ml5' style={{color: '#FBCD5D', marginRight: 5}}></i>
              </Tooltip>
              分配销售：
            </span>
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
                this.state.sales.map((item, index) => {
                  return (
                    <Option key={item.id}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </div>
        }
        <div className='text-right mt10'>
          <Button
            type='primary'
            onClick={() => {
              if (this.state.type === 1) {
                if (this.values.customerSource) {
                  this.props.onOk(this.values)
                } else {
                  APP.error('请选择客户来源')
                }
              } else if (this.state.type === 2) {
                if (this.values.customerSource && this.values.salesPerson && this.values.salesPerson.length > 0) {
                  if (this.props.onOk) {
                    this.props.onOk(this.values)
                  }
                } else {
                  APP.error('请选择客户来源和销售')
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
