import React from 'react'
import { Input } from 'antd'
import { fetchTianYanCompanyList, fetchTianYanDetail } from '@/modules/common/api'
import { SearchProps } from 'antd/lib/input/Search'
const styles = require('./style')
interface Props extends SearchProps {
  style?: React.CSSProperties
  value?: string
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
    fetchTianYanCompanyList(value).then((res) => {
      this.setState({
        tianyanDataSource: res.body,
        visible: true
      })
    })
  }
  public handleItemClick (item: Customer.TianYanDataProps) {
    fetchTianYanDetail(item.id).then((res) => {
      console.log(res)
    })
    this.setState({
      visible: false
    })
  }
  public render () {
    const { tianyanDataSource } = this.state
    return (
      <div className={styles['company-search']}>
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
      </div>
    )
  }
}
export default Main
