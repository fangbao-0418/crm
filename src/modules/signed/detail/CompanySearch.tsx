import React from 'react'
import { Input } from 'antd'
import { fetchTianYanCompanyList } from '@/modules/common/api'
import { SearchProps } from 'antd/lib/input/Search'
import classNames from 'classnames'
import _ from 'lodash'
const styles = require('./style')
interface Props extends SearchProps {
  style?: React.CSSProperties
  value?: string
  onSelectCompany?: (item?: Customer.TianYanDataProps) => void
}
interface State {
  tianyanDataSource: Customer.TianYanDataProps[]
  visible: boolean
}
class Main extends React.Component<Props, State> {
  public state: State = {
    tianyanDataSource: [],
    visible: false
  }
  public throttleCompanySearch = _.throttle(this.onCompanySearch.bind(this), 1000)
  public onCompanySearch (value: string) {
    if (this.props.disabled) {
      return
    }
    if (!value) {
      return false
    }
    fetchTianYanCompanyList(value).then((res) => {
      if (value === res.name) {
        this.setState({
          tianyanDataSource: res.data,
          visible: true
        })
      }
    })
  }
  public handleItemClick (item: Customer.TianYanDataProps) {
    this.setState({
      visible: false
    })
    if (this.props.onSelectCompany) {
      this.props.onSelectCompany(item)
    }
  }
  public render () {
    const { tianyanDataSource } = this.state
    return (
      <div
        className={classNames(styles['company-search'], this.props.className)}
      >
        <Input.Search
          style={this.props.style}
          onSearch={this.onCompanySearch.bind(this)}
          onClick={() => {
            this.setState({
              visible: !this.state.visible
            })
          }}
          value={this.props.value}
          {...this.props}
          onChange={(e) => {
            this.throttleCompanySearch(e.target.value)
            if (this.props.onChange) {
              this.props.onChange(e)
            }
          }}
        />
        {
          tianyanDataSource.length > 0 &&
          <ul
            hidden={!this.state.visible}
          >
            {
              tianyanDataSource.map((item, index) => {
                return (
                  <li
                    key={`tianyan-company-${index}`}
                    onClick={this.handleItemClick.bind(this, item)}
                  >
                    {item.name}
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
