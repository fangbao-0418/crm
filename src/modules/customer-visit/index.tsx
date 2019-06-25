import React from 'react'
import { Select } from 'antd'
import classnames from 'classnames'
import Profile from '@/modules/common/company-detail/Profile'
import { changeCustomerDetailAction } from '@/modules/customer/action'
const styles = require('./style')
interface State {
  anencyId?: string
  customerId?: string
  companyList?: Array<{id?: string, name?: string}>
  customerList?: Array<{id?: string, customerName?: string, agencyName?: string}>
}
class Main extends React.Component {
  public state: State = {
    companyList: [{id: '1', name: '北京'}],
    customerList: [{id: '593099308379668480', customerName: '北京', agencyName: '121212'}, {id: '592755525066686464', customerName: '北12京', agencyName: 'aaa'}]
  }
  public fetchData () {
    changeCustomerDetailAction(this.state.customerId)
  }
  public render () {
    return (
      <div className={styles.box}>
        <div className={styles.search}>
          <Select
            className={classnames(styles.select, 'mr5')}
            showSearch
            allowClear
            value={this.state.anencyId}
            placeholder='请选择机构'
            optionFilterProp='children'
            filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(value?: string) => {
              this.setState({
                anencyId: value
              })
            }}
          >
            {
              this.state.companyList.map((item) => {
                return (
                  <Select.Option key={item.id}>{item.name}</Select.Option>
                )
              })
            }
          </Select>
          <Select
            className={styles.select}
            showSearch
            allowClear
            value={this.state.customerId}
            placeholder='请输入客户名称/联系电话'
            onChange={(value?: string) => {
              console.log(value, 'value')
              this.setState({
                customerId: value
              }, () => {
                this.fetchData()
              })
            }}
          >
            {
              this.state.customerList.map((item) => {
                return (
                  <Select.Option key={item.id}>
                    {
                      this.state.customerId ?
                      <div>
                        <span>{item.customerName}</span>
                        <span>{'(' + item.agencyName + ')'}</span>
                      </div>
                      :
                      <div>
                        <div>{item.customerName}</div>
                        <div className={styles.color}>
                          <span>机构：</span>
                          <span>{item.agencyName}</span>
                        </div>
                      </div>
                    }
                  </Select.Option>
                )
              })
            }
          </Select>
        </div>
        {
          this.state.customerId &&
          <div>
            <div className={styles['top-info']}>
              <Profile type='signed'/>
            </div>
            <div></div>
          </div>
        }
      </div>
    )
  }
}
export default Main
