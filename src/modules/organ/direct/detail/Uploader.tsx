import React from 'react'
import classNames from 'classnames'
const styles = require('./style')
const defaultVal = require('@/assets/images/upload-img-bg.png')
interface Props {
  className?: string
  style?: React.CSSProperties
  value?: string
  disabled?: boolean
  onUploaded?: (url?: string) => void
  title?: string
}
class Main extends React.Component<Props> {
  public handleClick () {
    if (this.props.disabled) {
      return
    }
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
        <div className={styles['upload-area']}>
          <img
            ref='img'
            src={this.props.value || defaultVal}
            alt=''
            onClick={this.handleClick.bind(this)}
          />
        </div>
        <div className={styles.title}>
          <span
          >
            {this.props.title}
          </span>
        </div>
      </div>
    )
  }
}
export default Main
