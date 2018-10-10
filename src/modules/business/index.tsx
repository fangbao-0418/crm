import React from 'react'
import { DatePicker, Select, Tabs, Button } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { PaginationConfig } from 'antd/lib/pagination'
import ContentBox from '@/modules/common/content'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import SearchName from '@/modules/common/search/SearchName'
import Modal from 'pilipa/libs/modal'
import AddButton from '@/modules/common/content/AddButton'
import ToOpenReason from './ToOpenReason'
import Provider from '@/components/Provider'
import BaseInfo from '@/modules/customer/BaseInfo'
import Import from '@/modules/customer/import'
import moment from 'moment'
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'
import Tab4 from './Tab4'
import Detail from '@/modules/customer/detail'
import _ from 'lodash'
import { appointment, toSales, toOpen, toCity, getRecycleNum, getCustomerNum, getcapacityNum } from './api'
const styles = require('./style')
type DetailProps = Business.DetailProps
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
}
const all = [{
  label: '全部',
  value: ''
}]
class Main extends React.Component {
  public state: States = {
    visible: true,
    defaultActiveKey: '1',
    recycleNum: '',
    customerNum: {
      allNums: '',
      trackContactNums: '',
      newCustomerNums: ''
    }
  }
  public data: ConditionOptionProps[] = [
    {
      field: 'date',
      value: '',
      label: ['入库时间', '创建时间', '最后跟进时间'],
      options: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '今天',
          value: '1'
        },
        {
          label: '7天',
          value: '7'
        },
        {
          label: '30天',
          value: '30'
        }
      ],
      type: 'date'
    },
    {
      label: ['意向度'],
      value: '',
      field: 'intention',
      options: all.concat(APP.keys.EnumIntentionality)
    },
    {
      field: 'telephoneStatus',
      value: '',
      label: ['电话状态'],
      options: all.concat(APP.keys.EnumContactStatus)
    }
  ]
  public params: Business.SearchProps = {}
  public paramsleft: Business.SearchProps = {}
  public paramsright: Business.SearchProps = {}
  public appointmentTime: string = ''
  public curSale: {key: string, label: string} = { key: '', label: ''}
  public cityCode: string = ''
  public reason: {value: string, label: string} = { value: '', label: ''}
  public capacityNum: string = ''
  public columns: ColumnProps<DetailProps>[] = [{
    title: '客户名称',
    dataIndex: 'customerName',
    render: (val, record) => {
      return (
        <a onClick={this.show.bind(this, record.id)}>{val}</a>
      )
    }
  }, {
    title: '联系人',
    dataIndex: 'contactPerson'
  }, {
    title: '联系电话',
    dataIndex: 'contactPhone'
  }, {
    title: '意向度',
    dataIndex: 'intention',
    render: (val) => {
      return (APP.dictionary[`EnumIntentionality-${val}`])
    }
  }, {
    title: '电话状态',
    dataIndex: 'telephoneStatus',
    render: (val) => {
      return (APP.dictionary[`EnumContactStatus-${val}`])
    }
  }, {
    title: '空置天数',
    dataIndex: 'freeDays'
  }, {
    title: '当前销售',
    dataIndex: 'leadingPerson'
  }, {
    title: '客户来源',
    dataIndex: 'source',
    render: (val) => {
      return (APP.dictionary[`EnumContactSource-${val}`])
    }
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    render: (val) => {
      return (moment(val).format('YYYY-MM-DD'))
    }
  }, {
    title: '入库时间',
    dataIndex: 'enterDays',
    render: (val) => {
      return (moment(val).format('YYYY-MM-DD'))
    }
  }]
  public componentWillMount () {
    this.fetchRecycleNum()
    this.fetchCustomerNum()
    this.fetchCapacityNum()
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
  public handleSearch (values: any) {
    this.paramsleft = {}
    let beginTime
    let endTime
    if (!values.date.value) {
      beginTime = ''
      endTime = ''
    } else if (values.date.value.indexOf('至') > -1) {
      beginTime = values.date.value.split('至')[0]
      endTime = values.date.value.split('至')[1]
    } else {
      beginTime = moment().format('YYYY-MM-DD')
      endTime = moment().startOf('day').add(values.date.value, 'day').format('YYYY-MM-DD')
    }
    if (values.date.label === '入库时间') {
      this.paramsleft.storageBeginDate = beginTime
      this.paramsleft.storageEndDate = endTime
    } else if (values.date.label === '创建时间') {
      this.paramsleft.createBeginDate = beginTime
      this.paramsleft.createEndDate = endTime
    } else if (values.date.label === '最后跟进') {
      this.paramsleft.lastTrackBeginTime = beginTime
      this.paramsleft.lastTrackEndTime = endTime
    }
    this.paramsleft.intention = values.intention.value
    this.paramsleft.telephoneStatus = values.telephoneStatus.value
    this.params = $.extend(true, {}, this.paramsleft, this.paramsright)
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
  public handleSearchType (values: any) {
    this.paramsright = {}
    switch (values.key) {
    case '0':
      this.paramsright.customerName = values.value
      break
    case '1':
      this.paramsright.contactPerson = values.value
      break
    case '2':
      this.paramsright.customerSource = values.value
      break
    case '3':
      this.paramsright.currentSalesperson = values.value
      break
    case '4':
      this.paramsright.contactPhone = values.value
      break
    case '5':
      this.paramsright.payTaxesNature = values.value
      break
    }
    this.params = $.extend(true, {}, this.paramsleft, this.paramsright)
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
    const modal = new Modal({
      style: 'width: 840px',
      content: (
        <Provider><Detail customerId={customerId} isBussiness={true}/></Provider>
      ),
      footer: null,
      header: null,
      mask: true,
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
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
        toOpen(openparams).then((res) => {
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
            <Select.Option value='110000'>北京</Select.Option>
            <Select.Option value='120000'>天津</Select.Option>
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
    let ins: any
    const modal = new Modal({
      style: 'width: 800px',
      content: (
        <Provider>
          <BaseInfo
            reset
            ref={(ref: any) => { ins = ref.getWrappedInstance() }}
            onClose={() => {modal.hide()}}
            isBussiness={true}
            flowNow={() => { modal.hide()}}
          />
        </Provider>
      ),
      footer: (
        <div className='text-right mt10'>
          <Button
            className='mr5'
            type='primary'
            onClick={() => {
              console.log(ins.refs.wrappedComponent)
              ins.refs.wrappedComponent.save().then(() => {
                APP.success('保存成功')
                modal.hide()
                this.setState({
                  visible: false
                }, () => {
                  this.setState({
                    visible: true
                  })
                })
                // this.fetchList()
              }, () => {
                APP.error('保存失败')
              })
            }}
          >
            保存
          </Button>
          <Button
            type='primary'
            onClick={() => {
              ins.refs.wrappedComponent.save().then((res: any) => {
                APP.success('保存成功') // 保存成功后跳转到详情页
                modal.hide()
                this.show(res.data[0])
              }, () => {
                APP.error('保存失败')
              })
            }}
          >
            现在跟进
          </Button>
        </div>
      ),
      title: '新增客资',
      mask: true,
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  public import () {
    const modal = new Modal({
      style: 'width: 800px',
      content: (
        <Provider><Import isBussiness={true}/></Provider>
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
          this.capacityNum &&
          <div className={styles.note}>
            <span className={styles['note-icon1']} />
            <span className='mr10'>库容剩余不足{this.capacityNum}个，即将达到上限！</span>
            <span className={styles['note-icon1']} />
            <span>您的库容已达上限！</span>
          </div>
        }
        <div className='mb12' style={{ overflow: 'hidden' }}>
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
                { value: '0', label: '客户名称'},
                { value: '1', label: '联系人'},
                { value: '2', label: '客户来源'},
                { value: '3', label: '所属销售'},
                { value: '4', label: '联系电话'},
                { value: '5', label: '纳税类别'}
              ]}
              placeholder={''}
              // onChange={this.handleSearchType.bind(this)}
              onKeyDown={(e, val) => {
                if (e.keyCode === 13) {
                  console.log(val, 'onKeyDown')
                  this.handleSearchType(val)
                }
              }}
            />
          </div>
        </div>
        { this.state.visible &&
          <Tabs animated={false} defaultActiveKey={this.state.defaultActiveKey} onChange={this.callback.bind(this)}>
            <Tabs.TabPane tab={<span>全部({this.state.customerNum.allNums})</span>} key='1'>
              <Tab1 columns={this.columns} params={this.params} handleSelectAll={this.handleSelectAll.bind(this)}/>
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
          </Tabs>
        }
      </ContentBox>
    )
  }
}
export default Main
