import React from 'react'
import { Table, Input, Form } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { FormComponentProps } from 'antd/lib/form/Form'
import { connect } from 'react-redux'
import ToCall from '@/modules/customer/linkman/ToCall'
const styles = require('./style')
type LinkManProps = Customer.LinkManProps
interface Props extends FormComponentProps {
  linkMan: LinkManProps[]
  disabled?: boolean
  detail?: Customer.DetailProps
  getWrappedInstance?: (ref?: any) => any
}
interface States {
  dataSource: LinkManProps[]
}
const FormItem = Form.Item
class Main extends React.Component<Props> {
  public dataSource = [{
    contactPerson: '',
    contactPhone: ''
  }]
  public state: States = {
    dataSource: []
  }
  public columns: ColumnProps<LinkManProps>[] = [
    {
      title: '联系人',
      dataIndex: 'contactPerson',
      render: (text, record, index) => {
        const { getFieldDecorator } = this.props.form
        if (this.props.disabled) {
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
                <div>
                  <span>
                    {text || '暂无'}
                  </span>
                  {
                    record.isSignPerson === 1 &&
                    <span className={styles.signed}>签约</span>
                  }
                </div>
              )}
            </FormItem>
          )
        } else {
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
                record.isSignPerson === 1 ?
                  <div>
                    <span>
                      {text}
                    </span>
                    <span className={styles.signed}>签约</span>
                  </div>
                :
                  <Input
                    onChange={this.onChange.bind(this, index, 'contactPerson')}
                    value={text}
                  />
              )}
            </FormItem>
          )
        }
      }
    },
    {
      title: '联系电话',
      dataIndex: 'contactPhone',
      render: (text, record, index) => {
        const { getFieldDecorator } = this.props.form
        if (this.props.disabled) {
          return (
            <FormItem>
              <span>{text.trim()}</span>
              {!!text && <ToCall
                style={{
                  verticalAlign: 'sub',
                  marginLeft: '4px'
                }}
                phone={text}
                name={record.contactPerson}
                detail={this.props.detail}
              />}
            </FormItem>
          )
        } else {
          return (
            <FormItem>
              {getFieldDecorator(`contactPhone-${record.key}`, {
                initialValue: text.trim(),
                rules: [
                  {
                    required: true,
                    message: '联系电话不能为空'
                  },
                  {
                    max: 13,
                    message: '电话最多13位'
                  }
                ]
              })(
                record.isSignPerson === 1 ?
                  <span>{text.trim()}</span>
                :
                  <Input
                    type='number'
                    onChange={this.onChange.bind(this, index, 'contactPhone')}
                    value={text}
                  />
              )}
            </FormItem>
          )
        }
      }
    },
    {
      title: '来源',
      dataIndex: 'source',
      width: '100px',
      align: 'center',
      render: (text, record, index) => {
        return APP.dictionary[`EnumContactSource-${text}`]
      }
    },
    {
      title: '备注',
      dataIndex: 'remark',
      render: (text, record, index) => {
        return (
          <FormItem>
            {this.props.form.getFieldDecorator(`remark-${record.key}`, {
              initialValue: text
            })(
              this.props.disabled ?
                <span>{text}</span>
              :
                <Input
                  value={text}
                  onChange={this.onChange.bind(this, index, 'remark')}
                />
            )}
          </FormItem>
        )
      }
    },
    {
      title: '职务',
      dataIndex: 'duty',
      render: (text, record, index) => {
        return (
          <FormItem>
            {this.props.form.getFieldDecorator(`duty-${record.key}`, {
              initialValue: text
            })(
              this.props.disabled ?
                <span>{text}</span>
              :
                <Input
                  value={text}
                  onChange={this.onChange.bind(this, index, 'duty')}
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
              data.splice(index, 1)
              APP.dispatch({
                type: 'change customer data',
                payload: {
                  linkMan: data
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
  public componentWillMount () {
    if (this.props.getWrappedInstance) {
      this.props.getWrappedInstance(this)
    }
  }
  public onChange (index: number, field: string, e: React.SyntheticEvent) {
    const value = $(e.target).val()
    const data: any = this.props.linkMan
    data[index][field] = value
    APP.dispatch({
      type: 'change customer data',
      payload: {
        linkMan: data
      }
    })
  }
  public render () {
    return (
      <div
        className={styles.linkman}
        style={{width: '100%'}}
      >
        <Form>
          <Table
            dataSource={this.props.linkMan}
            columns={this.columns}
            pagination={false}
          />
        </Form>
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return {
    ...state.customer
  }
})(Form.create()(Main))
