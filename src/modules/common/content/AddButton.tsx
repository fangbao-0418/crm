import React from 'react'
const styles = require('./style')
interface Props {
  onClick?: () => void
  title?: string
}
class Main extends React.Component<Props> {
  public render () {
    return (
      <div
        style={{cursor: 'pointer'}}
        onClick={() => {
          if (this.props.onClick) {
            this.props.onClick()
          }
        }}
      >
        <span className={styles.add}></span>
        <span>{this.props.title}</span>
      </div>
    )
  }
}
export default Main
