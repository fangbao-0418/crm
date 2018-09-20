import React from 'react'
import classNames from 'classnames'
const styles = require('./style')
interface Props {
  title: string
  style?: React.CSSProperties
  step?: number
  reverse?: boolean
  active?: boolean
}
class Main extends React.Component<Props> {
  public render () {
    const style = Object.assign({}, {
      left: `${(this.props.step || 1) / 4 * 100}%`,
      transform: this.props.reverse ? 'translateX(-50%) scale(1, -1)' : 'translateX(-50%)',
      top: this.props.reverse ? '90px' : null
    }, this.props.style)
    return (
      <div
        style={style}
        className={classNames(styles.signpost, {
          [styles['signpost-active']]: this.props.active
        })}
      >
        <div className={styles['signpost-line']}></div>
        <div
          style={{
            transform: this.props.reverse ? 'scale(1, -1)' : null
          }}
          className={styles['signpost-box']}
        >
          {this.props.title}
        </div>
      </div>
    )
  }
}
export default Main
