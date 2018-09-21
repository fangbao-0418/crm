/**
 * 标题+内容组件
 */
import React from 'react'
import '@/modules/common/styles/base.styl'

interface States {
  a?: any
}

// 标题+内容结构
class Main extends React.Component<any, any> {
  public state: States = {
  }

  public componentWillMount () {
  }

  public render () {
    return (
      <div className='t-hc t-hc-1'>
        <div className='hc-h'>
          <h2>{this.props.title}</h2>
        </div>
        <div className='hc-c'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Main
