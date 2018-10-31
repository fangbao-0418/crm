import React from 'react'
const styles = require('./style')
class Main extends React.Component {
  public render () {
    return (
      <iframe
        width='200px'
        height='100%'
        className={styles.iframe}
        src='/#menu'
        frameBorder='0'
      />
    )
  }
}
export default Main
