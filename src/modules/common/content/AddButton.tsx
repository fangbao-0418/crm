import React from 'react'
const styles = require('./style')
interface Props {
  onClick?: () => void
  title?: string
  style?: React.CSSProperties
  hidden?: boolean
}
class Main extends React.Component<Props> {
  public render () {
    if (this.props.hidden) {
      return null
    }
    return (
      <div
        style={this.props.style}
        className={styles.add}
        onClick={() => {
          if (this.props.onClick) {
            this.props.onClick()
          }
        }}
      >
        <span className={styles['add-icon']}></span>
        <span>{this.props.title}</span>
      </div>
    )
  }
}
export default Main
