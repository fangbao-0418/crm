import React from 'react'
import { Input } from 'antd'
import { fetchTianYanCompanyList } from '@/modules/common/api'
import { SearchProps } from 'antd/lib/input/Search'
import classNames from 'classnames'
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
  public onCompanySearch (value: string) {
    if (this.props.disabled) {
      return
    }
    if (!value) {
      return false
    }
    fetchTianYanCompanyList(value).then((res) => {
      this.setState({
        tianyanDataSource: res,
        visible: true
      })
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
