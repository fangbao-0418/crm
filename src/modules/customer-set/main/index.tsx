import React from 'react'
import { Tabs, Input, Row, Col } from 'antd'
import ContentBox from '@/modules/common/content'
import SetAuto from '@/modules/customer-set/main/SetAuto'
import SetCapacity from '@/modules/customer-set/main/SetCapacity'
import Region from './Region'
import { changeCapacityAction } from '../actions'
import { fetchStorageCapacity } from '../api'
interface States {
  cityCodes: {key: string, label: string}[]
  agencyName: string
}
const styles = require('./style')
class Main extends React.Component<null, States> {
  public res: any = []
  public state: States = {
    cityCodes: [],
    agencyName: ''
  }
  public handleRegionChange (value: any) {
    this.setState({
      cityCodes: value
    })
  }
  public handleAgencyChange (res: string) {
    this.setState({
      agencyName: res
    })
    changeCapacityAction('', res)
  }
  public render () {
    const {cityCodes, agencyName} = this.state
    console.log(cityCodes, 'index')
    return (
      <ContentBox
        className={styles.container}
        title='客户设置'
      >
        <Tabs
          animated={false}
          defaultActiveKey='1'
          // onChange={this.callback}
        >
          {
            APP.hasPermission('crm_set_customer_auto_distribute_list') &&
            <Tabs.TabPane tab='自动分配设置' key='1'>
              <Region onChange={this.handleRegionChange.bind(this)} />
              <SetAuto cityCodes={cityCodes} />
            </Tabs.TabPane>
          }
          {
            APP.hasPermission('crm_set_customer_storage_list') &&
            <Tabs.TabPane tab='库容设置' key='2'>
              <Row>
                <Col span={7}>
                  <Region onChange={this.handleRegionChange.bind(this)} />
                </Col>
                <Col span={7} style={{marginLeft: -30}}>
                  <label>机构</label>
                  <Input style={{width: 160}} onChange={(e) => this.handleAgencyChange(e.target.value)}/>
                </Col>
              </Row>
              <SetCapacity cityCodes={cityCodes} agencyName={agencyName}/>
            </Tabs.TabPane>
          }
        </Tabs>
      </ContentBox>
    )
  }
}
export default Main
