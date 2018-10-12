import React from 'react'
import { DatePicker, Select, Tabs, Button } from 'antd'
import ContentBox from '@/modules/common/content'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import SearchName from '@/modules/common/search/SearchName'
import Modal from 'pilipa/libs/modal'
import AddButton from '@/modules/common/content/AddButton'
import ToOpenReason from './ToOpenReason'
import Provider from '@/components/Provider'
import Import from '@/modules/business/import'
import { fetchRegion } from '@/modules/common/api'
import moment from 'moment'
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'
import Tab4 from './Tab4'
import {
  addCustomer,
  getColumns,
  showDetail,
  conditionOptions
} from './utils'
import _ from 'lodash'
import { appointment, toSales, toOpen, toCity, getRecycleNum, getCustomerNum, getcapacityNum } from './api'

const styles = require('./style')
interface States {
  visible: boolean
  defaultActiveKey: string
  recycleNum: string
  customerNum: {
    allNums?: string
    trackContactNums?: string
    newCustomerNums?: string
    ForthcomingNums?: string
  }
  citys: Common.RegionProps[]
}
class Main extends React.Component {
  public state: States = {
    visible: true,
    defaultActiveKey: '1',
    recycleNum: '',
    customerNum: {
      allNums: '',
      trackContactNums: '',
      newCustomerNums: ''
    },
    citys: []
  }
  public data = conditionOptions
  public params: Business.SearchProps = {tab: '1'}
  public appointmentTime: string = ''
  public curSale: {key: string, label: string} = { key: '', label: ''}
  public cityCode: string = ''
  public reason: {value: string, label: string} = { value: '', label: ''}
  public capacityNum: number = 0
  public columns = getColumns.call(this)
  public componentWillMount () {
    this.fetchRecycleNum()
    this.fetchCustomerNum()
    this.fetchCapacityNum()
    this.fetchCitys()
  }
  public fetchCapacityNum () {
    getcapacityNum().then((res) => {
      this.capacityNum = res.data
    })
  }
  public fetchCustomerNum () {
    getCustomerNum(this.params).then((res) => {
      this.setState({
        customerNum: res
      })
    })
  }
  public fetchRecycleNum () {
    getRecycleNum(this.params).then((res) => {
      if (res) {
        this.setState({
          recycleNum: '(有' + res + '个客户即将被收回！)'
        })
      }
    })
  }
  public fetchCitys () {
    fetchRegion({level: 2}).then((res) => {
      this.setState({
        citys: res
      })
    })
  }
  public handleSearch (values: any) {
    let beginTime
    let endTime
    if (!values.date.value) {
      beginTime = undefined
      endTime = undefined
    } else if (values.date.value.indexOf('至') > -1) {
      beginTime = values.date.value.split('至')[0]
      endTime = values.date.value.split('至')[1]
    } else {
      beginTime = moment().startOf('day').subtract(values.date.value - 1, 'day').format('YYYY-MM-DD')
      endTime = moment().format('YYYY-MM-DD')
    }
    if (values.date.label === '入库时间') {
      this.params.storageBeginDate = beginTime
      this.params.storageEndDate = endTime
    } else if (values.date.label === '创建时间') {
      this.params.createBeginDate = beginTime
      this.params.createEndDate = endTime
    } else if (values.date.label === '最后跟进') {
      this.params.lastTrackBeginTime = beginTime
      this.params.lastTrackEndTime = endTime
    }
    this.params.intention = values.intention.value || undefined
    this.params.telephoneStatus = values.telephoneStatus.value || undefined
    this.params.customerSource = values.customerSource.value || undefined
    this.params.payTaxesNature = values.payTaxesNature.value || undefined
    this.fetchRecycleNum()
    this.fetchCustomerNum()
    this.params.tab = this.state.defaultActiveKey
    this.setState({
      visible: false
    }, () => {
      this.setState({
        visible: true
      })
    })
  }
  public handleSearchType (values: {key: string, value?: string}) {
    this.params.customerName = undefined
    this.params.contactPerson = undefined
    this.params.contactPhone = undefined
    this.params.currentSalesperson = undefined
    this.params[values.key] = values.value || undefined
    this.fetchRecycleNum()
    this.fetchCustomerNum()
    this.params.tab = this.state.defaultActiveKey
    this.setState({
      visible: false
    }, () => {
      this.setState({
        visible: true
      })
    })
  }
  public callback (value?: string) {
    this.params.tab = value
    this.setState({
      defaultActiveKey: value
    })
  }
  public show (customerId: string) {
    showDetail.call(this, customerId, () => {
      // this.props.
    })
  }
  public appointmentAll (selectedRowKeys: string[]) {
    if (!selectedRowKeys.length) {
      APP.error('请选择客户！')
      return false
    }
    const modal = new Modal({
      content: (
        <div>
          <span>请选择预约时间：</span>
          <DatePicker
            format={'YYYY-MM-DD'}
            onChange={(current) => {
              this.appointmentTime = current.format('YYYY-MM-DD')
            }}
          />
        </div>
      ),
      title: '批量预约',
      mask: true,
      onOk: () => {
        if (!this.appointmentTime) {
          APP.error('请选择预约时间！')
          return false
        }
        const params = { customerIdArr: selectedRowKeys }
        console.log(params, 'params')
        const time = this.appointmentTime
        appointment(params, time).then(() => {
          this.setState({
            visible: false
          }, () => {
            this.setState({
              visible: true
            })
          })
          APP.success('预约成功')
        })
        modal.hide()
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public toSale (selectedRowKeys: string[]) {
    if (!selectedRowKeys.length) {
      APP.error('请选择客户！')
      return false
    }
    const modal = new Modal({
      content: (
        <div>
          <span>请选择销售：</span>
          <Select
            labelInValue
            style={{width:'200px'}}
            onChange={(val: {key: '', label: ''}) => {
              this.curSale = val
            }}
          >
            <Select.Option value='1'>销售1</Select.Option>
            <Select.Option value='2'>销售2</Select.Option>
          </Select>
        </div>
      ),
      title: '销售',
      mask: true,
      onOk: () => {
        if (!this.curSale.key) {
          APP.error('请选择销售！')
          return false
        }
        const saleparams = {
          customerIdArr: selectedRowKeys,
          salesperson: this.curSale.label
        }
        const saleId = this.curSale.key
        toSales(saleparams, saleId).then((res) => {
          this.setState({
            visible: false
          }, () => {
            this.setState({
              visible: true
            })
          })
          APP.success('操作成功')
        })
        modal.hide()
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public toOpen (selectedRowKeys: string[]) {
    if (!selectedRowKeys.length) {
      APP.error('请选择客户！')
      return false
    }
    const modal = new Modal({
      content: (
        <ToOpenReason onChange={(item) => { this.reason = item }}/>
      ),
      title: '转公海',
      mask: true,
      onOk: () => {
        if (!this.reason.label) {
          APP.error('请选择原因！')
          return false
        }
        const openparams = {
          customerIdArr: selectedRowKeys,
          bus_sea_memo: this.reason.label
        }
        toOpen(openparams).then(() => {
          this.setState({
            visible: false
          }, () => {
            this.setState({
              visible: true
            })
          })
          APP.success('操作成功')
        })
        modal.hide()
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public toCustomersCity (selectedRowKeys: string[]) {
    if (!selectedRowKeys.length) {
      APP.error('请选择客户！')
      return false
    }
    const modal = new Modal({
      content: (
        <div>
          <span>请选择客资池：</span>
          <Select
            style={{width:'200px'}}
            onChange={(current: string) => {
              this.cityCode = current
            }}
          >
            {
              this.state.citys.map((item, index) => {
                return (
                  <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
                )
              })
            }
          </Select>
        </div>
      ),
      title: '转客资池',
      mask: true,
      onOk: () => {
        if (!this.cityCode) {
          APP.error('请选择客资池！')
          return false
        }
        const cityparams = {
          customerIdArr: selectedRowKeys,
          cityCode: this.cityCode
        }
        toCity(cityparams).then((res) => {
          this.setState({
            visible: false
          }, () => {
            this.setState({
              visible: true
            })
          })
          APP.success('操作成功')
        })
        modal.hide()
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public add () {
    addCustomer.call(this)
  }
  public import () {
    const modal = new Modal({
      style: 'width: 800px',
      content: (
        <Provider><Import /></Provider>
      ),
      footer: null,
      title: '导入客资',
      mask: true,
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public handleSelectAll (selectedRowKeys: string[], type: number) {
    console.log(type)
    console.log(selectedRowKeys)
    if (type === 1) {
      this.appointmentAll(selectedRowKeys)
    } else if (type === 2) {
      this.toSale(selectedRowKeys)
    } else if (type === 3) {
      this.toOpen(selectedRowKeys)
    } else if (type === 4) {
      this.toCustomersCity(selectedRowKeys)
    }
  }
  public render () {
    return (
      <ContentBox
        title='我的商机'
        rightCotent={(
          <div>
            <AddButton
              style={{marginRight: '10px'}}
              title='新增'
              onClick={() => {
                this.add()
              }}
            />
            <AddButton
              title='导入'
              onClick={() => {
                this.import()
              }}
            />
          </div>
        )}
      >
        {
          this.capacityNum > 0 &&
          <div className={styles.note}>
            <span className={styles['note-icon1']} />
            <span className='mr10'>库容剩余不足{this.capacityNum}个，即将达到上限！</span>
            <span className={styles['note-icon1']} />
            <span>您的库容已达上限！</span>
          </div>
        }
        <div className='mb12 clear'>
          <div className='fl' style={{ width: 740 }}>
            <Condition
              dataSource={this.data}
              onChange={this.handleSearch.bind(this)}
            />
          </div>
          <div className='fr' style={{ width: 290 }}>
            <SearchName
              style={{paddingTop: '5px'}}
              options={[
                { value: 'customerName', label: '客户名称'},
                { value: 'contactPerson', label: '联系人'},
                { value: 'contactPhone', label: '联系电话'},
                { value: 'currentSalesperson', label: '所属销售'}
                // { value: 'customerSource', label: '客户来源'}
                // { value: 'payTaxesNature', label: '纳税类别'}
              ]}
              placeholder={''}
              // onChange={this.handleSearchType.bind(this)}
              onKeyDown={(e, val) => {
                if (e.keyCode === 13) {
                  this.handleSearchType(val)
                }
              }}
            />
          </div>
        </div>
        {
          <Tabs animated={false} defaultActiveKey={this.state.defaultActiveKey} onChange={this.callback.bind(this)}>
            <Tabs.TabPane tab={<span>全部({this.state.customerNum.allNums})</span>} key='1'>
            {this.state.visible &&
              <Tab1 columns={this.columns} params={this.params} handleSelectAll={this.handleSelectAll.bind(this)}/>
            }
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span>已有沟通({this.state.customerNum.trackContactNums})</span>} key='2'>
              <Tab2 columns={this.columns} params={this.params}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span>新客资({this.state.customerNum.newCustomerNums})</span>} key='3'>
              <Tab3 columns={this.columns} params={this.params}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span>即将被收回<span style={{ color: '#F9B91F'}}>{this.state.recycleNum}</span></span>} key='4'>
              <Tab4 columns={this.columns} params={this.params}/>
            </Tabs.TabPane>
          </Tabs>}
      </ContentBox>
    )
  }
}
export default Main
