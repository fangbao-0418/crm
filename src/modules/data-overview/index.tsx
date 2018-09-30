import React from 'react'
import { Row, Col ,Select} from 'antd'
import ContentBox from '@/modules/common/content'
import SearchForm from "../message/components/SearchForm";
const styles = require('./styles/index.styl')
const Option = Select.Option;

// 列表
class Main extends React.Component {
    public constructor (props: any, state: any) {
        super({})
    }

    public handleChange(value:any) {
        console.log(`selected ${value}`);
    }

    public render () {
        return (
            <div className={styles.container}>
                <ContentBox title='数据总览'>
                    <Row>
                        <span>直营：</span>
                        <Select defaultValue="北京" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="上海">上海</Option>
                            <Option value="广州">广州</Option>
                            <Option value="重庆">重庆</Option>
                            <Option value="天津">天津</Option>
                        </Select>
                        {/*<span>省市：</span>
                        <Select defaultValue="邯郸" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="上海">上海</Option>
                            <Option value="广州">广州</Option>
                            <Option value="重庆">重庆</Option>
                            <Option value="天津">天津</Option>
                        </Select>
                        <span>代理商：</span>
                        <Select defaultValue="北京噼哩啪有限公司" style={{ width: 200 }} onChange={this.handleChange}>
                            <Option value="上海">上海</Option>
                            <Option value="广州">广州</Option>
                            <Option value="重庆">重庆</Option>
                            <Option value="天津">天津</Option>
                        </Select>*/}
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className={styles.customer} style={{borderRight:'1px solid #dcdcdc'}}>
                                <Col span={8}>
                                    <p><b>86</b> 家</p>
                                    <h4>客户总数</h4>
                                </Col>
                                <Col span={8}>
                                    <p><b>86</b> 家</p>
                                    <h4>日客户总数</h4>
                                </Col>
                                <Col span={8} className={styles.scale}>
                                    <p>周同比<span style={{color:'red'}}>12% 22</span></p>
                                    <h4>日同比<span style={{color:'#7ed321'}}>-12% 22</span></h4>
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
                                    <p>周同比 <span style={{color:'red'}}> 12% 22</span></p>
                                    <h4>日同比 <span style={{color:'#7ed321'}}> -12% 22</span></h4>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </ContentBox>
                <ContentBox title='数据概览'>
                    <Row>
                        <Select defaultValue="按月查询" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="按月查询">按月查询</Option>
                            <Option value="按年查询">按年查询</Option>
                        </Select>
                        <span>选择月份：</span>
                        <Select defaultValue="2018/09" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="上海">上海</Option>
                            <Option value="广州">广州</Option>
                            <Option value="重庆">重庆</Option>
                            <Option value="天津">天津</Option>
                        </Select>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className={styles.customer} style={{borderRight:'1px solid #dcdcdc'}}>
                                <Col span={8}>
                                    <p><b>86</b> 家</p>
                                    <h4>客户总数</h4>
                                </Col>
                                <Col span={8}>
                                    <p><b>86</b> 家</p>
                                    <h4>日客户总数</h4>
                                </Col>
                                <Col span={8} className={styles.scale}>
                                    <p>周同比<span style={{color:'red'}}>12% 22</span></p>
                                    <h4>日同比<span style={{color:'#7ed321'}}>-12% 22</span></h4>
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
                                    <p>周同比 <span style={{color:'red'}}> 12% 22</span></p>
                                    <h4>日同比 <span style={{color:'#7ed321'}}> -12% 22</span></h4>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </ContentBox>
            </div>
        )
    }
}
export default Main
