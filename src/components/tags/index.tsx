import React from 'react'
import Tag from './Tag'
import classNames from 'classnames'
const styles = require('./style')
interface ItemProps {
  title: string,
  options: Array<{label: string, value: string, active?: boolean}>
}
interface Props {
  style?: React.CSSProperties
  className?: string
  dataSource?: ItemProps[]
}
interface State {
  dataSource: ItemProps[]
}
class Main extends React.Component<Props> {
  public state: Props = {
    dataSource: [
      {
        title: '电话状态',
        options: APP.keys.EnumContactStatus
      },
      {
        title: '需求状态',
        options: APP.keys.EnumNeedStatus
      },
      {
        title: '意向度',
        options: APP.keys.EnumIntentionality
      },
      {
        title: '跟进方式',
        options: APP.keys.EnumFollowWay
      }
    ]
  }
  public render () {
    const dataSource = this.state.dataSource
    return (
      <div
        style={this.props.style}
        className={classNames(styles.container, this.props.className)}
      >
        {
          dataSource.map((item, index) => {
            return (
              <div key={`tags-${index}`} className={styles.tags}>
                <label>{item.title}</label>
                <ul>
                  {
                    item.options.map((item2, index2) => {
                      return (
                        <li key={`tag-${index}-${index2}`}>
                          <Tag
                            title={item2.label}
                            active={item2.active}
                            onClick={() => {
                              item.options.map((item3) => {
                                item3.active = false
                              })
                              item2.active = !item2.active
                              this.setState({
                                dataSource
                              })
                            }}
                          />
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          })
        }
      </div>
    )
  }
}
export default Main
