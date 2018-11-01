import React from 'react'
import { Select, Row, Col, Input, Form, Radio } from 'antd'
import _ from 'lodash'
import { FormComponentProps } from 'antd/lib/form'
import Service from '@/modules/outsite/services'
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
interface ValueProps {
  id?: number
  name?: string
  category?: string
  productId?: number
  productName?: string
  status?: string
  isrelative?: '1' | '0'
}
interface Props extends FormComponentProps {
  getInstance?: (ins: any) => void
  item?: OutSide.TaskItem
}
interface State {
  values?: ValueProps
  goods?: Array<{code: string, name: string}>
}
class Main extends React.Component<Props, State> {
  public state: State = {
    values: {},
    goods: []
  }
  public componentWillMount () {
    if (this.props.getInstance) {
      this.props.getInstance(this)
    }
    const values: ValueProps = this.props.item || {}
    values.isrelative = values.productId ? '1' : '0'
    this.setState({
      values
    })
    this.getProductList()
  }
  // 获取商品列表
  public getProductList () {
    Service.getProductList('OTHERS').then((res) => {
      console.log(res)
      this.setState({
        goods: res || []
      })
    })
  }
  public submit () {
    return new Promise((resolve, reject) => {
      this.props.form.validateFields((errs, values: any) => {
        if (errs) {
          reject()
        } else {
          values.status = this.state.values.status
          values.id = this.state.values.id
          values.product = values.product || {}
          values.productId = values.product.key
          values.productName = values.product.label
          if (values.isrelative === '0') {
            values.productId = undefined
            values.productName = undefined
          }
          delete values.product
          delete values.isrelative
          resolve(values)
        }
      })
    })
  }
  public onChange () {
    let values = this.props.form.getFieldsValue()
    values = Object.assign({}, this.state.values, values)
    this.setState({
      values
    })
  }
  public show () {
    const state = this.state
    const { values } = state
    const { getFieldDecorator } = this.props.form
    const formLayout: any = { wrapperCol: {span: 18}, labelCol: {span: 6} }
    return (
      <Form
        onChange={() => {
          this.onChange()
        }}
      >
        <FormItem
          {...formLayout}
          label='任务名称'
          required
        >
          {
            getFieldDecorator(
              'name',
              {
                initialValue: values.name,
                rules: [
                  {
                    required: true,
                    message: '任务名称不能为空'
                  }
                ]
              }
            )(
              <Input
                type='text'
                placeholder='请输入任务名称'
              />
            )
          }
        </FormItem>
        <FormItem
          {...formLayout}
          label='任务分类'
          required
        >
          {
            getFieldDecorator(
              'category',
              {
                initialValue: values.category,
                rules: [
                  {
                    required: true,
                    message: '任务分类不能为空'
                  }
                ]
              }
            )(
              <Select
              >
              {
                _.map(Service.taskTplCateDict, (val: any, key: any) => {
                  return <Option value={key}>{val}</Option>
                })
              }
              </Select>
            )
          }
        </FormItem>
        <FormItem
          {...formLayout}
          label='关联商品'
        >
          {
            getFieldDecorator(
              'isrelative',
              {
                initialValue: values.isrelative
              }
            )(
              <RadioGroup>
                <Radio value='1'>是</Radio>
                <Radio value='0'>否</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        {(values.isrelative === '1' && this.state.goods.length > 0) && <FormItem
          {...formLayout}
          label='关联商品'
          required
        >
          {
            getFieldDecorator(
              'product',
              {
                initialValue: {key: values.productId}
              }
            )(
              <Select
                labelInValue
                onChange={(value: any) => {
                  values.productId = value.key
                  values.productName = value.label
                  this.setState({
                    values
                  })
                }}
              >
              {
                _.map(this.state.goods, (item) => {
                  return <Option value={item.code}>{item.name}</Option>
                })
              }
              </Select>
            )
          }
        </FormItem>}
      </Form>
    )
  }
  public render () {
    return (
      <div >
       {this.show()}
      </div>
    )
  }
}
export default Form.create()(Main)
