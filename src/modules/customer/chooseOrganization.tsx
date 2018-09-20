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
      <div className='mt12'>
        <span>选择机构：</span>
        <Select
          style={{width:'200px'}}
        >
          <Option key='1'>机构1</Option>
          <Option key='2'>机构2</Option>
        </Select>
      </div>
    )
  }
}
export default Main
