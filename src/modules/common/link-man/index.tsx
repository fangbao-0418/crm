import React from 'react'
import { Table, Input } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { connect } from 'react-redux'
type LinkManProps = Customer.LinkManProps
interface Props {
  linkMan: LinkManProps[]
}
interface States {
  dataSource: LinkManProps[]
}
const styles = require('./style')
class Main extends React.Component<Props> {
  public dataSource = [{
    contactPerson: '22',
    contactPhone: '222'
  }]
  public state: States = {
    dataSource: []
  }
  public columns: ColumnProps<LinkManProps>[] = [
    {
      title: '联系人',
      dataIndex: 'contactPerson',
      render: (text, record, index) => {
        return <Input onChange={this.onChange.bind(this, index, 'contactPerson')} value={text}/>
      }
    },
    {
      title: '联系电话',
      dataIndex: 'contactPhone',
      render: (text, record, index) => {
        return <Input onChange={this.onChange.bind(this, index, 'contactPhone')} value={text}/>
      }
    },
    // {
    //   title: '来源',
    //   dataIndex: 'customerSource',
    //   render: (text, record, index) => {
    //     return <Input onChange={this.onChange.bind(this, index, 'customerSource')} value={text}/>
    //   }
    // },
    // {
    //   title: '备注',
    //   dataIndex: 'mark',
    //   render: (text, record, index) => {
    //     return <Input onChange={this.onChange.bind(this, index, 'mark')} value={text}/>
    //   }
    // },
    // {
    //   title: '职务',
    //   dataIndex: 'worker',
    //   render: (text, record, index) => {
    //     return <Input onChange={this.onChange.bind(this, index, 'worker')} value={text}/>
    //   }
    // },
    {
      title: '操作',
      width: '80px',
      align: 'center',
      render: (text, record, index) => {
        return (
          <span
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
    console.log(this.props.linkMan)
    return (
      <div style={{width: '100%'}}>
        <Table
          dataSource={this.props.linkMan}
          columns={this.columns}
          pagination={false}
          bordered
        />
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return {
    ...state.customer
  }
})(Main)
