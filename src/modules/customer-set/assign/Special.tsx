import React from 'react'
import { Table, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { connect } from 'react-redux'
const Option = Select.Option
interface Props extends Customer.Props {
  disabled?: boolean
}
interface State {
  sourceList: {label: string, value: string}[]
}
const children: React.ReactNode[] = []
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}
class Main extends React.Component<Props, State> {
  public state: State = {
    sourceList: APP.keys.EnumCustomerSource
  }
  public columns: ColumnProps<CustomerSet.SpecialAssetsProps>[] = [
    {
      title: '特殊资源',
      width: 200,
      render: (text, record) => {
        const disabled = record.disabled !== undefined ? record.disabled : true
        const sourceList = this.state.sourceList
        return (
          <div>
            <Select
              disabled={disabled}
              style={{width: '100px'}}
            >
              {
                sourceList.map((item) => {
                  return (
                    <Option key={item.value}>{item.label}</Option>
                  )
                })
              }
            </Select>
          </div>
        )
      }
    },
    {
      title: '自定义分配销售',
      render: (text, record) => {
        const disabled = record.disabled !== undefined ? record.disabled : true
        return (
          <div>
            <Select
              disabled={disabled}
              mode='multiple'
              defaultValue={['a10', 'c12']}
              // onChange={handleChange}
              style={{ width: '100%' }}
            >
              {children}
            </Select>
          </div>
        )
      }
    },
    {
      width: 100,
      title: '操作',
      align: 'center',
      render: (text, record, index) => {
        const disabled = record.disabled !== undefined ? record.disabled : true
        const spicalAssetsList = this.props.spicalAssetsList
        return (
          <div>
            <span
              className='href mr5'
              onClick={() => {
                spicalAssetsList[index].disabled = !disabled
                APP.dispatch({
                  type: 'change customer data',
                  payload: {
                    spicalAssetsList
                  }
                })
              }}
            >
              {disabled ? '编辑' : '保存'}
            </span>
            <span
              className='href'
              onClick={() => {
                spicalAssetsList.splice(index, 1)
                APP.dispatch({
                  type: 'change customer data',
                  payload: {
                    spicalAssetsList
                  }
                })
              }}
            >
              删除
            </span>
          </div>
        )
      }
    }
  ]
  public render () {
    return (
      <Table
        bordered
        dataSource={this.props.spicalAssetsList}
        columns={this.columns}
      />
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Main)
