import React from 'react'
import { Row, Col, Form, Input, Button, Tooltip, Switch } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import Card from '@/components/Card'
import { saveEntryone } from '../api'
const styles = require('./style')
const FormItem = Form.Item
interface Props extends FormComponentProps {
  record?: Setting.ItemProps
  selectedRowKeys?: string[]
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
      vals.isAutoDistribute = vals.isAutoDistribute ? 1 : 0
      saveEntryone(vals).then((res) => {
        this.setState({
          editable: false
        })
      })
    })
  }
  public render () {
    const { editable } = this.state
    const { getFieldDecorator }  = this.props.form
    const record = this.props.record || {}
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 8 }
    }
    return (
      <Card
        title='自动分客设置'
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
                <span className='mr10'>自动分配</span>
                <Switch
                  defaultChecked={record.isAutoDistribute === 1}
                  disabled
                />
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <span>
                  <Tooltip placement='top' title='自动分配客户量会根据分配权值比例来分，输入范围（1-10）'>
                    <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
                  </Tooltip>
                  <span className='ml5'>分配权值：</span>
                </span>
                <span>{record.autoDistributeWeight}</span>
              </Col>
              <Col span={6}>
                <span>
                  <Tooltip placement='top' title='自动分配客户量若达到日最大值上限，则系统不再自动分与该代理商，输入范围 （1-99999）'>
                    <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
                  </Tooltip>
                  <span className='ml5'>日分配上限：</span>
                </span>
                <span>{record.autoDistributeMaxNum}</span>
              </Col>
            </Row>
          </div>
        ) : (
          <Form>
            <div className={styles.box}>
              <FormItem
                label='自动分配'
                {...formItemLayout}
              >
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('isAutoDistribute', { initialValue: record.isAutoDistribute })(
                      <Switch
                        defaultChecked={record.isAutoDistribute === 1}
                      />
                    )}
                  </Col>
                </Row>
              </FormItem>
              <FormItem
                label={(
                  <span>
                    <Tooltip placement='top' title='自动分配客户量会根据分配权值比例来分，输入范围（1-10）'>
                      <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
                    </Tooltip>
                    <span className='ml5'>分配权值</span>
                  </span>
                )}
                {...formItemLayout}
              >
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('autoDistributeWeight', { initialValue: record.autoDistributeWeight })(
                      <Input />
                    )}
                  </Col>
                </Row>
              </FormItem>
              <FormItem
                label={(
                  <span>
                    <Tooltip placement='top' title='自动分配客户量若达到日最大值上限，则系统不再自动分与该代理商，输入范围 （1-99999）'>
                      <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
                    </Tooltip>
                    <span className='ml5'>日分配上限</span>
                  </span>
                )}
                {...formItemLayout}
              >
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('autoDistributeMaxNum', { initialValue: record.autoDistributeMaxNum })(
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
