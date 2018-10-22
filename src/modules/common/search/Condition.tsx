import React from 'react'
import { Tag, DatePicker, Menu, Dropdown, Icon } from 'antd'
import DropDown from 'pilipa/libs/dropdown'
import classNames from 'classnames'
const { RangePicker } = DatePicker
const { CheckableTag } = Tag
const styles = require('./style')
export interface ConditionOptionProps {
  label: string[]
  options: Array<{label: string, value: string}>
  field: string
  value?: string
  type?: 'date' | 'select' | 'month'
}
interface ValueProps {
  [field: string]: {label: string, value: string}
}
interface Props {
  dataSource?: ConditionOptionProps[]
  onChange?: (values?: {[field: string]: any}) => void
  style?: React.CSSProperties
  className?: string
}
interface States {
  dataSource: ConditionOptionProps[]
  labels: {[field: string]: string}
  values: ValueProps
}
class Main extends React.Component<Props> {
  public state: States = {
    dataSource: this.props.dataSource,
    labels: this.getLabels(),
    values: this.getValues()
  }
  public componentWillReceiveProps (props: Props) {
    this.setState({
      dataSource: props.dataSource,
      labels: this.getLabels(props.dataSource)
    })
  }
  public getValues () {
    const values: ValueProps = {}
    const dataSource = this.props.dataSource
    dataSource.forEach((item) => {
      const { field, options } = item
      values[field] = options[0]
    })
    return values
  }
  public getLabels (dataSource = this.props.dataSource): {[field: string]: string} {
    const labels: {[field: string]: string} = this.state ? this.state.labels || {} : {}
    dataSource.forEach((item) => {
      labels[item.field] = labels[item.field] || item.label[0]
    })
    // console.log(labels, 'labels')
    return labels
  }
  public handleChange (index: number, value: string) {
    const { dataSource, labels } = this.state
    dataSource[index].value = value
    this.setState({
      dataSource
    })
    const values: {[field: string]: any} = {}
    dataSource.forEach((item, index2) => {
      values[item.field] = {
        value: item.value,
        label: labels[item.field]
      }
    })
    if (this.props.onChange) {
      this.props.onChange(values)
    }
  }
  public getAfterNodes (index: number) {
    const { dataSource } = this.state
    const item = dataSource[index]
    let node: JSX.Element = null
    // console.log(item.type, 'getAgerNodes')
    if (item.type === 'date') {
      node = (
        <div className={styles.after}>
          <RangePicker
            format={'YYYY-MM-DD'}
            onChange={(current) => {
              // console.log(current)
              item.value = [current[0].format('YYYY-MM-DD'), current[1].format('YYYY-MM-DD')].join('至')
              this.handleChange(index, item.value)
            }}
          />
        </div>
      )
    }
    if (item.type === 'month') {
      node = (
        <div className={styles.after}>
          <RangePicker
            format={'YYYY-MM'}
            onChange={(current) => {
              console.log(current)
              item.value = [current[0].format('YYYY-MM'), current[1].format('YYYY-MM')].join('至')
              this.handleChange(index, item.value)
            }}
          />
        </div>
      )
    }
    return node
  }
  public getMenuNodes (index: number) {
    const { dataSource, labels } = this.state
    const options = dataSource[index].label
    const nodes: JSX.Element[] = []
    options.forEach((item, key) => {
      nodes.push(
        <Menu.Item
          onClick={() => {
            labels[dataSource[index].field] = item
            this.setState({
              labels
            })
            // this.props.onChange() 修改时间选择时候请求接口
          }}
          key={`condition-label-menu-${key}`}
        >
          <span>{item}</span>
        </Menu.Item>
      )
    })
    return (
      <Menu>{nodes}</Menu>
    )
  }
  public getChildNodes () {
    const nodes: JSX.Element[] = []
    const { dataSource, labels } = this.state
    dataSource.forEach((item, index) => {
      const options = item.options
      const tagNodes: JSX.Element[] = []
      const type = item.type
      switch (type) {
      case 'select':
        tagNodes.push(
          <div className={styles.tag}>
            <DropDown
              setFields={{
                key: 'value',
                title: 'label'
              }}
              defaultValue={{
                label: this.state.values[item.field] ? this.state.values[item.field].label : ''
              }}
              data={options}
              onChange={(value) => {
                const values = this.state.values
                values[item.field] = {
                  label: value.title,
                  value: value.key
                }
                this.setState({
                  values
                })
                this.handleChange(index, value.key)
              }}
            />
          </div>
        )
        break
      default:
        options.forEach((item2) => {
          if (item2) {
            tagNodes.push(
              <div className={styles.tag}>
                <CheckableTag
                  children={item2.label}
                  checked={item2.value === item.value}
                  onChange={this.handleChange.bind(this, index, item2.value)}
                />
              </div>
            )
          }
        })
        tagNodes.push(
          this.getAfterNodes(index)
        )
        break
      }
      const menu = this.getMenuNodes(index)
      const label = labels[item.field]
      nodes.push(
        <li>
          <span style={{ paddingRight: 10, cursor: 'pointer'}}>
            <label
              className={styles.label}
            >
              {
                item.label.length > 1 ? (
                  <Dropdown
                    overlay={menu}
                    trigger={['click']}
                  >
                    <span>{label}</span>
                  </Dropdown>
                ) : label
              }
            </label>
            {
              item.field === 'date' &&
              <Icon type='down' theme='outlined' />
            }
          </span>
          <div className={styles.options}>
            {tagNodes}
          </div>
        </li>
      )
    })
    return nodes
  }
  public render () {
    // console.log(this.state.labels, 'labels')
    return (
      <div
        style={this.props.style}
        className={classNames(styles.container, this.props.className)}
      >
        <ul>
          {this.getChildNodes()}
        </ul>
      </div>
    )
  }
}
export default Main
