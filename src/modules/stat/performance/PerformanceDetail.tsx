import React from 'react'
import moment from 'moment'
import { Select, Row, Col, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { getFirms } from '@/modules/stat/api'
import { getSalesByCompany } from '@/modules/common/api'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import Line from './Line'
import Pie from './Pie'
import AddButton from '@/modules/common/content/AddButton'

const styles = require('./style')

export interface PayloadProps {
  totalBeginDate: string
  totalEndDate: string
  agencyId: string
  salespersonId: string
  customerSource: string
}

interface State {
  dataSource: CrmStat.CustomerPoolReportDetails[]
  /** 机构列表 */
  firms: Array<{id: string, name: string}>
  /** 销售列表 */
  sallers: Array<{id: string, name: string}>
  /** 客户来源列表 */
  sources: Array<{id: string, name: string}>
  /** 机构初始值 */
  organ: string
  /** 销售人员初始值 */
  sal: string
  /** 新增客户统计 */
  char: any[]
  /** 来源统计 */
  pi: any[]
}
class Main extends React.Component {

  public companyTypeList: string[] = ['Agent', 'DirectCompany']
  public payload: PayloadProps = {
    totalBeginDate: moment().format('YYYY-MM-DD'),
    totalEndDate: moment().format('YYYY-MM-DD'),
    agencyId: '',
    salespersonId: '',
    customerSource: ''
  }

  public state: State = {
    dataSource: [],
    firms: [],
    sallers: [],
    sources: [],
    organ: '',
    sal: '',
    char: [],
    pi: []
  }

  public condition: ConditionOptionProps[] = [
    {
      field: 'date',
      label: ['时间'],
      type: 'date',
      value: '0',
      options: [{
        label: '今天',
        value: '0'
      }, {
        label: '昨天',
        value: '-1'
      }, {
        label: '本周',
        value: 'week'
      }, {
        label: '本月',
        value: 'month'
      }]
    }
  ]

  public columns: ColumnProps<CrmStat.CustomerPoolReportDetails>[] = [
    {
      title: '销售',
      dataIndex: 'customerPoolReportDetails.customerSource',
      render: (text, record) => {
        return (
          <span>
          {/* {record.key === this.state.dataSource[this.state.dataSource.length - 1].key ? '' : (record.key > 3 ? <span className={styles.ran}>{record.key}</span> : <span className={styles.rank}>{record.key}</span>)}
          <span>{record.salesperson}</span> */}
        </span>
        )
      }
    },
    {
      title: '新签客户',
      dataIndex: 'customerPoolReportDetails.newCustomerNums',
      render: (text, record) => {
        return record.newCustomerNums
      }
    },
    {
      title: '记账客户',
      dataIndex: 'customerPoolReportDetails.noTrackNums',
      render: (text, record) => {
        return record.intentionNums
      }
    },
    {
      title: '一般人占比',
      dataIndex: 'customerPoolReportDetails.noTrackNums',
      render: (text, record) => {
        return record.intentionNums
      }
    },
    {
      title: '新签总额/万',
      dataIndex: 'customerPoolReportDetails.noTrackNums',
      render: (text, record) => {
        return record.intentionNums
      }
    },
    {
      title: '记账金额/万',
      dataIndex: 'customerPoolReportDetails.noTrackNums',
      render: (text, record) => {
        return record.signNums
      }
    },
    {
      title: '增值金额/万',
      dataIndex: 'customerPoolReportDetails.noTrackNums',
      render: (text, record) => {
        return record.signRate
      }
    },
    {
      title: '其他金额/万',
      dataIndex: 'customerPoolReportDetails.noTrackNums',
      render: (text, record) => {
        return record.signCycle
      }
    }
  ]

  public componentWillMount () {
    this.getFirms()
  }

  public getFirms () {
    getFirms(this.companyTypeList).then((res) => {
      this.payload.agencyId = res[0].id
      this.setState({
        firms: res,
        organ: res[0].id
      }, () => {
        this.getSales(res[0].id)
      })
    })
  }

  public getSales (companyId: string) {
    getSalesByCompany(companyId).then((res) => {
      const sales = res.map((item: any) => {
        return item.id
      })
      const sal = ''
      const dataSource = res.length > 0 ? this.state.dataSource : []
      if (res.length === 0) {
        this.setState({
          char: [],
          pi: []
        })
      }
      this.setState({
        dataSource,
        sallers: res,
        sal
      }, () => {
        if (sales.length > 0) {
          // this.fetchList()
        }
      })
    })
  }

  public fetchList () {
    // getBusiness(this.payload).then((res: any) => {
    //   const a = res.data.salesDetails
    //   res.data.totalSalesDetails.salesperson = '合计'
    //   a.push(res.data.totalSalesDetails)
    //   const dataSource = a
    //   this.setState({
    //     dataSource: dataSource.map((v: any, i: any) => {v.key = i + 1; return v}),
    //     pi: res.data.reportFreeDays,
    //     char: res.data.reportPhoneStatuses
    //   })
    // })
  }

  public onDateChange (value: {[field: string]: { label: string, value: string }}) {
    if (value.date.value.split('至').length === 2) {
      this.payload.totalBeginDate = value.date.value.split('至')[0]
      this.payload.totalEndDate = value.date.value.split('至')[1]
    } else {
      this.payload.totalBeginDate = moment().add(value.date.value, 'day').format('YYYY-MM-DD')
      if (value.date.value === '-1') {
        this.payload.totalEndDate = this.payload.totalBeginDate
      } else {
        this.payload.totalEndDate = moment().format('YYYY-MM-DD')
      }
    }
    if (value.date.value === 'week') {
      const date = new Date()
      const val = date.getDay() === 0 ? -'6' : '-' + (date.getDay() - 1)
      this.payload.totalBeginDate = moment().add(val, 'day').format('YYYY-MM-DD')
    }
    if (value.date.value === 'month') {
      const date = new Date()
      const val = '-' + (date.getDate() - 1)
      this.payload.totalBeginDate = moment().add(val, 'day').format('YYYY-MM-DD')
    }
    // this.fetchList()
  }

  public export (exports: any) {
    const accessToken: any = localStorage.getItem('token')
    fetch(
      `/sys/crm-manage/v1/api/report/customer/export?agencyId=${exports.agencyId}&salespersonId=${exports.salespersonId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'token': accessToken,
          'from': '4'
        }
      }
    )
    .then((res) => res.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.download = exports.totalBeginDate + '~' + exports.totalEndDate + '销售统计表.xlsx'
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
          style={{marginLeft: -36}}
          onChange={this.onDateChange.bind(this)}
          dataSource={this.condition}
        />
        <div style={{marginTop: 15, marginBottom: 15}}>
          <Select
            showSearch
            optionFilterProp='children'
            filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
            value={this.state.organ}
            className='inline-block mr8'
            style={{width: 200}}
            placeholder='请输入机构'
            onChange={(value: string) => {
              this.payload.agencyId = value
              this.getSales(value)
              this.setState({organ: value})
            }}
          >
            {
              this.state.firms.length > 0 &&
              this.state.firms.map((item) => {
                return (
                  <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                )
              })
            }
          </Select>
          <Select
            allowClear={true}
            value={this.state.sal || undefined}
            showSearch
            optionFilterProp='children'
            filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
            className='inline-block mr8'
            style={{width: 200}}
            placeholder='请输入销售名称'
            onChange={(value: string) => {
              this.payload.salespersonId = value
              this.setState({
                sal: value
                // dataSource: []
              })
              // this.fetchList()
            }}
          >
            {
              this.state.sallers.length > 0 &&
              this.state.sallers.map((item) => {
                return (
                  <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                )
              })
            }
          </Select>
        </div>
        <div className={styles.pane}>
          <div className={styles.con}>
            <div className={styles.small}>新签客户</div>
            <div className={styles.big}>{}</div>
          </div>
          <div className={styles.con}>
            <div className={styles.small}>新签总额/万</div>
            <div className={styles.big}>{}</div>
          </div>
          <div className={styles.con}>
            <div className={styles.small}>记账金额/万</div>
            <div className={styles.big}>{}</div>
          </div>
          <div className={styles.con}>
            <div className={styles.small}>增值金额/万</div>
            <div className={styles.big}>{}</div>
          </div>
          <div className={styles.con}>
            <div className={styles.small}>一般人占比</div>
            <div className={styles.big}>{}</div>
          </div>
        </div>
        <Row>
          <Col span={14}>
            <Line />
          </Col>
          <Col span={8} offset={1}>
            <Pie />
          </Col>
        </Row>
        <hr style={{border: '0.5px solid #F2F2F2', marginBottom: 20}}/>
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
        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
          pagination={false}
        />
      </div>
    )
  }
}
export default Main
