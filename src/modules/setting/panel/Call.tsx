import React from 'react'
import { Row, Col, Form, Input, Button, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import Card from '@/components/Card'
import { saveEntryone } from '../api'
const styles = require('./style')
const FormItem = Form.Item
interface Props extends FormComponentProps {
  record?: Setting.ItemProps
  /** tq管理员 */
  tqAdmin?: string
  /** tq拨打枚举 */
  tqType?: string
  /** tq区号 */
  tqZoneCode?: string
}
interface State {
  editable: boolean
}
class Main extends React.Component<Props> {
  public state: State = {
    editable: false
  }
  public onOk () {
    this.props.form.validateFields((err, vals: Setting.Params) => {
      console.log(vals, 'vals')
      vals.agencyId = this.props.record.agencyId
      saveEntryone(vals).then((res) => {
        // this.setState({
        //   editable: false
        // })
        APP.success('设置成功')
      })
    })
  }
  public render () {
    const { editable } = this.state
    const { getFieldDecorator }  = this.props.form
    const { record } = this.props
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 }
    }
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
            <span className={styles.edit}></span>
            <span>设置</span>
          </div>
        )}
      >
        {!editable ? (
          <div>
            <Row className='mb15'>
              <Col span={6}>
                <span>{APP.dictionary[`EnumTqType-${record.tqType}`]}</span>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <span>管理员账号：</span>
                <span>{record.tqAdmin}</span>
              </Col>
              <Col span={6}>
                <span>电话区号：</span>
                <span>{record.tqZoneCode}</span>
              </Col>
            </Row>
          </div>
        ) : (
          <Form>
            <div className={styles.box}>
              <FormItem
                {...formItemLayout}
              >
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('tqType', { initialValue: String(record.tqType) })(
                      <Select
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
              <FormItem
                label='管理员账号'
                {...formItemLayout}
              >
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('tqAdmin', { initialValue: record.tqAdmin})(
                      <Input />
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
                    {getFieldDecorator('tqZoneCode', { initialValue: record.tqZoneCode })(
                      <Input />
                    )}
                  </Col>
                </Row>
              </FormItem>
            </div>
            <Button
              className='mt20'
              type='primary'
              onClick={() => {
                this.onOk()
              }}
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
