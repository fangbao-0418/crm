import React from 'react'
import Top from './Top'
const styles = require('./style')
interface Props {
  title: string
}
class Main extends React.Component<Props> {
  public render () {
    return (
      <div className={styles.container}>
        <Top title={this.props.title}/>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default Main
