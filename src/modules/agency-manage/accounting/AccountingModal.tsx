import React from 'react'
import { Form, Row, Col, Input, TreeSelect } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { fetchRegion } from '@/modules/common/api'
const FormItem = Form.Item
const TreeNode = TreeSelect.TreeNode
interface Props extends FormComponentProps {
  detail?: { organizationName: string }
}
class Main extends React.Component<Props> {
  public componentWillMount () {
    fetchRegion().then((res) => {})
  }
  public handleSubmit () {}
  public render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    }
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Row>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label='机构名称：'
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入机构名称!'
                }],
                initialValue: this.props.detail.organizationName
              })(
                <Input placeholder='请输入'/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem
              {...formItemLayout}
              label='核算地区范围：'
            >
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}
export default Form.create()(Main)
