import React from 'react'
import { Select } from 'antd'
const Option = Select.Option
type DetailProps = Customer.DetailProps
interface States {
  data: DetailProps[]
}
class Main extends React.Component {
  public state: States = {
    data: []
  }
  public render () {
    // const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>)
    return (
      <div>
        <span>分配销售：</span>
        <Select
          style={{width:'200px'}}
          mode='multiple'
        >
          <Option key='1'>销售1</Option>
          <Option key='2'>销售2</Option>
        </Select>
      </div>
    )
  }
}
export default Main
