import React from 'react'
import Card from '@/components/Card'
import Storage from './Storage'
import Assign from './Assign'
import Call from './Call'
const styles = require('./style')
class Main extends React.Component {
  public render () {
    return (
      <div className={styles.pannel}>
        <Storage />
        <Assign />
        <Call />
      </div>
    )
  }
}
export default Main
