/**
 * 标题+内容组件
 */
import React from 'react'
import '@/modules/common/styles/base.styl'
interface Props {
  act?: any
  title?: string
}
// 标题+内容结构
class Main extends React.Component<Props> {
  public render () {
    return (
      <div className='t-hc t-hc-1'>
        <div className='hc-h'>
          <h2>{this.props.title}</h2>
          {this.props.act && <span className={'act'}>{this.props.act}</span>}
        </div>
        <div className='hc-c'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Main
