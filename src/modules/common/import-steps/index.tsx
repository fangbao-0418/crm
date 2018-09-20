import React from 'react'
import classNames from 'classnames'
import Signpost from './Signpost'
const styles = require('./style')
interface Props {
  step: 1 | 2 | 3
  config?: Array<{title: string, component: JSX.Element}>
}
class Main extends React.Component<Props> {
  public render () {
    const step = this.props.step || 1
    return (
      <div className={styles.container}>
        <div className={styles.steps}>
          <div className={styles.lines}>
            <div className={classNames(styles.line, {[styles.active]: step > 0})}/>
            <div className={classNames(styles.line, {[styles.active]: step > 0})}/>
            <div className={classNames(styles.line, {[styles.active]: step > 1})}/>
            <div className={classNames(styles.line, {[styles.active]: step > 2})}/>
          </div>
          {
            this.props.config.map((item, index) => {
              return (
                <Signpost
                  key={`signpost-${index}`}
                  active={step > index}
                  reverse={index !== 1}
                  step={index + 1}
                  title={item.title}
                />
              )
            })
          }
        </div>
        <div className={styles.content}>
          {
            this.props.config[step - 1].component
          }
        </div>
      </div>
    )
  }
}
export default Main
