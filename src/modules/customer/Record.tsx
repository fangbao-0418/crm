import React from 'react'
import { Tabs } from 'antd'
const styles = require('./style')
class Main extends React.Component {
  public callback () {
    console.log('11')
  }
  public render () {
    return (
      <div style={{ borderLeft: '1px solid #e5e5e5'}}>
        <Tabs defaultActiveKey='1' onChange={this.callback}>
          <Tabs.TabPane tab='跟进记录' key='1'>
            <div className={styles.record}>
              <div className={styles['line-height']}>
                <span>张磊</span>
                <span>2018-09-01 12:00:11</span>
              </div>
              <div>客户出差，明天再打</div>
              <div>
                <span className={styles.tag}>持续跟进</span>
                <span className={styles.tag} style={{ width: 89 }}>2018-09-10</span>
              </div>
            </div>
            <div className={styles.record}>
              <div className={styles['line-height']}>
                <span>张磊</span>
                <span>2018-09-01 12:00:11</span>
              </div>
              <div>客户出差，明天再打</div>
              <div>
                <span className={styles.tag}>持续跟进</span>
                <span className={styles.tag} style={{ width: 89 }}>2018-09-10</span>
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='线索记录' key='2'>
            <div className={styles.record}>
              <div className={styles['line-height']}>
                <span>张磊</span>
                <span>2018-09-01 12:00:11</span>
              </div>
              <div>客户出差，明天再打</div>
              <div>
                <span className={styles.tag}>持续跟进</span>
                <span className={styles.tag} style={{ width: 89 }}>2018-09-10</span>
              </div>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}
export default Main
