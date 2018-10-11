import React from 'react'
import { Row, Col, Radio, Select } from 'antd'
const Option = Select.Option
const children: JSX.Element[] = []
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}
interface Props {
  disabled?: boolean
}
interface State {
  value: number
}
class Main extends React.Component<Props, State> {
  public state: State = {
    value: 1
  }
  public handleChange (value: any) {
    console.log(`selected ${value}`)
  }
  public render () {
    const disabled = this.props.disabled !== undefined ? this.props.disabled : true
    return (
      <div>
        <Radio.Group
          style={{width: '100%'}}
          onChange={(e) => {
            this.setState({
              value: e.target.value
            })
          }}
          value={this.state.value}
        >
          <Row>
            <Col span={6}>
              <Radio
                disabled={disabled}
                value={1}
              >
                全部销售
              </Radio>
            </Col>
            <Col span={3}>
              <Radio
                disabled={disabled}
                value={2}
              >
                自定义销售
              </Radio>
            </Col>
            <Col span={15}>
              <Select
                disabled={this.state.value === 1 || disabled}
                mode='multiple'
                style={{ width: '100%' }}
                placeholder='Please select'
                defaultValue={['a10', 'c12']}
                onChange={this.handleChange.bind(this)}
              >
                {children}
              </Select>
            </Col>
          </Row>
        </Radio.Group>
      </div>
    )
  }
}
export default Main
