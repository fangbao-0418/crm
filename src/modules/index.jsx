import React from 'react'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
const styles = require('./index.styl')
export default class extends React.Component {
  render () {
    return (
      <LocaleProvider locale={zhCN}>
        <div>
          <div className={styles.container}></div>
        </div>
      </LocaleProvider>
    )
  }
}
