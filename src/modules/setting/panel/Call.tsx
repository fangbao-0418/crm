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
}
class Main extends React.Component<Props> {
  public state: State = {
    editable: false,
    tqType: this.props.record.tqType,
    tqAdmin: this.props.record.tqAdmin,
    tqZoneCode: this.props.record.tqZoneCode
  }
  public onOk () {
    this.props.form.validateFields((err, vals: Setting.Params) => {
      if (err) {
        return false
      }
      console.log(vals, 'vals')
      vals.agencyId = this.props.record.agencyId
      saveEntryone(vals).then((res) => {
        this.setState({
          editable: false
        })
        APP.success('设置成功')
      })
    })
  }
  public render () {
    const { editable, tqAdmin, tqType, tqZoneCode } = this.state
    const { getFieldDecorator }  = this.props.form
    const { record } = this.props
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 }
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
              String(record.tqType) !== '0' &&
              <div>
                <Row>
                  <Col span={6}>
                    <span>管理员账号：</span>
                    <span>{tqAdmin}</span>
                  </Col>
                  <Col span={6}>
                    <span>电话区号：</span>
                    <span>{tqZoneCode}</span>
                  </Col>
                </Row>
              </div>
            }
          </div>
        ) : (
          <Form>
            <div className={styles.box}>
              <FormItem
                {...formItemLayout}
              >
                <Row gutter={8}>
                  <Col span={16}>
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
                  </Col>
                </Row>
              </FormItem>
              {
                String(this.state.tqType) !== '0' &&
                <div>
                  <FormItem
                    label='管理员账号'
                    {...formItemLayout}
                  >
                    <Row gutter={8}>
                      <Col span={16}>
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
                      </Col>
                    </Row>
                  </FormItem>
                  <FormItem
                    label='电话区号'
                    {...formItemLayout}
                    style={{margin: 0}}
                  >
                    <Row gutter={8}>
                      <Col span={16}>
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
                      </Col>
                    </Row>
                  </FormItem>
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
