import React from 'react'
import moment from 'moment'
import { Select, Row, Col, Table, Tooltip } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { getFirms, getCustomerSign } from '@/modules/stat/api'
import { getSalesByCompany } from '@/modules/common/api'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import CityRank from './CityRank'
import Pie from './Pie'
import Line from './Line'
import AddButton from '@/modules/common/content/AddButton'

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
  char: any
  /** 来源统计 */
  pi: any
  /** 按城市统计 */
  cityData: CrmStat.TotalByCityDetails[]
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
    pi: [],
    cityData: []
  }

  public condition: ConditionOptionProps[] = [
    {
      field: 'date',
      label: ['创建时间'],
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
      title: '客户来源',
      dataIndex: 'customerPoolReportDetails.customerSource',
      render: (text, record) => {
        return record.customerSource
      }
    },
    {
      title: '新增客户',
      dataIndex: 'customerPoolReportDetails.newCustomerNums',
      render: (text, record) => {
        return record.newCustomerNums
      }
    },
    {
      title: (
        <span>
          未跟进
          <Tooltip placement='top' title='还没有跟进记录的新客'>
            <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
          </Tooltip>
        </span>
      ),
      dataIndex: 'customerPoolReportDetails.noTrackNums',
      render: (text, record) => {
        return record.noTrackNums
      }
    },
    {
      title: (
        <span>
          跟进中
          <Tooltip placement='top' title='有记录写销售在跟进的客户(未签约)'>
            <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
          </Tooltip>
        </span>
      ),
      dataIndex: 'customerPoolReportDetails.noTrackNums',
      render: (text, record) => {
        return record.trackingNums
      }
    },
    {
      title: (
        <span>
          意向中
          <Tooltip placement='top' title='截止到目前意向度大于0的客户(未签约)'>
            <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
          </Tooltip>
        </span>
      ),
      dataIndex: 'customerPoolReportDetails.noTrackNums',
      render: (text, record) => {
        return record.intentionNums
      }
    },
    {
      title: (
        <span>
          已签约
          <Tooltip placement='top' title='截止到目前已经成为签约客户的客户数'>
            <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
          </Tooltip>
        </span>
      ),
      dataIndex: 'customerPoolReportDetails.noTrackNums',
      render: (text, record) => {
        return record.signNums
      }
    },
    {
      title: (
        <span>
          转化率‰
          <Tooltip placement='top' title='签约/总新增客户(单位:千分之)'>
            <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
          </Tooltip>
        </span>
      ),
      dataIndex: 'customerPoolReportDetails.noTrackNums',
      render: (text, record) => {
        return record.signRate
      }
    },
    {
      title: (
        <span>
          签约周期/天
          <Tooltip placement='top' title='签约/总新增客户(单位:千分之)'>
            <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
          </Tooltip>
        </span>
      ),
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
      const cityData = res.length > 0 ? this.state.dataSource : []
      if (res.length === 0) {
        this.setState({
          char: [],
          pi: [],
          plat: []
        })
      }
      this.setState({
        dataSource,
        cityData,
        sallers: res,
        sal
      }, () => {
        if (sales.length > 0) {
          this.getCustomerSource()
        }
      })
    })
  }

  public getCustomerSource () {
    this.fetchList()
  }
  public fetchList () {
    getCustomerSign(this.payload).then((res: any) => {
      const a = res.data.customerPoolReportDetails
      res.data.totalCustomerPoolReportDetails.customerSource = '合计'
      a.push(res.data.totalCustomerPoolReportDetails)
      const dataSource = a
      this.setState({
        dataSource,
        char: res.data.totalByNew,
        pi: res.data.totalBySource,
        plat: res.data.totalByCity,
        cityData: res.data.totalByCity.map((v: any, i: any) => {v.key = i + 1; return v})
      })
    })
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
    this.fetchList()
  }

  public export (exports: any) {
    const accessToken: any = localStorage.getItem('token')
    fetch(
      `/sys/crm-manage/v1/api/report/customer-pool/export?totalBeginDate=${exports.totalBeginDate}&totalEndDate=${exports.totalEndDate}&agencyId=${exports.agencyId}&salespersonId=${exports.salespersonId}&customerSource=${exports.customerSource}`,
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
      a.download = exports.totalBeginDate + '~' + exports.totalEndDate + '销售明细表.xlsx'
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
        <div style={{marginTop: 15, marginBottom: 20}}>
          <Select
            allowClear={true}
            showSearch
            optionFilterProp='children'
            filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
            value={this.state.organ}
            className='inline-block mr8'
            style={{width: 200}}
            placeholder='请输入创建机构'
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
            showSearch
            optionFilterProp='children'
            filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
            value={this.state.sal || undefined}
            className='inline-block mr8'
            style={{width: 200}}
            placeholder='请输入创建人'
            onChange={(value: string) => {
              this.payload.salespersonId = value
              this.getCustomerSource()
              this.setState({
                sal: value
              })
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
          <Select
            allowClear={true}
            showSearch
            optionFilterProp='children'
            filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
            className='inline-block mr8'
            style={{width: 200}}
            placeholder='请选择客户来源'
            onChange={(val: string) => {
              this.payload.customerSource = val
              this.fetchList()
            }}
          >
            {
            APP.keys.EnumCustomerSource.map((item) => {
              return (
                <Select.Option
                  key={item.value}
                >
                  {item.label}
                </Select.Option>
              )
            })
          }
          </Select>
        </div>
        <Row>
          <Col span={12} >
            <div style={{fontSize: 14, color: '#333333', marginBottom: 10}}>城市排名</div>
            <CityRank cityData={this.state.cityData}/>
          </Col>
          <Col span={8} offset={2}>
            <Pie pi={this.state.pi}/>
          </Col>
        </Row>
        <Line char={this.state.char}/>
        <div style={{marginBottom: 15}}>
          <span style={{fontSize: 14, color: '#333333'}}>销售明细表</span>
          <AddButton
            style={{float: 'right'}}
            icon={<APP.Icon type='export' />}
            title='导出'
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
