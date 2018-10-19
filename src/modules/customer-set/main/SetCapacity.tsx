import React from 'react'
import { Table, Input, Form, Button, Tooltip } from 'antd'
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
interface Props extends Customer.Props, FormComponentProps {
  cityCodes?: {key: string, label: string}[]
}
class Main extends React.Component<Props> {
  public cityCodeArr = ''
  public state: States = {
    selectedRowKeys: []
  }
  public columns: ColumnProps<DetailProps>[] = [{
    title: '大区',
    dataIndex: 'regionName'
  }, {
    title: '省市',
    dataIndex: 'cityName'
  }, {
    title: '机构名称',
    dataIndex: 'agencyName'
  }, {
    title: (
      <span>
        销售库容/个
        <Tooltip placement='top' title='销售库容设置对该机构全部销售有效，且每人上限值一样；销售主管和总经理不受此限制，输入值范围（0-999999）'>
          <i className='fa fa-exclamation-circle ml5'></i>
        </Tooltip>
      </span>
    ),
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
    title: (
      <span>
        最大跟进期/天
        <Tooltip placement='top' title='若销售在规定天数内没有写跟进记录，则客户自动分予组内其他销售，输入值范围（0-9999）'>
          <i className='fa fa-exclamation-circle ml5'></i>
        </Tooltip>
      </span>
    ),
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
    title: (
      <span>
        最大保护期
        <Tooltip placement='top' title='若销售在规定天数内没有完成签单，则客户自动分予组内其他销售 ，输入值范围（0-9999）'>
          <i className='fa fa-exclamation-circle ml5'></i>
        </Tooltip>
      </span>
    ),
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
  public componentWillReceiveProps (props: Props) {
    const cityCodes = props.cityCodes
    const codes: string[] = []
    cityCodes.forEach((item) => {
      codes.push(item.key)
    })
    const cityCodeArr = codes.join(',')
    if (cityCodeArr !== this.cityCodeArr) {
      this.cityCodeArr = cityCodeArr
      changeCapacityAction(cityCodeArr)
    }
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
