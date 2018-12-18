import React from 'react'
import { Tag, DatePicker, Menu, Dropdown, Icon } from 'antd'
import DropDown from 'pilipa/libs/dropdown'
import classNames from 'classnames'
import moment from 'moment'
const { RangePicker, MonthPicker } = DatePicker
const { CheckableTag } = Tag
const styles = require('./style')
export interface ConditionOptionProps {
  label: string[]
  options: Array<{label: string, value: string}>
  field: string
  value?: string
  type?: 'date' | 'select' | 'month'
  /** 时间是否是区间 */
  range?: boolean
  placeholder?: string | [string, string]
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
  /** 月份选择器是否打开 */
  open: boolean
}
class Main extends React.Component<Props> {
  public state: States = {
    dataSource: this.props.dataSource,
    labels: this.getLabels(),
    values: this.getValues(),
    open: false
  }
  /** 月份选择器点击数 */
  public monthPickerClickNum = 0
  public componentWillReceiveProps (props: Props) {
    this.setState({
      dataSource: props.dataSource,
      values: this.getValues(props.dataSource),
      labels: this.getLabels(props.dataSource)
    })
  }
  public getValues (dataSource: ConditionOptionProps[] = this.props.dataSource) {
    const values: ValueProps = {}
    const sourceValues = (this.state ? this.state.values : {}) || {}
    dataSource.forEach((item) => {
      const { field, options } = item
      values[field] = sourceValues[field] || options[0]
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
    const range = item.range !== undefined ? item.range : true
    if (item.type === 'date') {
      if (range) {
        node = (
          <div className={styles.after}>
            <RangePicker
              placeholder={item.placeholder instanceof Array ? item.placeholder : ['开始日期', '结束日期']}
              size='small'
              format={'YYYY-MM-DD'}
              onChange={(current) => {
                if (current.length === 2) {
                  item.value = [current[0].format('YYYY-MM-DD'), current[1].format('YYYY-MM-DD')].join('至')
                } else {
                  item.value = item.options[0].value
                }
                this.handleChange(index, item.value)
              }}
            />
          </div>
        )
      } else {
        node = (
          <div className={styles.after}>
            <DatePicker
              style={{width: 110}}
              placeholder={typeof(item.placeholder) === 'string' ? item.placeholder : '请选择日期'}
              size='small'
              format={'YYYY-MM-DD'}
              onChange={(current) => {
                item.value = current.format('YYYY-MM-DD')
                this.handleChange(index, item.value)
              }}
            />
          </div>
        )
      }
    }
    if (item.type === 'month') {
      if (range) {
        const arr = item.value ? item.value.split('至') : []
        const value: any = arr.length === 2 ? [moment(arr[0]), moment(arr[1])] : undefined
        console.log(value, 'month')
        node = (
          <div className={styles.after}>
            <RangePicker
              mode={['month', 'month']}
              placeholder={item.placeholder instanceof Array ? item.placeholder : ['开始日期', '结束日期']}
              size='small'
              format={'YYYY-MM'}
              value={value}
              open={this.state.open}
              onPanelChange={(current) => {
                this.monthPickerClickNum += 1
                if (current.length === 2) {
                  item.value = [current[0].format('YYYY-MM'), current[1].format('YYYY-MM')].join('至')
                } else {
                  item.value = item.options[0].value
                }
                if (this.monthPickerClickNum === 2) {
                  this.handleChange(index, item.value)
                  this.monthPickerClickNum = 0
                  this.setState({
                    open: false
                  })
                }
              }}
              onOpenChange={(status) => {
                this.setState({
                  open: status
                })
                this.monthPickerClickNum = 0
              }}
            />
          </div>
        )
      } else {
        node = (
          <div className={styles.after}>
            <MonthPicker
              style={{width: 100}}
              placeholder={typeof(item.placeholder) === 'string' ? item.placeholder : '请选择日期'}
              size='small'
              format={'YYYY-MM'}
              onChange={(current) => {
                item.value = current.format('YYYY-MM')
                this.handleChange(index, item.value)
              }}
            />
          </div>
        )
      }
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
          <label
            className={styles.label}
          >
            {
              item.label.length > 1 ? (
                <Dropdown
                  overlay={menu}
                  trigger={['click']}
                >
                  <span style={{cursor: 'pointer'}}>
                    {label}
                    <span style={{paddingRight: 5}}>
                      <Icon type='down' theme='outlined' style={{color: '#BFBFBF'}}/>
                    </span>
                  </span>
                </Dropdown>
              ) : (
                <span>
                  {label}
                  <span style={{paddingRight: 5}}>
                    <Icon type='down' theme='outlined' style={{color: '#ffffff'}}/>
                  </span>
                </span>
              )
            }
          </label>
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
