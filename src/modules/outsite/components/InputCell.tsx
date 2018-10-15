import React, { Children } from 'react'
import { Input, Form, InputNumber } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
const data: any = []
for (let i = 0; i < 25; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  })
}

const FormItem = Form.Item
export default function (EditableContext: React.Context<FormComponentProps>, props: {
  editing: string,
  dataIndex: any,
  title: string,
  inputType: string,
  record: string,
  index: string,
  restProps: object
  children: any
}) {
  const getInput = () => {
    if (props.inputType === 'number') {
      return <InputNumber />
    }
    return <Input />
  }

  const {
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    ...restProps
  } = props
  return (
    <EditableContext.Consumer>
      {(form: any) => {
        const { getFieldDecorator } = form
        return (
          <td {...restProps}>
            {editing ? (
              <FormItem style={{ margin: 0 }}>
                {getFieldDecorator(dataIndex, {
                  rules: [{
                    required: true,
                    message: `Please Input ${title}!`
                  }],
                  initialValue: record[dataIndex]
                })(getInput())}
              </FormItem>
            ) : restProps.children}
          </td>
        )
      }}
    </EditableContext.Consumer>
  )
}
