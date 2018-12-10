import React from 'react'
import moment from 'moment'
import { Select, Icon, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { getFirms, getSalesByCompany, getSalesRank } from '@/modules/stat/api'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import Line from './line'
import AddButton from '@/modules/common/content/AddButton'
const styles = require('./style')

export interface PayloadProps {
  totalBeginDate: string
  totalEndDate: string
  salespersonId: string
}

interface State {
  dataSource: CrmStat.CallDetailInfos[]
  firms: Array<{id: string, name: string}>
  sallers: Array<{id: string, name: string}>
  organ: string
  sale: string
  sal: string
  strip: any
  char: any
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
    strip: {},
    char: [],
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

  public columns: ColumnProps<CrmStat.CallDetailInfos>[] = [
    {
      title: '销售',
      dataIndex: 'callDetailInfos.salespersonName',
      align: 'left',
      render: (text, record) => {
        return (
          <span>
            <span className={styles.rank} style={record.key > 3 ? {background: '#C9C9C9'} : {background: '#e84845'}}>{record.key}</span>
            <span>{record.salespersonName}</span>
          </span>
        )
      }
    },
    {
      title: '通话量',
      dataIndex: 'callTotalNums',
      render: (text, record) => {
        return (
          record.callInTotalNums + record.callOutTotalNums
        )
      }
    },
    {
      title: '接通量',
      dataIndex: 'callDetailInfos.callSuccessNums',
      render: (text, record) => {
        return (
          record.callSuccessNums
        )
      }
    },
    {
      title: '接通率',
      dataIndex: 'averageCallSuccessPercent',
      render: (text, record) => {
        return (
          record.callSuccessNums / (record.callInTotalNums + record.callOutTotalNums)
        )
      }
    },
    {
      title: '通话时长',
      dataIndex: 'callDetailInfos.totalCallDuration',
      render: (text, record) => {
        return (
          record.totalCallDuration
        )
      }
    },
    {
      title: '30s接通量',
      dataIndex: 'callDetailInfos.callSuccessLte30SecondNums',
      render: (text, record) => {
        return (
          record.callSuccessLte30SecondNums
        )
      }
    },
    {
      title: '60s接通量',
      dataIndex: 'callDetailInfos.callSuccessLte60SecondNums',
      render: (text, record) => {
        return (
          record.callSuccessLte60SecondNums
        )
      }
    },
    {
      title: '60s以上接通量',
      dataIndex: 'callDetailInfos.callSuccessGt60SecondNums',
      render: (text, record) => {
        return (
          record.callSuccessGt60SecondNums
        )
      }
    }
  ]

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
      }
      )
    })
  }

  public getSales (companyId: string) {
    getSalesByCompany(companyId).then((res) => {
      const sales = res.map((item: any) => {
        return item.id
      })
      const sal = ''
      const sale = res.length > 0 ? sales.join(',') : ''
      this.payload.salespersonId = sale
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
    return getSalesRank(this.payload).then((res: any) => {
      this.setState({
        dataSource: res.data.callDetailInfos.map((v: any, i: any) => {v.key = i + 1; return v}),
        strip: res.data,
        char: res.data.reportByDays
      })
    })
  }

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

  // 导出
  public export (exports: any) {
    window.open(`http://192.168.170.30:9008/v1/api/report/sales/export?totalBeginDate=${exports.totalBeginDate}&totalEndDate=${exports.totalEndDate}&salespersonId=${exports.salespersonId}`)
  }

  // 搜索框折叠
  public handleSwitch () {
    this.setState({
      extshow: !this.state.extshow
    })
  }
  public render () {
    const {firms, dataSource, strip, char } = this.state
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
            style={{cursor: 'pointer', float: 'right', marginTop: -5}}
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
              this.values.agencyId = value
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
            value={this.state.sal}
            className='inline-block mr8'
            style={{width: 200}}
            placeholder='请选择销售'
            onChange={(value: string) => {
              this.payload.salespersonId = value
              this.setState({
                sal: value,
                dataSource: []
              })
              this.fetchList()
            }}
          >
          {
            this.state.sallers.length > 0 && this.state.sallers.map((item) => {
              return (
                <Select.Option key={item.id}>{item.name}</Select.Option>
              )
            })
          }
          </Select>
        </div>

        <div className={styles.pane}>
          <div className={styles.con}>
            <div className={styles.small}>通话量</div>
            <div className={styles.big}>{strip.callTotalNums}</div>
            {/* <div className={styles.small}>
              <span>环比</span>
              <span style={{marginLeft: 115}}>30%<Icon type='down' style={{paddingLeft: 5}}></Icon></span>
            </div> */}
          </div>
          <div className={styles.con}>
            <div className={styles.small}>呼出量</div>
            <div className={styles.big}>{strip.callOutTotalNums}</div>
            {/* <div className={styles.small}>
              <span>环比</span>
              <span style={{marginLeft: 115}}>30%<Icon type='down' style={{paddingLeft: 5}}></Icon></span>
            </div> */}
          </div>
          <div className={styles.con}>
            <div className={styles.small}>接通量</div>
            <div className={styles.big}>{strip.callSuccessNums}</div>
            {/* <div className={styles.small}>
              <span>环比</span>
              <span style={{marginLeft: 115}}>30%<Icon type='down' style={{paddingLeft: 5}}></Icon></span>
            </div> */}
          </div>
          <div className={styles.con}>
            <div className={styles.small}>通话率</div>
            <div className={styles.big}>{strip.averageCallSuccessPercent}</div>
            {/* <div className={styles.small}>
              <span>环比</span>
              <span style={{marginLeft: 115}}>30%<Icon type='down' style={{paddingLeft: 5}}></Icon></span>
            </div> */}
          </div>
          <div className={styles.con}>
            <div className={styles.small}>通话时长</div>
            <div className={styles.big}>{strip.totalCallDuration}</div>
            {/* <div className={styles.small}>
              <span>环比</span>
              <span style={{marginLeft: 115}}>30%<Icon type='down' style={{paddingLeft: 5}}></Icon></span>
            </div> */}
          </div>
        </div>

        <div style={{marginTop: 20}}>
          <Line char={char}/>
        </div>

        <div>
          <span>排名</span>
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
            dataSource={dataSource}
            pagination={false}
          />
        </div>
      </div>
    )
  }
}
export default Main
