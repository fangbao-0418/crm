import React from 'react'
import { Row, Col, Form, Input, Button, Tooltip, Switch } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import Card from '@/components/Card'
import { saveEntryone, saveItems } from '../api'
const styles = require('./style')
const FormItem = Form.Item
interface Props extends FormComponentProps {
  record?: Setting.ItemProps
  selectedRowKeys?: string[]
}
interface State {
  editable: boolean
  isAll: boolean
}
class Main extends React.Component<Props> {
  public state: State = {
    editable: false,
    isAll: false
  }
  public componentWillMount () {
    if (this.props.selectedRowKeys && this.props.selectedRowKeys.length > 0) {
      this.setState({
        editable: true,
        isAll: true
      })
    }
  }
  public onOk () {
    this.props.form.validateFields((err, vals: Setting.Params) => {
      if (err) {
        return false
      }
      console.log(vals, 'vals')
      vals.isAutoDistribute = vals.isAutoDistribute ? 1 : 0
      if (this.props.record && this.props.record.agencyId) { // 单独设置
        vals.agencyId = this.props.record.agencyId
        saveEntryone(vals).then((res) => {
          // this.setState({
          //   editable: false
          // })
          APP.success('设置成功')
        })
      } else { // 批量设置
        const arr: Setting.Params[] = []
        const ary = this.props.selectedRowKeys
        ary.forEach((item) => {
          arr.push({
            agencyId: item,
            isAutoDistribute: vals.isAutoDistribute,
            autoDistributeWeight: vals.autoDistributeWeight,
            autoDistributeMaxNum: vals.autoDistributeMaxNum
          })
        })
        console.log(arr, 'arr')
        saveItems(2, arr).then((res) => {
          APP.success('设置成功')
        })
      }
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
    const validateAutoDistributeWeight = (rule: any, value: any, callback: any) => {
      if (value > 10) {
        callback('输入范围为（1-10）')
        return
      }
    }
    return (
      <Card
        title='自动分客设置'
        titleClassName={styles.title}
        rightContent={(
          <div
            className={styles.right}
            onClick={() => {
              if (APP.hasPermission('crm_set_customer_save_one_distribute') || this.state.isAll) {
                this.setState({
                  editable: true
                })
              }
            }}
          >
            {
              (APP.hasPermission('crm_set_customer_save_one_distribute') || this.state.isAll) &&
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
                    {getFieldDecorator('autoDistributeWeight', {
                      initialValue: record.autoDistributeWeight,
                      rules:[{
                        validator: validateAutoDistributeWeight
                      }]
                    })(
                      <Input maxLength={2} placeholder='1-10'/>
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
                      <Input maxLength={5} placeholder='1-99999'/>
                    )}
                  </Col>
                </Row>
              </FormItem>
            </div>
            {
              this.state.isAll ?
              <Button
                className='mt20'
                type='primary'
                onClick={() => {
                  this.onOk()
                }}
                hidden={!APP.hasPermission('crm_set_auto_distribute_save_bulk_distribute')}
              >
                保存
              </Button>
              :
              <Button
                className='mt20'
                type='primary'
                onClick={() => {
                  this.onOk()
                }}
                hidden={!APP.hasPermission('crm_set_customer_save_one_distribute')}
              >
                保存
              </Button>
            }
          </Form>
        )}
      </Card>
    )
  }
}
export default Form.create()(Main)
