import React from 'react'
import { Input } from 'antd'
import { getCustomerList } from './api'
import { SearchProps } from 'antd/lib/input/Search'
import classNames from 'classnames'
import _ from 'lodash'
const styles = require('./style')
interface Props extends SearchProps {
  style?: React.CSSProperties
  value?: string
  agencyId?: string
  onSelectCompany?: (item?: {id: string, customerOrgName: string, agencyName: string}) => void
}
interface State {
  customerList?: Array<{id?: string, customerOrgName?: string, agencyName?: string}>
  visible: boolean
  value?: string
}
class Main extends React.Component<Props, State> {
  public state: State = {
    customerList: [],
    visible: false,
    value: this.props.value
  }
  public componentWillReceiveProps (props: Props) {
    if (this.props.agencyId !== props.agencyId) {
      this.setState({
        value: '',
        customerList: []
      })
    }
  }
  public onCompanySearch (value: string) {
    if (!value) {
      return false
    }
    getCustomerList(value, this.props.agencyId).then((res) => {
      this.setState({
        customerList: res.data,
        visible: true
      })
    })
  }
  public handleItemClick (item: {id: string, customerOrgName: string, agencyName: string}) {
    this.setState({
      visible: false
    })
    this.setState({
      value: item.customerOrgName
    })
    if (this.props.onSelectCompany) {
      this.props.onSelectCompany(item)
    }
  }
  public render () {
    const { customerList } = this.state
    return (
      <div
        className={classNames(styles['company-search'], this.props.className)}
      >
        <Input.Search
          placeholder='请输入客户名称/联系电话'
          style={this.props.style}
          onSearch={(value) => {this.onCompanySearch(value)}}
          onClick={() => {
            this.setState({
              visible: !this.state.visible
            })
          }}
          value={this.state.value}
          onChange={(e) => {
            this.setState({
              value: e.target.value
            })
          }}
        />
        {
          customerList.length > 0 &&
          <ul
            hidden={!this.state.visible}
          >
            {
              customerList.map((item, index) => {
                return (
                  <li
                    key={item.id}
                    onClick={this.handleItemClick.bind(this, item)}
                  >
                    <div>{item.customerOrgName}</div>
                    <div className={styles.color}>
                      <span>机构：</span>
                      <span>{item.agencyName}</span>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        }
      </div>
    )
  }
}
export default Main
