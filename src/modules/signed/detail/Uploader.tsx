import React from 'react'
import classNames from 'classnames'
import Viewer from 'viewerjs'
const styles = require('./style')
const defaultVal = require('@/assets/images/noimage.png')
interface Props {
  className?: string
  style?: React.CSSProperties
  value?: string
  disabled?: boolean
  onUploaded?: (url?: string) => void
}
class Main extends React.Component<Props> {
  public componentDidMount () {
    const el: any = this.refs.img
    const viewer = new Viewer(el)
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
      APP.fn.ossUpload(target.files[0]).then((res: any) => {
        if (this.props.onUploaded) {
          this.props.onUploaded(res.res.requestUrls[0])
        }
      })
    })
    $(el).trigger('click')
  }
  public render () {
    return (
      <div className={classNames(styles.uploader, this.props.className)}>
        <img ref='img' className='mr5' src={this.props.value || defaultVal} alt=''/>
        <span
          hidden={this.props.disabled}
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
