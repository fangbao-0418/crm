import React from 'react'
import moment from 'moment'
import { Select, Row, Col, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { getFirms, getSalesByCompany, getTrailRank } from '@/modules/stat/api'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import Line from './line'
import Pie from './pie'
import AddButton from '@/modules/common/content/AddButton'
const styles = require('./style')

export interface PayloadProps {
  totalBeginDate: string
  totalEndDate: string
  salespersonId: string
}

interface State {
  dataSource: CrmStat.SalesDetails[]
  firms: Array<{id: string, name: string}>
  sallers: Array<{id: string, name: string}>
  organ: string
  sale: string
  sal: string
  char: any
  pi: any
  extshow: boolean
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
    sale: '',
    sal: '',
    char: [],
    pi: [],
    extshow: false
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

  public columns: ColumnProps<CrmStat.SalesDetails>[] = [
    {
      title: '销售',
      dataIndex: 'salesDetails.salesperson',
      align: 'center',
      render: (text, record) => {
        return (
          <span>
            <span className={styles.rank} style={record.key > 3 ? {background: '#C9C9C9'} : {background: '#e84845'}}>{record.key}</span>
            <span>{record.salesperson}</span>
            </span>
        )
      }
    },
    {
      title: '跟进客户',
      dataIndex: 'salesDetails.trackContactNums',
      render : (text, record) => {
        return (
          record.trackContactNums
        )
      }
    },
    {
      title: '30%意向度',
      dataIndex: 'salesDetails.percentThirtyCustomerNums',
      render : (text, record) => {
        return (
          record.percentThirtyCustomerNums
        )
      }
    },
    {
      title: '60%意向度',
      dataIndex: 'salesDetails.percentSixtyCustomerNums',
      render : (text, record) => {
        return (
          record.percentSixtyCustomerNums
        )
      }
    },
    {
      title: '80%意向度',
      dataIndex: 'salesDetails.percentEightyCustomerNums',
      render : (text, record) => {
        return (
          record.percentEightyCustomerNums
        )
      }
    },
    {
      title: '100%意向度',
      dataIndex: 'salesDetails.percentHundredCustomerNums',
      render : (text, record) => {
        return (
          record.percentHundredCustomerNums
        )
      }
    },
    {
      title: '新签客户',
      dataIndex: 'salesDetails.newCustomerNums',
      render : (text, record) => {
        return (
          record.newCustomerNums
        )
      }
    },
    {
      title: '转换率',
      dataIndex: 'salesDetails.signCustomerNums',
      render : (text, record) => {
        return (
          record.signCustomerNums
        )
      }
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
      const sales = res.map((item: any) => {
        return item.id
      })
      const sale = sales.join(',')
      this.payload.salespersonId = sale
      const sal = ''
      this.setState({
        sallers: res,
        sale,
        sal
      }, () => {
        if (sales.length > 0) {
          this.fetchList()
        }
      })
    })
  }

  public fetchList () {
    getTrailRank(this.payload).then((res: any) => {
      console.log(res.data.reportTrackCustomerByDate, 'char')
      console.log(res.data.reportByTrackCustomerSource, 'pi')
      this.setState({
        dataSource: res.data.salesDetails.map((v: any, i: any) => {v.key = i + 1; return v}),
        char: res.data.reportTrackCustomerByDate,
        pi: res.data.reportByTrackCustomerSource
      })
    })
  }

  public export (exports: any) {
    window.open(`http://192.168.170.30:9008/v1/api/report/customer/export?totalBeginDate=${exports.totalBeginDate}&totalEndDate=${exports.totalEndDate}&salespersonId=${exports.salespersonId}`)
  }

  // 搜索框折叠
  public handleSwitch () {
    this.setState({
      extshow: !this.state.extshow
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
        <div>
          <img
            src={require(`@/assets/images/${this.state.extshow ? 'up' : 'down'}.svg`)}
            style={{cursor: 'pointer', float: 'right'}}
            width='14'
            height='14'
            onClick={this.handleSwitch.bind(this)}
          />
        </div>
        <div style={this.state.extshow ? {display:'block'} : {display: 'none'}}>
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
            value={this.state.sal}
            className='inline-block mr8'
            style={{width: 200}}
            placeholder='请选择销售'
            onChange={(value: string) => {
              this.payload.salespersonId = value
              this.fetchList()
              this.setState({
                sal: value,
                dataSource: []
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
        <div style={{marginTop: 10}}>
          <Row>
            <Col span={16}>
              <Line char={this.state.char}/>
            </Col>
            <Col span={8}>
              <Pie pi={this.state.pi}/>
            </Col>
          </Row>
        </div>
        <div>
          <span>销售明细表</span>
          <AddButton
            style={{float: 'right'}}
            icon={<img src={require('@/assets/images/export.png')} width='14px' height='14px'/>}
            title='导出'
            onClick={() => {
              this.export(this.payload)
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
