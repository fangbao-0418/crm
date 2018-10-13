import React from 'react'
import classNames from 'classnames'
const styles = require('./style')
const defaultVal = require('@/assets/images/noimage.png')
interface Props {
  className?: string
  style?: React.CSSProperties
}
class Main extends React.Component<Props> {
  public componentWillMount () {
  }
  public handleClick () {
    const el = document.createElement('input')
    el.setAttribute('type', 'file')
    $(el).on('change', (e) => {
      const target: any = e.target
      console.log(target.files)
      if (/image/.test(target.files[0].type) === false) {
        APP.error('格式不匹配')
        return
      }
      APP.fn.ossUpload(target.files[0])
    })
    $(el).trigger('click')
  }
  public render () {
    return (
      <div className={classNames(styles.uploader, this.props.className)}>
        <img className='mr5' src={defaultVal} alt=''/>
        <span
          onClick={this.handleClick.bind(this)}
          className={styles['upload-btn']}
        >
          上传
        </span>
      </div>
    )
  }
}
export default Main
