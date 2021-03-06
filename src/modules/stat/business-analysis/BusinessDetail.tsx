import React from 'react'
import { Select, Row, Col, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { getBusiness } from '@/modules/stat/api'
import { getSalesByCompany } from '@/modules/common/api'
import Bar from './Bar'
import Pie from './Pie'
import moment from 'moment'
import AddButton from '@/modules/common/content/AddButton'
import Company from '@/modules/common/content/Company'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
const styles = require('./style')

export interface PayloadProps {
  /** 建立机构 */
  agencyId?: string
  /** 要查询的销售人员ID */
  salespersonId?: string
  /** 来源 */
  customerSource?: number
  /** 开始时间 */
  totalBeginDate?: string
  /** 结束时间 */
  totalEndDate?: string
}

interface State {
  salesDetails: CrmStat.SalesDetails[]
  /** 机构列表 */
  firms: Array<{id: string, name: string}>
  /** 销售列表 */
  sallers: Array<{id: string, name: string}>
   /** 传入的销售人员 */
  sale: string
  /** 销售人员初始值 */
  sal: string
  /** 空置天数趋势图 */
  reportFreeDays: {name: string, value: number}[]
  /** 电话状态分布图 */
  reportPhoneStatuses: any,
  /** 客户来源 */
  totalBySource: {name: string, value: number}[]
}

class Main extends React.Component<{}, State> {

  public companyTypeList: string[] = ['Agent', 'DirectCompany']

  public payload: PayloadProps = {
    agencyId: APP.user.companyId,
    totalBeginDate: moment().subtract(29, 'd').format('YYYY-MM-DD'),
    totalEndDate: moment().format('YYYY-MM-DD')
  }

  public condition: ConditionOptionProps[] = [
    {
      field: 'date',
      label: ['创建时间'],
      type: 'date',
      value: '-29',
      options: [{
        label: '全部',
        value: 'all'
      }, {
        label: '今日',
        value: '0'
      }, {
        label: '昨日',
        value: '-1'
      }, {
        label: '7天',
        value: '-6'
      }, {
        label: '30天',
        value: '-29'
      }]
    }
  ]

  public state: State = {
    salesDetails: [],
    firms: [],
    sallers: [],
    sale: '',
    sal: '',
    reportPhoneStatuses: [],
    reportFreeDays: [],
    totalBySource: []
  }

  public columns: ColumnProps<CrmStat.SalesDetails>[] = [
    {
      title: '销售',
      dataIndex: 'salesperson',
      width: 130,
      render: (text, record, index) => {
        return (
          <span>
            <span className={index > 2 ? styles.ran : styles.rank}>{record.key}</span>
            <span>{text}</span>
          </span>
        )
      }
    },
    {
      title: '总客户',
      dataIndex: 'customerNums',
      width: 200,
      align: 'center'
    },
    {
      title: '已删除',
      dataIndex: 'deletedNums',
      width: 200,
      align: 'center'
    },
    {
      title: '新客资',
      dataIndex: 'newCustomerNums',
      width: 200,
      align: 'center'
    },
    {
      title: '无意向客户',
      dataIndex: 'noIntentionNums',
      width: 200,
      align: 'center'
    },
    {
      title: '意向客户',
      dataIndex: 'intentionNums',
      width: 200,
      align: 'center'
    },
    {
      title: '准签约客户',
      dataIndex: 'signCustomerNums',
      width: 200,
      align: 'center'
    }
  ]
  public componentWillMount () {
    this.getSales()
  }
  public onDateChange (value: {[field: string]: {label: string, value: string}}) {
    const date = value.date.value
    this.payload.totalBeginDate = moment().add(date, 'd').format('YYYY-MM-DD')
    if (date.split('至').length === 2) {
      this.payload.totalBeginDate = date.split('至')[0]
      this.payload.totalEndDate = date.split('至')[1]
    } else if (date === 'all') {
      this.payload.totalBeginDate = undefined
      this.payload.totalEndDate = undefined
    } else if (date === '-1') {
      this.payload.totalEndDate = moment().subtract(1, 'd').format('YYYY-MM-DD')
    } else {
      this.payload.totalEndDate = moment().format('YYYY-MM-DD')
    }
    this.fetchList()
  }
  public getSales (companyId: string = APP.user.companyId) {
    getSalesByCompany(companyId).then((res) => {
      const sal = ''
      this.fetchList()
      this.setState({
        sallers: res,
        sal
      })
    })
  }
  public handleReportFreeDays (data: {statusName: string}[] = []) {
    const index = data.findIndex((item) => item.statusName === '未知')
    console.log(index, 'index')
    if (index !== -1) {
      const unknow = data[index]
      const last = data[data.length - 1]
      data[data.length - 1] = unknow
      data[index] = last
    }
    return data
  }
  public fetchList () {
    getBusiness(this.payload).then((res: any) => {
      const salesDetails = res.data.salesDetails
      res.data.totalSalesDetails.salesperson = '合计'
      salesDetails.push(res.data.totalSalesDetails)
      const reportPhoneStatuses = this.handleReportFreeDays(res.data.reportPhoneStatuses)
      this.setState({
        salesDetails: salesDetails.map((v: any, i: any) => {v.key = i + 1; return v}),
        reportFreeDays: this.handleData(res.data.reportFreeDays, {name: 'levelName', value: 'levelNums'}),
        reportPhoneStatuses,
        totalBySource: res.data.totalBySource
      })
    })
  }
  public handleData (data: any[] = [], fields = {
    name: 'name',
    value: 'value'
  }): {name: string, value: number}[] {
    return data.map((item) => {
      return {
        name: item[fields.name],
        value: item[fields.value]
      }
    })
  }
  public export (exports: any) {
    console.log(exports.totalBeginDate, '1111')
    const o = {
      totalBeginDate: exports.totalBeginDate,
      totalEndDate: exports.totalEndDate,
      agencyId: exports.agencyId,
      salespersonId: exports.salespersonId
    }
    const f = {
      agencyId: exports.agencyId,
      salespersonId: exports.salespersonId
    }
    const query = $.param(o)
    const query2 = $.param(f)
    fetch(
      exports.totalBeginDate === undefined ? `/sys/crm-manage/v1/api/report/customer/export?${query2}` : `/sys/crm-manage/v1/api/report/customer/export?${query}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'token': APP.token,
          'from': '4'
        }
      }
    )
    .then((res) => res.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.download = '销售统计表.xlsx'
      a.href = url
      document.body.appendChild(a)
      a.click()
      a.remove()
    })
  }

  public render () {
    return (
      <div>
        <Condition
          style={{marginLeft: -15}}
          onChange={this.onDateChange.bind(this)}
          dataSource={this.condition}
        />
        <div style={{marginTop: 8}}>
          <Company
            type='self'
            className='mr5'
            defaultValue={APP.user.companyId}
            onChange={(value: string) => {
              this.payload.agencyId = value
              this.getSales(value)
            }}
          />
          <Select
            allowClear
            showSearch
            optionFilterProp='children'
            filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
            value={this.state.sal || undefined}
            className='inline-block mr5'
            style={{width: 200}}
            placeholder='请选择销售'
            onChange={(value: string) => {
              this.payload.salespersonId = value
              this.fetchList()
              this.setState({
                sal: value
              })
            }}
          >
          {
            this.state.sallers.length > 0 && this.state.sallers.map((item) => {
              return (
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
              )
            })
          }
          </Select>
          <Select
            allowClear
            className='inline-block mr8'
            style={{width: 200}}
            placeholder='请选择客户来源'
            onChange={(value: number) => {
              this.payload.customerSource = value
              this.fetchList()
            }}
          >
          {
            APP.keys.EnumCustomerSource.map((item) => {
              return (
                <Select.Option key={`customer-source-${item.value}`} value={item.value}>{item.label}</Select.Option>
              )
            })
          }
          </Select>
        </div>
        <div style={{marginBottom: 40}}>
          <div style={{marginTop: 25}}>
            <Row>
              <Col span={6}>
                <Pie title='客户来源分布' seriesName='客户来源' dataSource={this.state.totalBySource}/>
              </Col>
              <Col span={10} offset={1}>
                <Bar dataSource={this.state.reportPhoneStatuses}/>
              </Col>
              <Col span={6} offset={1}>
                <Pie title='商机客户空置天数' seriesName='空置天数' dataSource={this.state.reportFreeDays}/>
              </Col>
            </Row>
          </div>
        </div>
        <div style={{marginBottom: 15}}>
          <span style={{fontSize: 14, color: '#333333'}}>销售明细表</span>
          <AddButton
            style={{float: 'right'}}
            icon={<APP.Icon type='export' />}
            title='导出'
            hidden={!APP.hasPermission('crm_data_business_export')}
            onClick={() => {
              this.export(this.payload)
            }}
          />
        </div>
        <div>
          <Table
            columns={this.columns}
            dataSource={this.state.salesDetails}
            pagination={false}
            scroll={{ y: 400 }}
          />
        </div>
      </div>
    )
  }
}
export default Main
