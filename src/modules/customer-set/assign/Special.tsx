import React from 'react'
import { Table, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { connect } from 'react-redux'
import { saveSpecialCapacity, deleteSpecialCapacity } from '../api'
import { fetchSpecialListAction } from '../actions'
const Option = Select.Option
interface Props extends Customer.Props {
  disabled?: boolean
  sales: Array<{salespersonId?: string, salespersonName?: string}>
}
interface State {
  sourceList: {label: string, value: string, disabled?: boolean}[]
}
class Main extends React.Component<Props, State> {
  public sourceList: {label: string, value: string, disabled?: boolean}[] = APP.keys.EnumCustomerSource
  public state: State = {
    sourceList: APP.keys.EnumCustomerSource
  }
  public columns: ColumnProps<CustomerSet.SpecialAssetsProps>[] = [
    {
      title: '特殊资源',
      width: 200,
      dataIndex: 'sourceId',
      render: (text, record, index) => {
        const disabled = record.disabled !== undefined ? record.disabled : true
        const sourceList = this.state.sourceList
        const spicalAssetsList = this.props.spicalAssetsList
        const newText = this.handleSourceData(record.sourceId, record.sourceName)
        return (
          <div>
            <Select
              disabled={disabled}
              labelInValue
              style={{width: '100px'}}
              defaultValue={newText}
              onChange={(val: {key: string, label: string}) => {
                this.handleSourceList(val)
                spicalAssetsList[index].sourceId = val.key
                spicalAssetsList[index].sourceName = val.label
              }}
            >
              {
                sourceList.map((item) => {
                  return (
                    <Option key={item.value} disabled={item.disabled}>{item.label}</Option>
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
      dataIndex: 'salesperson',
      render: (text, record, index) => {
        const disabled = record.disabled !== undefined ? record.disabled : true
        const spicalAssetsList = this.props.spicalAssetsList
        const newText = this.handleData(text)
        return (
          <div>
            <Select
              labelInValue
              disabled={disabled}
              mode='multiple'
              defaultValue={newText}
              onChange={(val: Array<{key: string, label: string, salespersonId: string, salespersonName: string}>) => {
                const newVal = val.map((item) => {
                  return {
                    salespersonId: item.key,
                    salespersonName: item.label
                  }
                })
                spicalAssetsList[index].salesperson = newVal
              }}
              style={{ width: '100%' }}
            >
              {
                this.props.sales.map((item) => {
                  return (
                    <Option key={item.salespersonId}>{item.salespersonName}</Option>
                  )
                })
              }
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
                if (!disabled) {
                  this.onSave(index)
                }
              }}
            >
              {disabled ? '编辑' : '保存'}
            </span>
            <span
              className='href'
              onClick={() => {
                const { sourceList } = this.state
                if (record.sourceId) {
                  sourceList.push({
                    label: record.sourceName,
                    value: record.sourceId
                  })
                  this.setState({
                    sourceList
                  })
                  deleteSpecialCapacity(record.sourceId).then(() => {
                  })
                }
                spicalAssetsList.splice(index, 1)
                console.log(spicalAssetsList, 'spicalAssetsList')
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
  public componentWillMount () {
    fetchSpecialListAction((res) => {
      const sourceList = this.sourceList.filter((item) => {
        return res.findIndex((item2) => {
          console.log(item2.sourceId, item.value, 'sssss')
          return String(item2.sourceId) === String(item.value)
        }) === -1
      })
      console.log(res, sourceList, 'sourceList')
      this.setState({
        sourceList
      })
    })
  }
  public handleSourceList (value: {key: string, label: string}) {
    const { sourceList } = this.state
    const data = sourceList.filter((item) => {
      return item.value !== value.key
    })
    this.setState({
      sourceList: data
    })
  }
  public handleData (value: {salespersonId: string, salespersonName: string}[]): {
    label: React.ReactNode, key: string
  }[] {
    return value.map((item) => {
      return {
        label: item.salespersonName,
        key: item.salespersonName ? String(item.salespersonId) : ''
      }
    })
  }
  public handleSourceData (sourceId: string, sourceName: string) {
    return [{key: sourceName ? String(sourceName) : '', label: sourceName}]
  }
  public onSave (index: number) {
    const params = this.props.spicalAssetsList[index]
    delete params.disabled
    delete params.key
    saveSpecialCapacity(params).then(() => {
      APP.success('操作成功')
    })
  }
  public render () {
    return (
      <Table
        rowKey='key'
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
