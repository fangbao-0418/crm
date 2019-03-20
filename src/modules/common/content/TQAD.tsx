/** TQ商品悬浮广告 */
import React from 'react'
const styles = require('./style')
class Main extends React.Component {
  public state = {
    show: localStorage.getItem('tqad') === '-1' ? false : true
  }
  public render () {
    const { show } = this.state
    return show && (
      <div
        className={styles.tqad}
      >
        <div
          className={styles.close}
          onClick={() => {
            localStorage.setItem('tqad', '-1')
            this.setState({
              show: false
            })
          }}
        >
        </div>
      </div>
    )
  }
}
export default Main
