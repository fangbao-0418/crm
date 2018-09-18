import React from 'react'
const styles = require('./style')
interface Props{
  title: string
}
class Main extends React.Component<Props> {
  public render () {
    return (
      <div className={styles.top}>
        <div className={styles.title}>
          {this.props.title}
        </div>
      </div>
    )
  }
}
export default Main
