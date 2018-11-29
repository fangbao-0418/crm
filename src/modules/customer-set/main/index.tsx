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
  tab: '1' | '2'
}
const styles = require('./style')
class Main extends React.Component<null, States> {
  public res: any = []
  public cityCodeArr = ''
  public state: States = {
    cityCodes: [],
    agencyName: '',
    tab: '1'
  }
  public callBack (value: any) {
    this.setState({
      tab: value
    })
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
    const cityCodes = this.state.cityCodes
    const codes: string[] = []
    cityCodes.forEach((item) => {
      codes.push(item.key)
    })
    const cityCodeArr = codes.join(',')
    if (cityCodeArr !== this.cityCodeArr) {
      this.cityCodeArr = cityCodeArr
      changeCapacityAction(cityCodeArr, res)
    }
    changeCapacityAction(cityCodeArr, res)
  }
  public render () {
    const {cityCodes, agencyName, tab } = this.state
    console.log(cityCodes, 'index')
    return (
      <ContentBox
        className={styles.container}
        title='客户设置'
      >
        <Tabs
          className={styles.lab}
          animated={false}
          defaultActiveKey='1'
          onChange={this.callBack.bind(this)}
        >
          <Row style={{marginBottom: 10}}>
            <Col span={7}>
              <Region onChange={this.handleRegionChange.bind(this)} />
            </Col>
            <Col span={4} style={{marginLeft: -30}}>
              <span style={tab === '2' ? {display: 'block'} : {display: 'none'}}>
                <label>机构</label>
                <Input style={{width: 160}} onChange={(e) => this.handleAgencyChange(e.target.value)}/>
              </span>
            </Col>
          </Row>
          {
            APP.hasPermission('crm_set_customer_auto_distribute_list') &&
            <Tabs.TabPane tab='自动分配设置' key='1'>
              {tab === '1' && <SetAuto cityCodes={cityCodes} />}
            </Tabs.TabPane>
          }
          {
            APP.hasPermission('crm_set_customer_storage_list') &&
            <Tabs.TabPane tab='库容设置' key='2'>
              {tab === '2' && <SetCapacity cityCodes={cityCodes} agencyName={agencyName}/>}
            </Tabs.TabPane>
          }
        </Tabs>
      </ContentBox>
    )
  }
}
export default Main
