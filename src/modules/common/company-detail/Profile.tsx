import React from 'react'
const styles = require('./style')
class Main extends React.Component {
  public render () {
    return (
      <div className={styles.profile}>
        <div className={styles.left}>
          <div className={styles.picture}></div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            北京爱康鼎科技有限公司
          </div>
          <p>
            <span className={styles.verified} />
            <span className='mr20 ml10'>认证</span>
            <span className={styles.telphone} />
            <span className='mr20 ml10'>认证</span>
            <span className={styles.tyc} />
            <span className='mr20 ml10'>认证</span>
          </p>
          <p>
            <label>跟进人:</label><span>张飞</span>
            <label style={{marginLeft: '10px'}}>意向度:</label><span>100%</span>
          </p>
          <p>
            <label>自主开发:</label><span>张飞</span>
          </p>
        </div>
      </div>
    )
  }
}
export default Main
