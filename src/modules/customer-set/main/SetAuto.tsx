import React from 'react'
import { Table, Input, Form, Button } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { FormComponentProps } from 'antd/lib/form'
import { connect } from 'react-redux'
import { saveAutoAssign } from '@/modules/customer-set/api'
import { changeAutoAssignAction } from '@/modules/customer-set/actions'
const FormItem = Form.Item
type DetailProps = Customer.AutoAssignProps
interface Props extends Customer.Props, FormComponentProps {}
class Main extends React.Component<Props> {
  public columns: ColumnProps<DetailProps>[] = [{
    title: '大区',
    dataIndex: 'bigAreaName'
  }, {
    title: '省市',
    dataIndex: 'cityName'
  }, {
    title: '机构名称',
    dataIndex: 'agencyName'
  }, {
    title: '自动分配权值',
    dataIndex: 'autoDistributeWeight',
    render: (text, record, index) => {
      return (
        <FormItem
          style={{marginBottom: '0px'}}
        >
          {this.props.form.getFieldDecorator(`autoDistributeWeight[${index}]`, {
            initialValue: text,
            rules: [{
              pattern: /^([0-9]|10)$/,
              message: '权值只能输入0-10'
            }]
          })(
          <Input
            onChange={this.onChange.bind(this, index, 'autoDistributeWeight')}
            value={text}
          />
          )}
        </FormItem>
      )
    }
  }, {
    title: '自动分配日最大值',
    dataIndex: 'autoDistributeMaxNum',
    render: (text, record, index) => {
      return (
        <FormItem
          style={{marginBottom: '0px'}}
        >
          {this.props.form.getFieldDecorator(`autoDistributeMaxNum[${index}]`, {
            initialValue: text,
            rules: [{
              pattern: /^\d{1,5}$/,
              message: '权值只能输入0-99999'
            }]
          })(
            <Input
              onChange={this.onChange.bind(this, index, 'autoDistributeMaxNum')}
              value={text}
            />
          )}
        </FormItem>
      )
    }
  }]
  public componentWillMount () {
    changeAutoAssignAction()
  }
  public onChange (index: number, field: string, e: React.SyntheticEvent) {
    const value = String($(e.target).val())
    const dataSource: any = this.props.autoAssign
    dataSource[index][field] = value
    APP.dispatch({
      type: 'change customer data',
      payload: {
        autoAssign: dataSource
      }
    })
  }
  public save () {
    this.props.form.validateFields((errors, values) => {
      if (errors === null) {
        const dataSource: any = this.props.autoAssign
        saveAutoAssign(dataSource)
        APP.success('保存成功')
      }
    })
  }
  public render () {
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={this.props.autoAssign}
          bordered
          rowKey={'customerId'}
          pagination={false}
        />
        <div className='text-right mt10'>
          <Button
            type='primary'
            onClick={this.save.bind(this)}
          >
            保存
          </Button>
        </div>
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return {
    ...state.customer
  }
})(Form.create()(Main))
