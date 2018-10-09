import React from 'react'
import { Row, Col } from 'antd'
import Tag from './Tag'
import classNames from 'classnames'
const styles = require('./style')
interface ItemProps {
  field?: string,
  title: string,
  options: Array<{label: string, value: string, active?: boolean}>
}
interface Props {
  style?: React.CSSProperties
  className?: string
  dataSource?: ItemProps[]
  labelSpan?: number
  parser?: (value: any) => any
  onChange?: (value: any) => void
}
interface State {
  dataSource: ItemProps[]
}
class Main extends React.Component<Props, State> {
  public state = {
    dataSource: this.props.dataSource
  }
  public componentWillReceiveProps (props: Props) {
    this.setState({
      dataSource: props.dataSource
    })
  }
  public getValue () {
    const parser = this.props.parser
    const value: any = {}
    const { dataSource } = this.state
    dataSource.forEach((item) => {
      let val = item.options.filter((item2) => {
        return item2.active
      })
      if (parser instanceof Function) {
        val = parser(val)
      }
      value[item.field] = val
    })
    return value
  }
  public render () {
    const dataSource = this.state.dataSource
    const labelSpan = this.props.labelSpan || 4
    return (
      <div
        style={this.props.style}
        className={classNames(styles.container, this.props.className)}
      >
        {
          dataSource.map((item, index) => {
            return (
              <div key={`tags-${index}`} className={styles.tags}>
                <Row>
                  <Col span={labelSpan} className='text-right'>
                    <label className={styles.title}>{item.title}:</label>
                  </Col>
                  <Col span={24 - labelSpan}>
                    <ul>
                      {
                        item.options.map((item2, index2) => {
                          return (
                            <li key={`tag-${index}-${index2}`}>
                              <Tag
                                title={item2.label}
                                active={item2.active}
                                onClick={() => {
                                  if (item2.active) {
                                    item2.active = false
                                  } else {
                                    item.options.map((item3) => {
                                      item3.active = false
                                    })
                                    item2.active = true
                                  }
                                  this.setState({
                                    dataSource
                                  }, () => {
                                    if (this.props.onChange) {
                                      this.props.onChange(this.getValue())
                                    }
                                  })
                                }}
                              />
                            </li>
                          )
                        })
                      }
                    </ul>
                  </Col>
                </Row>
              </div>
            )
          })
        }
      </div>
    )
  }
}
export default Main
