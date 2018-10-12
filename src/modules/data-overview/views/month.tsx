import React from 'react'
import { findDOMNode } from 'react-dom'
import { Row, Col, Select, Icon, DatePicker } from 'antd'
import PieList from '@/modules/data-overview/views/pie'
import Line from '@/modules/data-overview/views/line'
const styles = require('@/modules/data-overview/styles/index.styl')
class Main extends React.Component {
  public componentDidMount () {
    const dom: any = this.refs.container
    const myChart = echarts.init(dom)
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data:['已完成任务数', '待分配任务数', '已取消任务数']
      },
      series: [
        {
          name:'任务数',
          type:'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '14',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:[
                  {value:335, name:'已完成任务数', itemStyle: {color: '#fa250c'}},
                  {value:310, name:'待分配任务数', itemStyle: {color: '#1790ff'}},
                  {value:234, name:'已取消任务数', itemStyle: {color: '#ff7d00'}}
          ]
        }
      ]
    }
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
    }
  }
  public render () {
    return (
    <div>
      <Row className={styles.listLeft}>
        <Col span={11} className={styles.allPic} style={{marginRight:'42px'}}>
          <p className={styles.clientLeft}>2018年09月任务总览</p>
          <p className={styles.clientRight}>任务总数：1000</p>
          <div className={styles.pic}>
            <PieList />
          </div>
        </Col>
        <Col span={11} className={styles.allPic}>
          <p className={styles.clientLeft}>2018年09月绩效总览</p>
          <p className={styles.clientRight}>绩效总额：￥231.09</p>
          <ul className={styles.listPerform}>
            <li style={{borderRight:'1px solid #dcdcdc'}}>
              <dd>注册公司：￥2.00</dd>
              <dd>注册公司：￥2.00</dd>
              <dd>注册公司：￥2.00</dd>
              <dd>注册公司：￥2.00</dd>
            </li>
            <li style={{borderRight:'1px solid #dcdcdc'}}>
              <dd>银行开户：￥2.00</dd>
              <dd>银行开户：￥2.00</dd>
              <dd>银行开户：￥2.00</dd>
              <dd>银行开户：￥2.00</dd>
            </li>
            <li>
              <dd>国地税报道：￥2.00</dd>
              <dd>国地税报道：￥2.00</dd>
              <dd>国地税报道：￥2.00</dd>
              <dd>国地税报道：￥2.00</dd>
            </li>
          </ul>
          <ul className={styles.region}>
            <li>
              <dd>朝阳区：￥2.00</dd>
              <dd>朝阳区：￥2.00</dd>
              <dd>朝阳区：￥2.00</dd>
            </li>
            <li>
              <dd>东城区：￥2.00</dd>
              <dd>东城区：￥2.00</dd>
              <dd>东城区：￥2.00</dd>
            </li>
            <li>
              <dd>海淀区：￥2.00</dd>
              <dd>海淀区：￥2.00</dd>
              <dd>海淀区：￥2.00</dd>
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col span={23} style={{borderRadius: '5px', border: '1px solid #dcdcdc'}}>
          <Line />
        </Col>
      </Row>
    </div>
    )
  }
}

export default Main
