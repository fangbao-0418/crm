import React from 'react'
import { Row, Col, Form, Input, Button, Tooltip } from 'antd'
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
}
class Main extends React.Component<Props> {
  public state: State = {
    editable: false
  }
  public componentWillMount () {
    if (this.props.selectedRowKeys && this.props.selectedRowKeys.length > 0) {
      this.setState({
        editable: true
      })
    }
  }
  public onOk () {
    this.props.form.validateFields((err, vals: Setting.Params) => {
      console.log(vals, 'vals')
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
            storageCapacity: vals.storageCapacity,
            maxTrackDays: vals.maxTrackDays,
            maxProtectDays: vals.maxProtectDays
          })
        })
        console.log(arr, 'arr')
        saveItems(arr).then((res) => {
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
    return (
      <Card
        title='库容设置'
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
          <Row>
            <Col span={6}>
              <span>
                <Tooltip placement='top' title='销售库容设置对该机构全部销售有效，且每人上限值一样；销售主管和总经理不受此限制，输入值范围（0-999999）'>
                  <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
                </Tooltip>
                <span className='ml5'>销售库容：</span>
              </span>
              <span>{record.storageCapacity}天</span>
            </Col>
            <Col span={6}>
              <span>
                <Tooltip placement='top' title='若销售在规定天数内没有写跟进记录，则客户自动分予组内其他销售，输入值范围（0-9999）'>
                  <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
                </Tooltip>
                <span className='ml5'>最大跟近期：</span>
              </span>
              <span>{record.maxTrackDays}天</span></Col>
            <Col span={6}>
              <span>
                <Tooltip placement='top' title='若销售在规定天数内没有完成签单，则客户自动分予组内其他销售 ，输入值范围（0-9999）'>
                  <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
                </Tooltip>
                <span className='ml5'>最大保护期：</span>
              </span>
              <span>{record.maxProtectDays}天</span>
            </Col>
          </Row>
        ) : (
          <Form>
            <div className={styles.box}>
              <FormItem
                label={(
                  <span>
                    <Tooltip placement='top' title='销售库容设置对该机构全部销售有效，且每人上限值一样；销售主管和总经理不受此限制，输入值范围（0-999999）'>
                      <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
                    </Tooltip>
                    <span className='ml5'>销售库容</span>
                  </span>
                )}
                {...formItemLayout}
              >
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('storageCapacity', { initialValue: record.storageCapacity })(
                      <Input />
                    )}
                  </Col>
                  <Col span={8}>
                    天
                  </Col>
                </Row>
              </FormItem>
              <FormItem
                label={(
                  <span>
                    <Tooltip placement='top' title='若销售在规定天数内没有写跟进记录，则客户自动分予组内其他销售，输入值范围（0-9999）'>
                      <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
                    </Tooltip>
                    <span className='ml5'>最大跟进期</span>
                  </span>
                )}
                {...formItemLayout}
              >
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('maxTrackDays', { initialValue: record.maxTrackDays })(
                      <Input />
                    )}
                  </Col>
                  <Col span={8}>
                    天
                  </Col>
                </Row>
              </FormItem>
              <FormItem
                label={(
                  <span>
                    <Tooltip placement='top' title='若销售在规定天数内没有完成签单，则客户自动分予组内其他销售 ，输入值范围（0-9999）'>
                      <i className='fa fa-info-circle ml5' style={{color: '#C9C9C9'}}></i>
                    </Tooltip>
                    <span className='ml5'>最大保护期</span>
                  </span>
                )}
                {...formItemLayout}
                style={{margin: 0}}
              >
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('maxProtectDays', { initialValue: record.maxProtectDays })(
                      <Input />
                    )}
                  </Col>
                  <Col span={8}>
                    天
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
