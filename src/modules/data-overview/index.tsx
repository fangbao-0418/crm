import React from 'react'
import { Row, Col, Select,  DatePicker, List, Card, Icon } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'
import ContentBox from '@/modules/common/content'
import { fetchListAction } from './action'
import { total } from './api'
import PieList from '@/modules/data-overview/views/pie'
import Line from '@/modules/data-overview/views/line'
import { userLogin } from '@/modules/common/api'
const styles = require('./styles/index.styl')
type OverviewLine = Statistics.ItemLineProps
type OverviewPie = Statistics.ItemPieProps
type OverviewProps = Statistics.NumberProps
const Option = Select.Option
const { MonthPicker } = DatePicker
const monthFormat = 'YYYY/MM'
const monthFormatYear = 'YYYY'
interface States {
  cities: any,
  secondCity: any
  isabled: boolean
}
const provinceData: any = ['河北', '河南']
const cityData: any = {
  河北: ['邯郸', '秦皇岛', '廊坊'],
  河南: ['信阳', '郑州', '南阳']
}
// 列表
class Main extends React.Component<Statistics.Props, any> {
  public values: Statistics.OverViewSearchPayload = {
    customerId: '2001',
    dateFlag: 'YEAR',
    date:'2018-10-10'
  }
  public constructor (props: any) {
    super(props)
    this.state = {
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
      numberList:[1, 2, 3],
      isabled: false
    }
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
  public componentWillMount () {
    this.fetchData()
    this.fetchUpDate()
  }
  public fetchData () {
    fetchListAction(this.values)
  }
  public fetchUpDate () {
    total({
      customerId:this.values.customerId
    })
  }
  public render () {
    const { companyProps, taskSumRewardList, allProps, dataLineList, areaSumRewardList, overView } = this.props
    const { cities, numberList, isabled } = this.state
    const { type } = overView
    return (
    <div className={styles.container}>
      <ContentBox title='数据总览'>
      <Row className={styles.tab}>
        <Select
          defaultValue='按月查询'
          className={styles.selected}
          style={{width: 120}}
          onChange={(value: any) => {
            this.values.dateFlag = value
            APP.dispatch<Statistics.Props>({
              type: 'change screen data',
              payload: {
                overView: {
                  type: value
                }
              }
            })
            this.fetchData()
          }}
        >
          <Option key='MONTH'>
            按月查询
          </Option>
          <Option key='YEAR'>
            按年查询
          </Option>
        </Select>
        {
          type === 'MONTH' ? (
            <MonthPicker
              placeholder='请选择月份'
              className={styles.selected}
              format={monthFormat}
            />
          ) : (
            <Select
              defaultValue='2015年'
              className={styles.selected}
              onChange={(value: string) => {
                this.values.date = value
                this.fetchData()
              }}
            >
              <Option value='2015年'>2015年</Option>
              <Option value='2016年'>2016年</Option>
              <Option value='2017年'>2017年</Option>
              <Option value='2018年'>2018年</Option>
            </Select>
          )
        }
        <Select
          defaultValue='北京直营'
          className={styles.selected}
          style={{width: 120}}
          onChange={() => {}}
        >
          <Option value='上海'>上海</Option>
          <Option value='广州'>广州</Option>
          <Option value='重庆'>重庆</Option>
          <Option value='天津'>天津</Option>
        </Select>
        <Select
          placeholder='请选择省份'
          className={styles.selected}
          onChange={this.handleProvinceChange}
        >
         {provinceData.map((province: any) =>
          <Option key={province}>{province}</Option>)}
        </Select>
        <Select
          className={styles.selected}
          value={this.state.secondCity}
          onChange={this.onSecondCityChange}
        >
        {cities.map((city: any) => <Option key={city}>{city}</Option>)}
        </Select>
        <Select
           placeholder='请选择代理商'
           className={styles.selected}
           onChange={() => {}}
        >
          <Option value='河北'>河北</Option>
          <Option value='安徽'>安徽</Option>
          <Option value='河南'>河南</Option>
        </Select>
      </Row>
      <Row>
        <Col span={12}>
        <div className={styles.customer} style={{borderRight: '1px solid #dcdcdc'}}>
          <Col span={8}>
          <p><b>{allProps.customerTotal}</b> 个</p>
          <h4>任务总数</h4>
          </Col>
          <Col span={8}>
          <p><b>{companyProps.customerTodayTotal}</b> 个</p>
          <h4>日任务总数</h4>
          </Col>
          <Col span={8} className={styles.scale}>
          <h4>周同比
            <span style={{color: 'red', marginLeft:'14px'}}>
            {companyProps.customerTotalWeekIncrease}%
            <Icon type='caret-up' theme='filled' />
            </span>
          </h4>
          <h4>日同比
            <span style={{color: '#7ed321', marginLeft:'14px'}}>
            -{companyProps.customerTotalDayIncrease}%
            <Icon type='caret-down' theme='filled' />
            </span>
          </h4>
          </Col>
        </div>
        </Col>
        <Col span={12}>
        <div className={styles.customer}>
          <Col span={8}>
          <p><b>{allProps.rewardTotal}</b> 元</p>
          <h4>绩效总额</h4>
          </Col>
          <Col span={8}>
          <p><b>{companyProps.todayRewardTotal}</b> 元</p>
          <h4>日绩效</h4>
          </Col>
          <Col span={8} className={styles.scale}>
          <h4>
            周同比
            <span style={{color: 'red', marginLeft:'14px'}}>
            {companyProps.rewardWeekIncrease}%
            <Icon type='caret-up' theme='filled' />
            </span>
          </h4>
          <h4>
            日同比
            <span style={{color: '#7ed321', marginLeft:'14px'}}>
            -{companyProps.rewardDayIncrease}%
            <Icon type='caret-down' theme='filled' />
            </span>
          </h4>
          </Col>
        </div>
        </Col>
      </Row>
      <Row className={styles.listLeft}>
        <Col span={11} className={styles.allPic} style={{marginRight:'42px'}}>
          <p className={styles.clientLeft}>{this.values.dateFlag}任务总览</p>
          <p className={styles.clientRight}>任务总数：{allProps.customerTotal}</p>
          <div className={styles.pic}>
            <PieList />
          </div>
        </Col>
        <Col span={11} className={styles.allPic}>
          <p className={styles.clientLeft}>{this.values.dateFlag}绩效总览</p>
          <p className={styles.clientRight}>绩效总额：￥{allProps.rewardTotal}</p>
          <div style={{clear:'both'}}>
            <ul className={styles.listPerform}>
              {(dataLineList && dataLineList.length > 0) ? <div>
                <li key={numberList.index}>
                  {taskSumRewardList.map((item, index) => {
                    const { taskName, reward } = item
                    return  <dd key={index}>{taskName}：￥{reward}</dd>
                  })}
                </li>
              </div> : <ul className={styles.listPerform}>暂无名称数据</ul>}
            </ul>
          </div>
          <ul className={styles.region}>
            {(areaSumRewardList && areaSumRewardList.length > 0) ? <div>
              <li key={numberList.index}>
                {areaSumRewardList.map((item, index) => {
                  const { areaName, reward } = item
                  return  <dd key={index}>{areaName}：￥{reward}</dd>
                })}
              </li>
            </div> : <li key={numberList.index}>暂无区域数据</li>}
          </ul>
        </Col>
      </Row>
      {
          type === 'YEAR' ? (
          <Row>
            <Col span={23} style={{borderRadius: '5px', border: '1px solid #dcdcdc'}}>
              <Line />
            </Col>
          </Row>
          ) : ''}
      </ContentBox>}
    </div>
    )
  }
}

export default connect((state: Reducer.State) => {
  return state.statistics
})(Main)
