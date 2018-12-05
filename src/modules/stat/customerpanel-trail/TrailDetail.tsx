import React from 'react'
import moment from 'moment'
import { Select, Icon, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { getFirms, getSalesByCompany, getTrailRank } from '@/modules/stat/api'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import Line from './line'
import Pie from './pie'
import AddButton from '@/modules/common/content/AddButton'

export interface PayloadProps {
  totalBeginDate: string
  totalEndDate: string
  salespersonId: string
}

interface State {
  dataSource: CrmStat.SalesRankItemProps[]
  firms: Array<{id: string, name: string}>
  sallers: Array<{id: string, name: string}>
  organ: string
  sale: string
}

interface ValueProps {
  agencyId?: string,
  salesPerson?: Array<{id: string, name: string}>
}

class Main extends React.Component<{}, State> {
  public values: ValueProps = {
  }

  public SalespersonId = APP.keys.EnumSalespersonId

  public payload: PayloadProps = {
    totalBeginDate: moment().format('YYYY-MM-DD'),
    totalEndDate: moment().format('YYYY-MM-DD'),
    salespersonId: ''
  }

  public state: State = {
    dataSource: [],
    firms: [],
    sallers: [],
    organ: '',
    sale: ''
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
        value: '-7'
      }, {
        label: '本月',
        value: '-30'
      }]
    }
  ]

  public columns: ColumnProps<CrmStat.SalesRankItemProps>[] = [
    {
      title: '销售',
      dataIndex: 'callDetailInfos.salespersonName'
    },
    {
      title: '跟进客户',
      dataIndex: 'ReportByDays.callTotalNums',
      render : (text, record) => {
        return (
          record.callTotalNums
        )
      }
    },
    {
      title: '30%意向度',
      dataIndex: 'ReportByDays.callSuccessNums',
      render : (text, record) => {
        return (
          record.callSuccessNums
        )
      }
    },
    {
      title: '60%意向度',
      dataIndex: 'averageCallSuccessPercent',
      render : (text, record) => {
        return (
          record.averageCallSuccessPercent
        )
      }
    },
    {
      title: '80%意向度',
      dataIndex: 'callDetailInfos.totalCallDuration',
      render : (text, record) => {
        return (
          record.totalCallDuration
        )
      }
    },
    {
      title: '100%意向度',
      dataIndex: 'callDetailInfos.callSuccessLte30SecondNums'
    },
    {
      title: '新签客户',
      dataIndex: 'callDetailInfos.callSuccessLte60SecondNums'
    },
    {
      title: '转换率',
      dataIndex: 'callDetailInfos.callSuccessGt60SecondNums'
    }
  ]

  public onDateChange (value: {[field: string]: {label: string, value: string}}) {
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
    this.fetchList()
  }

  public componentWillMount () {
    this.getFirms()
  }

  public getFirms () {
    getFirms().then((res) => {
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
      const sale = res.length > 0 ? res[0].id : ''
      this.setState({
        sallers: res,
        sale
      })
    })
  }

  public fetchList () {
    getTrailRank(this.payload).then((res: any) => {
      this.setState({
        dataSource: res.data
      })
    })
  }

  public export () {}
  public render () {
    return (
      <div>
        <Condition
          style={{marginLeft: -36}}
          onChange={this.onDateChange.bind(this)}
          dataSource={this.condition}
        />

        <div>
          <Select
            value={this.state.organ}
            className='inline-block mr8'
            style={{width: 200}}
            placeholder='请选择机构'
            onChange={(value: string) => {
              // this.values.agencyId = value
              this.getSales(value)
              this.setState({
                organ: value
              })
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
            value={this.state.sale}
            className='inline-block mr8'
            style={{width: 200}}
            placeholder='请选择销售'
            onChange={(value: string) => {
              this.payload.salespersonId = value
              this.fetchList()
              this.setState({
                sale: value
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
        </div>
        <div style={{overflow: 'hidden', marginTop: 10}}>
          <Line />
          <Pie />
        </div>
        <div>
          <span>销售明细表</span>
          <AddButton
            style={{float: 'right'}}
            icon={<img src={require('@/assets/images/export.png')} width='14px' height='14px'/>}
            title='导出'
            onClick={() => {
              this.export()
            }}
          />
        </div>
        <div>
          <Table
            columns={this.columns}
            dataSource={this.state.dataSource}
          />
        </div>
      </div>
    )
  }
}
export default Main
