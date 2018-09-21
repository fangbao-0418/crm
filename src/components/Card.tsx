import React from 'react'
import { Icon } from 'antd'
const styles = require('@/stylus/card')
class Main extends React.Component {
  public state = {
    type: 'down'
  }
  public render () {
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <span className={styles.title}>基本信息</span>
          <Icon
            className={styles.icon}
            type={this.state.type}
            theme='outlined'
            onClick={() => {
              $(this.refs.content).slideToggle()
            }}
          />
        </div>
        <div className={styles.content} ref='content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default Main
