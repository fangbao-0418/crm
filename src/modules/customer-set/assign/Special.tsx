import React from 'react'
import { Table, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { connect } from 'react-redux'
import { fetchSpecialList, saveSpecialCapacity, deleteSpecialCapacity } from '../api'
const Option = Select.Option
interface Props extends Customer.Props {
  disabled?: boolean
  sales: Array<{salespersonId?: string, salespersonName?: string}>
}
interface State {
  sourceList: {label: string, value: string}[]
}
class Main extends React.Component<Props, State> {
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
                spicalAssetsList[index].sourceId = val.key
                spicalAssetsList[index].sourceName = val.label
              }}
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
      dataIndex: 'salesPerson',
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
                spicalAssetsList[index].salesPerson = newVal
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
                console.log(record, 'record')
                deleteSpecialCapacity(record.sourceId)
                spicalAssetsList.splice(index, 1)
                APP.dispatch({
                  type: 'change customer data',
                  payload: {
                    spicalAssetsList
                  }
                })
                console.log(spicalAssetsList, 'spicalAssetsList2222')
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
    fetchSpecialList().then((res) => {
      const spicalAssetsList = res
      APP.dispatch({
        type: 'change customer data',
        payload: {
          spicalAssetsList
        }
      })
    })
    // const spicalAssetsList = [{sourceId: '0', sourceName: '自主开发', salesPerson: [{salespersonId: '1', salespersonName: '销售1'}]}]
    // APP.dispatch({
    //   type: 'change customer data',
    //   payload: {
    //     spicalAssetsList
    //   }
    // })
  }
  public handleData (value: {salespersonId: string, salespersonName: string}[]): {
    label: React.ReactNode, key: string
  }[] {
    return value.map((item) => {
      return {
        label: item.salespersonName,
        key: item.salespersonId
      }
    })
  }
  // [{key: '1', label: '自主开发'}]
  public handleSourceData (sourceId: string, handleSourceData: string) {
    return [{key: sourceId, label: handleSourceData}]
  }
  public onSave (index: number) {
    const params = this.props.spicalAssetsList[index]
    delete params.disabled
    saveSpecialCapacity(params).then(() => {
      APP.success('操作成功')
    })
  }
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
