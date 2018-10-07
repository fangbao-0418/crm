import React from 'react'
import { Row, Col, Select } from 'antd'
import ContentBox from '@/modules/common/content'
import PieList from '@/modules/data-overview/views/pie'
import Line from '@/modules/data-overview/views/line'

const styles = require('./styles/index.styl')
const Option = Select.Option
const option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
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
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
    {value: 335, name: '直接访问'},
    {value: 310, name: '邮件营销'},
    {value: 234, name: '联盟广告'},
    {value: 135, name: '视频广告'},
    {value: 1548, name: '搜索引擎'}
      ]
    }
  ]
}

// 列表
class Main extends React.Component {
  public constructor (props: any, state: any) {
    super({})
  }

  /*public componentWillMount(){
		  const el: any = this.refs.pie
		  const myChart = echarts.init(el)
		  myChart.setOption(option)
  }*/

  public handleChange (value: any) {
    console.log(`selected ${value}`)
  }

  public render () {
    return (
    <div className={styles.container}>
      <ContentBox title='数据总览'>
      <Row>
        <span>直营：</span>
        <Select defaultValue='北京' style={{width: 120}} onChange={this.handleChange}>
        <Option value='上海'>上海</Option>
        <Option value='广州'>广州</Option>
        <Option value='重庆'>重庆</Option>
        <Option value='天津'>天津</Option>
        </Select>
      </Row>
      <Row>
        <Col span={12}>
        <div className={styles.customer} style={{borderRight: '1px solid #dcdcdc'}}>
          <Col span={8}>
          <p><b>86</b> 家</p>
          <h4>客户总数</h4>
          </Col>
          <Col span={8}>
          <p><b>86</b> 家</p>
          <h4>日客户总数</h4>
          </Col>
          <Col span={8} className={styles.scale}>
          <p>周同比<span style={{color: 'red'}}>12% 22</span></p>
          <h4>日同比<span style={{color: '#7ed321'}}>-12% 22</span></h4>
          </Col>
        </div>
        </Col>
        <Col span={12}>
        <div className={styles.customer}>
          <Col span={8}>
          <p><b>1200.00</b> 元</p>
          <h4>绩效总额</h4>
          </Col>
          <Col span={8}>
          <p><b>8600.00</b> 元</p>
          <h4>日绩效</h4>
          </Col>
          <Col span={8} className={styles.scale}>
          <p>周同比 <span style={{color: 'red'}}> 12% 22</span></p>
          <h4>日同比 <span style={{color: '#7ed321'}}> -12% 22</span></h4>
          </Col>
        </div>
        </Col>
      </Row>
      </ContentBox>
      <ContentBox title='数据概览'>
      <Row>
        <Select defaultValue='按月查询' style={{width: 120}} onChange={this.handleChange}>
        <Option value='按月查询'>按月查询</Option>
        <Option value='按年查询'>按年查询</Option>
        </Select>
        <span style={{display:'inline-block', marginLeft:'16px'}}>选择月份：</span>
        <Select defaultValue='2018/09' style={{width: 120}} onChange={this.handleChange}>
        <Option value='上海'>上海</Option>
        <Option value='广州'>广州</Option>
        <Option value='重庆'>重庆</Option>
        <Option value='天津'>天津</Option>
        </Select>
      </Row>
      <Row className={styles.listLeft}>
        <Col span={10} style={{borderRadius: '5px', border: '1px solid #dcdcdc', height:'300px'}}>
        <p style={{float: 'left'}}>2018年09月客户总览</p>
        <p style={{float: 'right'}}>客户总数：1000</p>
        <div className={styles.pic}>
          <PieList />
        </div>
        </Col>
        <Col span={10} offset={3} style={{borderRadius: '5px', border: '1px solid #dcdcdc', height:'300px'}}>
          <p style={{float: 'left'}}>2018年09月绩效总览</p>
          <p style={{float: 'right'}}>绩效总额：￥231.09</p>
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
          <ul className={styles.listPerform} style={{borderTop:'1px solid #dcdcdc'}}>
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
      </ContentBox>
    </div>
    )
  }
}

export default Main
