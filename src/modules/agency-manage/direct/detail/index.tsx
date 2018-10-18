import React from 'react'
import { Form, Row, Col, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { fetchRegion } from '@/modules/common/api'
import Uploader from './Uploader'
const FormItem = Form.Item
interface Props extends FormComponentProps {
  item?: Organ.DirectItemProps
  disabled?: boolean
  onOk?: (item?: Organ.DirectItemProps) => void
  onCancel?: () => void
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
    const { disabled } = this.props
    const item = this.props.item || {}
    return (
      <Form
        onSubmit={this.handleSubmit.bind(this)}
        style={{width: '800px'}}
      >
        <Row>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='直营'
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入直营名称'
                }],
                initialValue: item.name
              })(
                <Input placeholder='请输入' disabled={disabled} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='负责人'
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入负责人!'
                }],
                initialValue: item.name
              })(
                <Input placeholder='请输入' disabled={disabled}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='省份城市'
            >
              {getFieldDecorator('regionCityName', {
                rules: [{
                  required: true, message: '请选择省份城市!'
                }],
                initialValue: item.regionCityName
              })(
                <Input placeholder='请选择省份城市' disabled={disabled} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='地址'
            >
              {getFieldDecorator('address', {
                rules: [{
                  required: true, message: '请输入直营名称'
                }],
                initialValue: item.address
              })(
                <Input placeholder='请输入' disabled={disabled}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='手机号'
            >
              {getFieldDecorator('managerPhone', {
                rules: [{
                  required: true, message: '请输入手机号'
                }],
                initialValue: item.managerPhone
              })(
                <Input placeholder='请输入手机号' disabled={disabled}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='邮箱'
            >
              {getFieldDecorator('email', {
                rules: [{
                  required: true, message: '请输入邮箱!'
                }],
                initialValue: item.email
              })(
                <Input placeholder='请输入邮箱' disabled={disabled} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='开户行'
            >
              {getFieldDecorator('openingBank', {
                rules: [{
                  required: true, message: '请输入开户行'
                }],
                initialValue: item.openingBank
              })(
                <Input disabled={disabled}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='开户行支行'
            >
              {getFieldDecorator('branchBank', {
                // rules: [{
                //   required: true, message: ''
                // }],
                initialValue: item.branchBank
              })(
                <Input placeholder='请输入开户行支行' disabled={disabled} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='开户名'
            >
              {getFieldDecorator('openingName', {
                initialValue: item.openingName
              })(
                <Input placeholder='请输入开户名' disabled={disabled} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='法人'
            >
              {getFieldDecorator('legal', {
                // rules: [{
                //   required: true, message: '请输入开户行'
                // }],
                initialValue: item.legal
              })(
                <Input placeholder='请输入法人' disabled={disabled}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='银行账号'
            >
              {getFieldDecorator('bankNo', {
                // rules: [{
                //   required: true, message: ''
                // }],
                initialValue: item.bankNo
              })(
                <Input placeholder='请输入银行账号' disabled={disabled} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='保证金'
            >
              {getFieldDecorator('openingName', {
                rules: [{
                  required: true, message: ''
                }],
                initialValue: item.openingName
              })(
                <Input placeholder='请输入保证金' disabled={disabled} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator(
                'cardNoPath',
                {
                  initialValue: item.cardNoPath
                }
              )(
                <Uploader
                  title='上传身份证'
                  disabled={disabled}
                  value={item.cardNoPath}
                  onUploaded={(url) => {
                    this.props.form.setFieldsValue({
                      cardNoPath: url
                    })
                  }}
                />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator(
                'qualificationsPath',
                {
                  initialValue: item.qualificationsPath
                }
              )(
                <Uploader
                  title='上传代账资源'
                  disabled={disabled}
                  value={item.qualificationsPath}
                  onUploaded={(url) => {
                    this.props.form.setFieldsValue({
                      qualificationsPath: url
                    })
                  }}
                />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator(
                'businessLicensePath',
                {
                  initialValue: item.businessLicensePath
                }
              )(
                <Uploader
                  title='上传营业执照'
                  disabled={disabled}
                  value={item.businessLicensePath}
                  onUploaded={(url) => {
                    this.props.form.setFieldsValue({
                      businessLicensePath: url
                    })
                  }}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <div className='text-right mt10'>
          <Button
            className='mr5'
            type='primary'
            onClick={() => {
              if (this.props.onOk) {
                this.props.form.validateFields((errs, values) => {
                  this.props.onOk(Object.assign({}, item, values))
                })
              }
            }}
          >
            保存
          </Button>
          <Button>取消</Button>
        </div>
      </Form>
    )
  }
}
export default Form.create()(Main)
