import React from 'react'
import { Tag, DatePicker } from 'antd'
const { RangePicker } = DatePicker
const { CheckableTag } = Tag
const styles = require('./style')
export interface ConditionOptionProps {
  label: string[]
  options: Array<{label: string, value: string}>
  field?: string
  value?: string
  type?: 'date'
}
interface Props {
  dataSource?: ConditionOptionProps[]
  onChange?: (values?: {[field: string]: any}) => void
}
class Main extends React.Component<Props> {
  public state = {
    dataSource: this.props.dataSource
  }
  public handleChange (index: number, value: string) {
    const { dataSource } = this.state
    dataSource[index].value = value
    this.setState({
      dataSource
    })
    const values: {[field: string]: any} = {}
    dataSource.forEach((item) => {
      values[item.field] = item.value
    })
    if (this.props.onChange) {
      this.props.onChange(values)
    }
  }
  public getAfterNodes (index: number) {
    const { dataSource } = this.state
    const item = dataSource[index]
    let node: JSX.Element = null
    console.log(item.type, 'getAgerNodes')
    if (item.type === 'date') {
      node = (
        <div className={styles.after}>
          <span>开始结束时间</span>
          <RangePicker
            format={'YYYY-MM-DD'}
            onChange={(current) => {
              console.log(current)
              item.value = [current[0].format('YYYY-MM-DD'), current[1].format('YYYY-MM-DD')].join('至')
              this.handleChange(index, item.value)
            }}
          />
        </div>
      )
    }
    return node
  }
  public getChildNodes () {
    const nodes: JSX.Element[] = []
    const { dataSource } = this.state
    dataSource.forEach((item, index) => {
      const options = item.options
      const tagNodes: JSX.Element[] = []
      options.forEach((item2) => {
        tagNodes.push(
          <div className={styles.tag}>
            <CheckableTag
              children={item2.label}
              checked={item2.value === item.value}
              onChange={this.handleChange.bind(this, index, item2.value)}
            />
          </div>
        )
      })
      tagNodes.push(
        this.getAfterNodes(index)
      )
      nodes.push(
        <li>
          <label className={styles.label}>{item.label[0]}</label>
          <div className={styles.options}>
            {tagNodes}
          </div>
        </li>
      )
    })
    return nodes
  }
  public render () {
    return (
      <div className={styles.container}>
        <ul>
          {this.getChildNodes()}
        </ul>
        {/* xxx */}
      </div>
    )
  }
}
export default Main
