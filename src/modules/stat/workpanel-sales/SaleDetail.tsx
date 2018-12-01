import React from 'react'
import { Select, Icon } from 'antd'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import Line from './line'
const styles = require('./style')

class Main extends React.Component<any> {

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

  // public onDateChange (value: {[field: string]: {label: string, value: string}}) {
  //   if (value.date.value.split('至').length === 2) {
  //     this.payload.callTimeBeginDate = value.date.value.split('至')[0]
  //     this.payload.callTimeEndDate = value.date.value.split('至')[1]
  //   } else {
  //     this.payload.callTimeBeginDate = moment().add(value.date.value, 'day').format('YYYY-MM-DD')
  //     if (value.date.value === '-1') {
  //       this.payload.callTimeEndDate = this.payload.callTimeBeginDate
  //     } else {
  //       this.payload.callTimeEndDate = moment().format('YYYY-MM-DD')
  //     }
  //   }
  //   this.fetchList()
  // }

  public render () {
    return (
      <div>
        <Condition
          style={{marginLeft: -36}}
          // onChange={this.onDateChange.bind(this)}
          dataSource={this.condition}
        />

        <div>
          <Select
            className='inline-block mr8'
            style={{width: 200}}
            placeholder='请选择机构'
          >
            <Select.Option key='1'>123</Select.Option>
            <Select.Option key='2'>456</Select.Option>
          </Select>
          <Select
            className='inline-block mr8'
            style={{width: 200}}
            placeholder='请选择销售'
          >
            <Select.Option key='3'>123</Select.Option>
            <Select.Option key='4'>456</Select.Option>
          </Select>
        </div>

        <div className={styles.pane}>
          <div className={styles.con}>
            <div className={styles.small}>通话量</div>
            <div className={styles.big}>30000</div>
            <div className={styles.small}>
              <span>环比</span>
              <span style={{marginLeft: 115}}>30%<Icon type='down' style={{paddingLeft: 5}}></Icon></span>
            </div>
          </div>
          <div className={styles.con}>
            <div className={styles.small}>呼出量</div>
            <div className={styles.big}>20000</div>
            <div className={styles.small}>
              <span>环比</span>
              <span style={{marginLeft: 115}}>30%<Icon type='down' style={{paddingLeft: 5}}></Icon></span>
            </div>
          </div>
          <div className={styles.con}>
            <div className={styles.small}>接通量</div>
            <div className={styles.big}>50000</div>
            <div className={styles.small}>
              <span>环比</span>
              <span style={{marginLeft: 115}}>30%<Icon type='down' style={{paddingLeft: 5}}></Icon></span>
            </div>
          </div>
          <div className={styles.con}>
            <div className={styles.small}>通话率</div>
            <div className={styles.big}>67%</div>
            <div className={styles.small}>
              <span>环比</span>
              <span style={{marginLeft: 115}}>30%<Icon type='down' style={{paddingLeft: 5}}></Icon></span>
            </div>
          </div>
          <div className={styles.con}>
            <div className={styles.small}>通话时长</div>
            <div className={styles.big}>10:00:16</div>
            <div className={styles.small}>
              <span>环比</span>
              <span style={{marginLeft: 115}}>30%<Icon type='down' style={{paddingLeft: 5}}></Icon></span>
            </div>
          </div>
        </div>

        <div>
          <Line />
        </div>
      </div>
    )
  }
}
export default Main
