import React from 'react'
import Form from './Form'
import SearchCompany from './SelectCompany'
const styles = require('./style')

interface State {
  step: 1 | 2
}
class Main extends React.Component {
  public state: State = {
    step: APP.token ? 2 : 1
  }
  public render () {
    const { step } = this.state
    return (
      <div className={styles.container}>
        {step === 1 && (
          <Form
            onOk={() => {
              this.setState({
                step: 2
              })
            }}
          />
        )}
        {step === 2 && <SearchCompany />}
        <div className={styles.footer}>
          <span>Copyright © 2018 噼里啪智能·财税 版权所有</span>
        </div>
      </div>
    )
  }
}
export default Main
