import React from 'react'
const styles = require('./style')
class Main extends React.Component {
  public render () {
    const url = APP.env === 'production' ? '/menu' : '/#menu'
    return (
      <iframe
        width='200px'
        height='100%'
        className={styles.iframe}
        src={url}
        frameBorder='0'
      />
    )
  }
}
export default Main
