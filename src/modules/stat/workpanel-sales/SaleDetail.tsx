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
  dataSource: CrmStat.SalesRankItemProps[]
  firms: Array<{id: string, name: string}>
  sallers: Array<{id: string, name: string}>
  organ: string
  sale: string
  strip: any
  char: any
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
    strip: {},
    char: []
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
      title: '通话量',
      dataIndex: 'callTotalNums'
    },
    {
      title: '接通量',
      dataIndex: 'callDetailInfos.callSuccessNums'
    },
    {
      title: '接通率',
      dataIndex: 'averageCallSuccessPercent'
    },
    {
      title: '通话时长',
      dataIndex: 'callDetailInfos.totalCallDuration'
    },
    {
      title: '30s接通量',
      dataIndex: 'callDetailInfos.callSuccessLte30SecondNums'
    },
    {
      title: '60s接通量',
      dataIndex: 'callDetailInfos.callSuccessLte60SecondNums'
    },
    {
      title: '60s以上接通量',
      dataIndex: 'callDetailInfos.callSuccessGt60SecondNums'
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
      }
      // , () => {
      //   this.getSales(res[0].id)
      // }
      )
    })
  }

  public getSales (companyId: string) {
    getSalesByCompany(companyId).then((res) => {
      console.log(res, '1111111111哈哈哈啊哈哈哈哈哈')
      // const sale = res.length > 0 ? res[0].id : ''
      this.setState({
        sallers: res
        // sale: res[0].id
      }, () => {
        this.fetchList()
      })
    })
  }

  public fetchList () {
    return getSalesRank(this.payload).then((res: any) => {
      this.setState({
        dataSource: res.data.callDetailInfos,
        strip: res.data,
        char: res.reportByDays
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
  public export () {
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
                const name = item.name
                return (
                  <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                )
              })
          }
          </Select>
          <Select
            // value={this.state.sale}
            className='inline-block mr8'
            style={{width: 200}}
            placeholder='请选择销售'
            onChange={(value: string) => {
              this.payload.salespersonId = value
              // this.setState({sale: value})
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
            <div className={styles.small}>
              <span>环比</span>
              <span style={{marginLeft: 115}}>30%<Icon type='down' style={{paddingLeft: 5}}></Icon></span>
            </div>
          </div>
          <div className={styles.con}>
            <div className={styles.small}>呼出量</div>
            <div className={styles.big}>{strip.callOutTotalNums}</div>
            <div className={styles.small}>
              <span>环比</span>
              <span style={{marginLeft: 115}}>30%<Icon type='down' style={{paddingLeft: 5}}></Icon></span>
            </div>
          </div>
          <div className={styles.con}>
            <div className={styles.small}>接通量</div>
            <div className={styles.big}>{strip.callSuccessNums}</div>
            <div className={styles.small}>
              <span>环比</span>
              <span style={{marginLeft: 115}}>30%<Icon type='down' style={{paddingLeft: 5}}></Icon></span>
            </div>
          </div>
          <div className={styles.con}>
            <div className={styles.small}>通话率</div>
            <div className={styles.big}>{strip.averageCallSuccessPercent}</div>
            <div className={styles.small}>
              <span>环比</span>
              <span style={{marginLeft: 115}}>30%<Icon type='down' style={{paddingLeft: 5}}></Icon></span>
            </div>
          </div>
          <div className={styles.con}>
            <div className={styles.small}>通话时长</div>
            <div className={styles.big}>{strip.totalCallDuration}</div>
            <div className={styles.small}>
              <span>环比</span>
              <span style={{marginLeft: 115}}>30%<Icon type='down' style={{paddingLeft: 5}}></Icon></span>
            </div>
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
              this.export()
            }}
          />
        </div>
        <div>
          <Table
            columns={this.columns}
            dataSource={dataSource}
          />
        </div>
      </div>
    )
  }
}
export default Main
