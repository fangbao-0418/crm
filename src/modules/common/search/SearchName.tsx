import React from 'react'
import { Input, Select, Icon } from 'antd'
const InputGroup = Input.Group
const Option = Select.Option
interface Props {
  placeholder?: string
  options?: Array<{
    label: string
    value: string
  }>
}
class Main extends React.Component<Props> {
  public render () {
    return (
      <InputGroup compact>
        <Select
          style={{ width: '30%' }}
          defaultValue='客户名称'
        >
          <Option value='客户名称'>
            客户名称
          </Option>
          <Option value='测试名称'>
            测试名称
          </Option>
        </Select>
        <Input
          style={{ width: '50%' }}
          placeholder='Email'
          suffix={<Icon type='search' theme='outlined' />}
        />
      </InputGroup>
    )
  }
}
export default Main
