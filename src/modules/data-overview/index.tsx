import React from 'react'
import { Row, Col, Select, Icon, DatePicker, Tabs } from 'antd'
import moment from 'moment'
import { Link, withRouter } from 'react-router-dom'
import {HashRouter as Router, Route, Switch } from 'react-router-dom'
import ContentBox from '@/modules/common/content'
import PieList from '@/modules/data-overview/views/pie'
import Line from '@/modules/data-overview/views/line'
const styles = require('./styles/index.styl')
const TabPane = Tabs.TabPane
const Option = Select.Option
const { MonthPicker } = DatePicker
const monthFormat = 'YYYY/MM'
interface States {
  cities: any,
  secondCity: any
}
const provinceData: any = ['河北', '河南']
const cityData: any = {
  河北: ['邯郸', '秦皇岛', '廊坊'],
  河南: ['信阳', '郑州', '南阳']
}
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
function callback (key: any) {
  console.log(key)
}

class Main extends React.Component<any, any> {
  public constructor (props: any, state: any) {
    super(props)
    this.state = {
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0]
    }
  }
  public handleChange (value: any) {
    console.log(`selected ${value}`)
  }
  public handleProvinceChange = (value: any) => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0]
    })
  }
  public onSecondCityChange = (value: any) => {
    this.setState({
      secondCity: value
    })
  }
  public changeTabPosition = (tabPosition: any) => {
    this.setState({ tabPosition })
  }
  public render () {
    const { cities } = this.state
    return (
    <div className={styles.container}>
      <ContentBox title='数据总览'>
      <Row className={styles.tab}>
        <span>直营：</span>
        <Select defaultValue='北京' style={{width: 120}} onChange={this.handleChange}>
        <Option value='上海'>上海</Option>
        <Option value='广州'>广州</Option>
        <Option value='重庆'>重庆</Option>
        <Option value='天津'>天津</Option>
        </Select>
        <div className={styles.couplet}>
          <span className={styles.city}>省份: </span>
          <Select
            defaultValue={provinceData[0]}
            style={{ width: 120 }}
            onChange={this.handleProvinceChange}
          >
          {provinceData.map((province: any) => <Option key={province}>{province}</Option>)}
          </Select>
          <span className={styles.city}>城市：</span>
          <Select
            style={{ width: 120 }}
            value={this.state.secondCity}
            onChange={this.onSecondCityChange}
          >
          {cities.map((city: any) => <Option key={city}>{city}</Option>)}
          </Select>
          <span className={styles.city}>代理商：</span>
          <Select defaultValue='河北' style={{ width: 120 }} onChange={this.handleChange}>
            <Option value='河北'>河北</Option>
            <Option value='安徽'>安徽</Option>
            <Option value='河南'>河南</Option>
          </Select>
        </div>
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
          <h4>周同比<span style={{color: 'red', marginLeft:'14px'}}>12%<Icon type='caret-up' theme='filled' /></span></h4>
          <h4>日同比<span style={{color: '#7ed321', marginLeft:'14px'}}>-12%<Icon type='caret-down' theme='filled' /></span></h4>
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
          <p><b>860.00</b> 元</p>
          <h4>日绩效</h4>
          </Col>
          <Col span={8} className={styles.scale}>
          <h4>周同比 <span style={{color: 'red', marginLeft:'14px'}}> 12% <Icon type='caret-up' theme='filled' /></span></h4>
          <h4>日同比 <span style={{color: '#7ed321', marginLeft:'14px'}}> -12% <Icon type='caret-down' theme='filled' /></span></h4>
          </Col>
        </div>
        </Col>
      </Row>
      </ContentBox>
      <ContentBox title='数据概览'>
      <Row style={styles.query}>
        <Select defaultValue='按月查询' style={{width: 120}} onChange={this.handleChange}>
          <Option value='按月查询'>按月查询</Option>
          <Option value='按年查询'>按年查询</Option>
        </Select>
        <span style={{margin:'0 10px 0 16px'}}>选择月份：</span>
        <MonthPicker defaultValue={moment('2018/01', monthFormat)} format={monthFormat} />
      </Row>
      {/* <div>
        <Tabs onChange={callback} type='card'>
          <TabPane tab='Tab 1' key='1'>Content of Tab Pane 1</TabPane>
          <TabPane tab='Tab 2' key='2'>Content of Tab Pane 2</TabPane>
          <TabPane tab='Tab 3' key='3'>Content of Tab Pane 3</TabPane>
        </Tabs>
      </div> */}
      <Row className={styles.listLeft}>
        <Col span={11} className={styles.allPic} style={{marginRight:'42px'}}>
          <p className={styles.clientLeft}>2018年09月客户总览</p>
          <p className={styles.clientRight}>客户总数：1000</p>
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
      </ContentBox>
    </div>
    )
  }
}

export default Main
