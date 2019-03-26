/** TQ商品悬浮广告 */
import React from 'react'
import classNames from 'classnames'
const styles = require('./style')
class Main extends React.Component {
  public state = {
    show: localStorage.getItem('tqad') === '0' ? false : true
  }
  public componentDidMount () {
    setTimeout(() => {
      localStorage.setItem('tqad', '0')
      this.setState({
        show: false
      })
    }, 5000)
  }
  public render () {
    const { show } = this.state
    return (
      <div
        className={classNames(styles.tqad, {
          [styles.fold]: !show
        })}
        onClick={() => {
          if (!show) {
            localStorage.setItem('tqad', '1')
            this.setState({
              show: true
            })
          } else {
            window.open('http://h5.eqxiu.com/ls/Sl2oBYfh')
          }
        }}
      >
        <div
          className={styles.close}
          onClick={(e) => {
            localStorage.setItem('tqad', '0')
            this.setState({
              show: false
            })
            e.stopPropagation()
          }}
        >
        </div>
      </div>
    )
  }
}
export default Main
