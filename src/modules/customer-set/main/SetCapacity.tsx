import React from 'react'
import { Table, Input, Form, Button } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { FormComponentProps } from 'antd/lib/form'
import { connect } from 'react-redux'
import { changeCapacityAction } from '@/modules/customer-set/actions'
import { saveStorageCapacity } from '@/modules/customer-set/api'
const FormItem = Form.Item
type DetailProps = Customer.CapacityProps
interface States {
  selectedRowKeys: string[]
}
interface Props extends Customer.Props, FormComponentProps {}
class Main extends React.Component<Props> {
  public state: States = {
    selectedRowKeys: []
  }
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
    title: '销售库容',
    dataIndex: 'storageCapacity',
    render: (text, record, index) => {
      return (
        <FormItem
          style={{marginBottom: '0px'}}
        >
          {this.props.form.getFieldDecorator(`storageCapacity[${index}]`, {
            initialValue: text,
            rules: [{
              pattern: /^\d{1,6}$/,
              message: '销售库容输入值范围（0-999999）'
            }]
          })(
            <Input
              onChange={this.onChange.bind(this, index, 'storageCapacity')}
              value={text}
            />
          )}
        </FormItem>
      )
    }
  }, {
    title: '最大跟进期',
    dataIndex: 'maxTrackDays',
    render: (text, record, index) => {
      return (
        <FormItem
          style={{marginBottom: '0px'}}
        >
          {this.props.form.getFieldDecorator(`maxTrackDays[${index}]`, {
            initialValue: text,
            rules: [{
              pattern: /^\d{1,4}$/,
              message: '最大跟进期输入值范围（0-9999）'
            }]
          })(
            <Input
              onChange={this.onChange.bind(this, index, 'maxTrackDays')}
              value={text}
            />
          )}
        </FormItem>
      )
    }
  }, {
    title: '最大保护期',
    dataIndex: 'maxProtectDays',
    render: (text, record, index) => {
      return (
        <FormItem
          style={{marginBottom: '0px'}}
        >
          {this.props.form.getFieldDecorator(`maxProtectDays[${index}]`, {
            initialValue: text,
            rules: [{
              pattern: /^\d{1,4}$/,
              message: '最大保护期输入值范围（0-9999）'
            }]
          })(
            <Input
              onChange={this.onChange.bind(this, index, 'maxProtectDays')}
              value={text}
            />
          )}
        </FormItem>
      )
    }
  }]
  public componentWillMount () {
    changeCapacityAction()
  }
  public onChange (index: number, field: string, e: React.SyntheticEvent) {
    const dataSource: any = this.props.capacity
    dataSource[index][field] = $(e.target).val()
    APP.dispatch({
      type: 'change customer data',
      payload: {
        capacity: dataSource
      }
    })
  }
  public save () {
    this.props.form.validateFields((errors, values) => {
      if (errors === null) {
        const dataSource = this.props.capacity
        saveStorageCapacity(dataSource)
        APP.success('保存成功')
      }
    })
  }
  public render () {
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={this.props.capacity}
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
