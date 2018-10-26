import React from 'react'
import { Form, Row, Col, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import Area from '../Area'
import Uploader from './Uploader'
const FormItem = Form.Item
interface Props extends FormComponentProps {
  item?: Organ.DirectItemProps
  disabled?: boolean
  onOk?: (item?: Organ.DirectItemProps) => void
  onCancel?: () => void
  type?: 'direct' | 'agent' | 'accounting'
}
class Main extends React.Component<Props> {
  public region: Common.RegionProps[] = []
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
        style={{width: '800px'}}
      >
        <Row>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label={this.props.type === 'direct' ? '直营' : '代理商'}
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
              {getFieldDecorator('managerName', {
                rules: [{
                  required: true, message: '请输入负责人'
                }],
                initialValue: item.managerName
              })(
                <Input placeholder='请输入负责人' disabled={disabled}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='省份城市'
            >
              {getFieldDecorator('region', {
                rules: [{
                  required: true, message: '请选择省份城市'
                }],
                initialValue: (item.regionProvince || item.regionCity) ? [String(item.regionProvince), String(item.regionCity)] : undefined
              })(
                <Area
                  disabled={disabled}
                  onChange={(region) => {
                    this.region = region
                  }}
                />
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
                }, {
                  len: 11, message: '手机号格式不对！'
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
                  required: true, message: '请输入邮箱'
                }, {
                  pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确！'
                }],
                initialValue: item.email
              })(
                <Input placeholder='请输入邮箱' disabled={disabled} />
              )}
            </FormItem>
          </Col>
        </Row>
        {
          this.props.type === 'agent' &&
          <div>
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
                    initialValue: item.openingName,
                    rules: [{
                      required: true, message: '请输入开户名'
                    }]
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
                  {getFieldDecorator('assureMoney', {
                    rules: [{
                      required: true, message: '请输入保证金'
                    }],
                    initialValue: item.assureMoney
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
          </div>
        }
        <div className='text-right mt10'>
          {
            !disabled &&
            (
              <div>
                <Button
                  className='mr5'
                  type='primary'
                  onClick={() => {
                    if (this.props.onOk) {
                      this.props.form.validateFields((errs, values) => {
                        if (errs !== null) {
                          return
                        }
                        const region = this.region
                        if (region[0]) {
                          values.regionProvinceName = region[0].name
                          values.regionProvince = region[0].code
                          if (region[1]) {
                            values.regionCityName = region[1].name
                            values.regionCity = region[1].code
                          }
                        }
                        delete values.region
                        this.props.onOk(Object.assign({}, item, values))
                      })
                    }
                  }}
                >
                  保存
                </Button>
                <Button
                  onClick={() => {
                    if (this.props.onCancel) {
                      this.props.onCancel()
                    }
                  }}
                >
                  取消
                </Button>
              </div>
            )
          }
          {
            disabled &&
            <Button
              onClick={() => {
                if (this.props.onCancel) {
                  this.props.onCancel()
                }
              }}
            >
              关闭
            </Button>
          }
        </div>
      </Form>
    )
  }
}
export default Form.create()(Main)
