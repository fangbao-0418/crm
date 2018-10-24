import React from 'react'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
export default class extends React.Component {
  public render () {
    return (
      <LocaleProvider locale={zhCN}>
        <div>
          首页
        </div>
      </LocaleProvider>
    )
  }
}
