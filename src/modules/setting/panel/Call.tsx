import React from 'react'
import { Row, Col, Form, Input, Button, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import Card from '@/components/Card'
import { saveEntryone } from '../api'
const styles = require('./style')
const FormItem = Form.Item
interface Props extends FormComponentProps {
  record?: Setting.ItemProps
}
interface State {
  editable: boolean
  /** tq管理员 */
  tqAdmin?: string
  /** tq拨打枚举 */
  tqType?: string
  /** tq区号 */
  tqZoneCode?: string
  /** tq管理员密码 */
  tqAdminPassword?: string
  /** tq公司ID */
  tqCompanyId?: string
  /** tq公司管理员ID */
  tqAdminId?: string
}
class Main extends React.Component<Props> {
  public state: State = {
    editable: false,
    tqType: this.props.record.tqType,
    tqAdmin: this.props.record.tqAdmin,
    tqZoneCode: this.props.record.tqZoneCode,
    tqAdminPassword: this.props.record.tqAdminPassword,
    tqCompanyId: this.props.record.tqCompanyId
  }
  public onOk () {
    this.props.form.validateFields((err, vals: Setting.Params) => {
      if (err) {
        return false
      }
      console.log(vals, 'vals')
      vals.agencyId = this.props.record.agencyId
      if (vals.tqType === '0') {
        vals.tqAdmin = ''
        vals.tqZoneCode = ''
      }
      saveEntryone(vals).then((res) => {
        this.setState({
          editable: false
        })
        APP.success('设置成功')
      })
    })
  }
  public render () {
    const { editable, tqAdmin, tqType, tqZoneCode, tqAdminPassword, tqCompanyId, tqAdminId } = this.state
    const { getFieldDecorator }  = this.props.form
    const { record } = this.props
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 }
    }
    console.log(this.state.tqType, '112')
    return (
      <Card
        title='第三方呼叫设置'
        titleClassName={styles.title}
        rightContent={(
          <div
            className={styles.right}
            onClick={() => {
              this.setState({
                editable: true
              })
            }}
          >
            {
              <span>
                <span className={styles.edit}></span>
                <span>设置</span>
              </span>
            }
          </div>
        )}
      >
        {!editable ? (
          <div>
            <Row className='mb15'>
              <Col span={6}>
                <span>{APP.dictionary[`EnumTqType-${tqType}`]}</span>
              </Col>
            </Row>
            {
              String(tqType) !== '0' &&
              <div>
                <Row>
                  <Col span={8}>
                    <span>管理员账号：</span>
                    <span>{tqAdmin}</span>
                  </Col>
                  <Col span={8}>
                    <span>电话区号：</span>
                    <span>{tqZoneCode}</span>
                  </Col>
                </Row>
                {
                  String(tqType) === '4' &&
                  <Row>
                    <Col span={8}>
                      <span>公司ID：</span>
                      <span>{tqCompanyId}</span>
                    </Col>
                    <Col span={8}>
                      <span>管理员ID：</span>
                      <span>{tqAdminId}</span>
                    </Col>
                    <Col span={8}>
                      <span>管理员密码：</span>
                      <span>{tqAdminPassword}</span>
                    </Col>
                  </Row>
                }
              </div>
            }
          </div>
        ) : (
          <Form>
            <div className={styles.box}>
              <Row gutter={8}>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                  >
                    {getFieldDecorator('tqType', { initialValue: String(tqType) })(
                      <Select
                        onSelect={(value) => {
                          this.setState({
                            tqType: value
                          })
                        }}
                      >
                        {
                          APP.keys.EnumTqType.map((item) => {
                            return (
                              <Select.Option key={item.value}>
                                {item.label}
                              </Select.Option>
                            )
                          })
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              {
                String(tqType) !== '0' &&
                <div>
                  {
                    String(tqType) === '4' &&
                    <div>
                      <Row>
                        <Col span={12}>
                          <FormItem
                            {...formItemLayout}
                            label='公司ID'
                          >
                            {getFieldDecorator('tqCompanyId', {
                              initialValue: tqCompanyId,
                              rules:[{
                                required: true, message: '请输入公司ID'
                              }]
                            })(
                              <Input
                                onChange={(e) => {
                                  this.setState({
                                    tqCompanyId: e.target.value
                                  })
                                }}
                              />
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <FormItem
                            {...formItemLayout}
                            label='管理员ID'
                          >
                            {getFieldDecorator('tqAdminId', {
                              initialValue: tqAdminId,
                              rules:[{
                                required: true, message: '请输入管理员ID'
                              }]
                            })(
                              <Input
                                onChange={(e) => {
                                  this.setState({
                                    tqAdminId: e.target.value
                                  })
                                }}
                              />
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                    </div>
                  }
                  <Row>
                    <Col span={12}>
                      <FormItem
                        {...formItemLayout}
                        label='管理员账号'
                      >
                        {getFieldDecorator('tqAdmin', {
                          initialValue: tqAdmin,
                          rules:[{
                            required: true, message: '请输入管理员账号'
                          }]
                        })(
                          <Input
                            onChange={(e) => {
                              this.setState({
                                tqAdmin: e.target.value
                              })
                            }}
                          />
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                  {
                    String(tqType) === '4' &&
                    <Row>
                      <Col span={12}>
                        <FormItem
                          {...formItemLayout}
                          label='管理员密码'
                        >
                          {getFieldDecorator('tqAdminPassword', {
                            initialValue: tqAdminPassword,
                            rules:[{
                              required: true, message: '请输入管理员密码'
                            }]
                          })(
                            <Input
                              onChange={(e) => {
                                this.setState({
                                  tqAdminPassword: e.target.value
                                })
                              }}
                            />
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                  }
                  <Row>
                    <Col span={12}>
                      <FormItem
                        {...formItemLayout}
                        label='电话区号'
                      >
                        {getFieldDecorator('tqZoneCode', {
                          initialValue: tqZoneCode,
                          rules:[{
                            required: true, message: '请输入电话区号'
                          }]
                        })(
                          <Input
                            onChange={(e) => {
                              this.setState({
                                tqZoneCode: e.target.value
                              })
                            }}
                          />
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                </div>
              }
            </div>
            <Button
              className='mt20'
              type='primary'
              onClick={() => {
                this.onOk()
              }}
              hidden={!APP.hasPermission('crm_set_customer_save_one_tq')}
            >
              保存
            </Button>
          </Form>
        )}
      </Card>
    )
  }
}
export default Form.create()(Main)
