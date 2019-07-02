import React from 'react'
import { Select, Tabs } from 'antd'
import classNames from 'classnames'
import CustomerSearch from './CustomerSearch'
import Profile from '@/modules/common/company-detail/Profile'
import OrderInfo from './OrderInfo'
import Record from '@/modules/customer/Record'
import WorkList from './WorkList'
import OperateList from './OperateList'
import CustomerVisit from './CustomerVisit'
import OrderVisit from './OrderVisit'
import ServiceVisit from './ServiceVisit'
import { changeCustomerDetailAction } from '@/modules/customer/action'
import Detail from './Customer'
import { getCustomerList, saveRecords } from './api'
import { fetchAllCompanyList } from '@/modules/common/api'
const styles = require('./style')
interface State {
  agencyId?: string
  defaultName?: string
  customerId?: string
  companyList?: Array<{id?: string, name?: string}>
  menu: Array<{value: number, label: string}>
  /** 当前选中的左侧菜单 */
  curKey: number
  /** 填写回访默认tab */
  defaultKey?: string
}
class Main extends React.Component {
  public state: State = {
    curKey: 1,
    defaultName: '',
    defaultKey: '1',
    menu: [{
      value: 1,
      label: '客户信息'
    }, {
      value: 2,
      label: '订单信息'
    }, {
      value: 3,
      label: '工单信息'
    }, {
      value: 4,
      label: '操作'
    }],
    companyList: []
  }
  public componentWillMount () {
    this.getCompanies()
    console.log(APP.user.userType !== 'System', '11111')
    if (APP.user.userType !== 'System') {
      this.setState({
        agencyId: APP.user.companyId
      })
    }
  }
  public fetchData () {
    changeCustomerDetailAction(this.state.customerId)
  }
  public getCompanies () {
    fetchAllCompanyList().then((res) => {
      this.setState({
        companyList: res
      })
    })
  }
  public onOk (params: CustomerVisit.Search) {
    params.customerId = this.state.customerId
    console.log(params)
    saveRecords(params).then(() => {
      changeCustomerDetailAction(this.state.customerId)
    })
  }
  public render () {
    const disabled = APP.user.userType === 'System' ? false : true
    console.log(this.state.agencyId, 'this.state.agencyId')
    return (
      <div className={styles.box}>
        <div className={styles.search}>
          <Select
            disabled={disabled}
            className={classNames(styles.select, 'mr5')}
            showSearch
            allowClear
            value={this.state.agencyId}
            placeholder='请选择机构'
            optionFilterProp='children'
            filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(value?: string) => {
              this.setState({
                agencyId: value
              })
            }}
          >
            {
              this.state.companyList.length && this.state.companyList.map((item) => {
                return (
                  <Select.Option key={String(item.id)}>{item.name}</Select.Option>
                )
              })
            }
          </Select>
          <CustomerSearch
            className='inline-block'
            agencyId={this.state.agencyId}
            style={{width: '250px'}}
            value={this.state.defaultName}
            onSelectCompany={(item) => { // 选择完客户查询客户详情 需要设置全局customerId 及查询
              this.setState({
                customerId: item.id
              }, () => {
                this.fetchData()
              })
            }}
          />
        </div>
        {
          this.state.customerId &&
          <div>
            <div className={styles['top-info']}>
              <Profile type='signed'/>
            </div>
            <div className={classNames('mt15', 'clear')}>
              <div className={classNames(styles['left-con'], 'fl')}>
                <div className='clear'>
                  <div className='fl'>
                    {
                      this.state.menu.length > 0 && this.state.menu.map((item, index) => {
                        return (
                          <div
                            key={item.value}
                            className={classNames(styles.menu, item.value === this.state.curKey ? styles.focus : '')}
                            onClick={() => {
                              this.setState({
                                curKey: item.value
                              })
                            }}
                          >
                            {item.label}
                          </div>
                        )
                      })
                    }
                  </div>
                  {
                    this.state.curKey === 1 &&
                    <div className={classNames(styles.con, 'fl')}>
                      <Detail/>
                    </div>
                  }
                  {
                    this.state.curKey === 2 &&
                    <div className={classNames(styles.con, 'fl')}>
                      <OrderInfo customerId={this.state.customerId}/>
                    </div>
                  }
                  {
                    this.state.curKey === 3 &&
                    <div className={classNames(styles.con, 'fl', 'mt15')}>
                      <WorkList customerId={this.state.customerId}/>
                    </div>
                  }
                  {
                    this.state.curKey === 4 &&
                    <div className={classNames(styles.con, 'fl', 'mt15')}>
                      <OperateList customerId={this.state.customerId}/>
                    </div>
                  }
                </div>
              </div>
              <div className={classNames(styles['right-con'], 'fr')}>
                <div className={styles['visit-con']}>
                  <Tabs defaultActiveKey={this.state.defaultKey} onChange={(key) => {this.setState({defaultKey: key})}}>
                    <Tabs.TabPane tab='客资回访' key='1'>
                      <CustomerVisit onOk={(params: CustomerVisit.Search) => this.onOk(params)}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='订单回访' key='2'>
                      <OrderVisit onOk={(params: CustomerVisit.Search) => this.onOk(params)}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='服务回访' key='3'>
                      <ServiceVisit onOk={(params: CustomerVisit.Search) => this.onOk(params)}/>
                    </Tabs.TabPane>
                  </Tabs>
                </div>
                <div className={classNames(styles['records-con'], 'mt15')}>
                  <Record
                    type='visit'
                    customerId={this.state.customerId}
                    height={180}
                  />
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
export default Main
