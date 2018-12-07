import React from 'react'
const styles = require('./style')
interface Props {
  onClick?: () => void
  title?: string
  style?: React.CSSProperties
  hidden?: boolean
  icon?: React.ReactNode
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
        {this.props.icon ? (
          this.props.icon
        ) : (
          <APP.Icon type='add' />
        )}
        <span className={styles.text}>{this.props.title}</span>
      </div>
    )
  }
}
export default Main
