import React from 'react'
import { Steps, Button } from 'antd'
const Step = Steps.Step
interface States {
  current: number
}
class Main extends React.Component {
  public state: States = {
    current: 0
  }
  public next () {
    const current = this.state.current + 1
    this.setState({ current })
  }
  public render () {
    const { current } = this.state
    return (
      <div>
        <Steps progressDot current={current}>
          <Step title='1、分配设置' />
          <Step title='2、执行结果' />
        </Steps>
        <Button type='primary'onClick={this.next.bind(this)}>下一步</Button>
      </div>
    )
  }
}
export default Main
