import React from 'react'
import { Table, Input, Form, Button, Tooltip } from 'antd'
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
    title: (
      <span>
        自动分配权值
        <Tooltip placement='top' title='自动分配客户量会根据分配权值比例来分，权值为0，则不予分配，输入范围（0-10）'>
          <i className='fa fa-exclamation-circle ml5'></i>
        </Tooltip>
      </span>
    ),
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
    title: (
      <span>
        自动分配日最大值
        <Tooltip placement='top' title='自动分配客户量若达到日最大值上限，则系统不再自动分与该代理商，输入范围 （0-99999）'>
          <i className='fa fa-exclamation-circle ml5'></i>
        </Tooltip>
      </span>
    ),
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
