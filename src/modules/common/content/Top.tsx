import React from 'react'
const styles = require('./style')
interface Props {
  title: any
  rightContent?: any
}
class Main extends React.Component<Props> {
  public render () {
    return (
      <div className={styles.top}>
        <div className={styles.title}>
          {this.props.title}
        </div>
        <div className={styles['right-content']}>
          {this.props.rightContent}
        </div>
      </div>
    )
  }
}
export default Main
