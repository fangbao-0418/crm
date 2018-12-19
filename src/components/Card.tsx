import React from 'react'
import { Icon } from 'antd'
import classNames from 'classnames'
const styles = require('@/stylus/card')
interface Props {
  title?: string
  showFold?: boolean
  rightContent?: JSX.Element
}
class Main extends React.Component<Props> {
  public state = {
    type: 'down'
  }
  public render () {
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          {this.props.title === undefined ? '' : <span className={styles.title}>{this.props.title}</span>}
          {
            this.props.showFold && (
              <Icon
                className={classNames(styles.icon, 'ml5')}
                type={this.state.type}
                theme='outlined'
                onClick={() => {
                  $(this.refs.content).slideToggle(20, () => {
                    this.setState({
                      type: this.state.type === 'down' ? 'up' : 'down'
                    })
                  })
                }}
              />
            )
          }
          <div className={styles['right-content']}>
            {this.props.rightContent}
          </div>
        </div>
        <div className={styles.content} ref='content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default Main
