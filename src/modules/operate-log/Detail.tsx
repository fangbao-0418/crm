import React from 'react'
import ContentBox from '@/modules/common/content'
const styles = require('./style')
class Main extends React.Component {
  public render () {
    return (
      <ContentBox
        title='操作日志/日志详情'
      >
        <div className={styles.detail}>
          <div className={styles['detail-item']}>
            <div>
              <span>操作人：海底捞</span>
              <span>时间：2018/2/12 10:12:12</span>
            </div>
            <p>
              xxxxxxx
            </p>
          </div>
        </div>
      </ContentBox>
    )
  }
}
export default Main
