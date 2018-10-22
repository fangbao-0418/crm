import React from 'react'
import { Table, Input, Form, Button } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { FormComponentProps } from 'antd/lib/form/Form'
import { connect } from 'react-redux'
import _ from 'lodash'
type LinkManProps = Customer.LinkManProps
interface Props extends FormComponentProps {
  linkMan: LinkManProps[]
  disabled?: boolean
  onOk?: (data?: LinkManProps[]) => void
  onCancel?: () => void
}
const FormItem = Form.Item
const styles = require('./style')
class Main extends React.Component<Props> {
  public data: LinkManProps[] = []
  public columns: ColumnProps<LinkManProps>[] = [
    {
      title: '联系人',
      dataIndex: 'contactPerson',
      render: (text, record, index) => {
        const { getFieldDecorator } = this.props.form
        return (
          <FormItem>
            {getFieldDecorator(`contactPerson-${record.key}`, {
              initialValue: text,
              rules: [
                {
                  required: true,
                  message: '联系人不能为空'
                }
              ]
            })(
              this.props.disabled ?
                <span>{text}</span>
              :
                <Input
                  onChange={this.onChange.bind(this, index, 'contactPerson')}
                />
            )}
          </FormItem>
        )
      }
    },
    {
      title: '联系电话',
      dataIndex: 'contactPhone',
      render: (text, record, index) => {
        const { getFieldDecorator } = this.props.form
        return (
          <FormItem key={`input-${record.key}`}>
            {getFieldDecorator(`contactPhone-${record.key}`, {
              initialValue: text,
              rules: [
                {
                  required: true,
                  message: '电话不能为空'
                }
              ]
            })(
              this.props.disabled ?
                <span>{text}</span>
              :
                <Input
                  onChange={this.onChange.bind(this, index, 'contactPhone')}
                />
            )}
          </FormItem>
        )
      }
    },
    {
      title: '操作',
      width: '80px',
      align: 'center',
      render: (text, record, index) => {
        return (
          <span
            hidden={this.props.disabled}
            onClick={() => {
              const data = this.props.linkMan
              APP.dispatch({
                type: 'change customer data',
                payload: {
                  linkMan: data.filter((item) => item.key !== record.key)
                }
              })
            }}
            className='href'
          >
            删除
          </span>
        )
      }
    }
  ]
  public onChange (index: number, field: string, e: React.SyntheticEvent) {
    const value = $(e.target).val()
    const data: any = this.props.linkMan
    data[index][field] = value
    APP.dispatch<Customer.Props>({
      type: 'change customer data',
      payload: {
        linkMan: data
      }
    })
  }
  public render () {
    return (
      <div className={styles.container} style={{width: '100%'}}>
        <Form>
          <Table
            dataSource={this.props.linkMan}
            columns={this.columns}
            pagination={false}
            bordered
          />
        </Form>
        <div className='mt20 text-right'>
          <Button
            type='primary'
            className='mr5'
            onClick={() => {
              this.props.form.validateFields((errs, vals) => {
                if (errs) {
                  return
                }
                const data = _.cloneDeep(this.props.linkMan)
                data.map((item) => {
                  delete item.key
                })
                if (this.props.onOk) {
                  this.props.onOk(data)
                }
              })
            }}
          >
            保存
          </Button>
          <Button
            onClick={() => {
              if (this.props.onCancel) {
                this.props.onCancel()
              }
            }}
          >
            取消
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
