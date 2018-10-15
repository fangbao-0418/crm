import React from 'react'
import { Table, Input, Divider } from 'antd'
import { DropDown } from 'pilipa'
const Search = Input.Search
class Main extends React.Component {
  public columns = [
    {
      title: '机构名称'
    },
    {
      title: '核算地区范围'
    },
    {
      title: '操作',
      render: () => {
        return (
          <div>
            <span>修改</span>
            <Divider type='vertical' />
            <span>删除</span>
          </div>
        )
      }
    }
  ]
  public render () {
    return (
      <div>
        <div className='mb10'>
          <Search
            className='inline-block middle mr5'
            placeholder='请输入代理商名称'
            onSearch={(value) => {
              console.log(value)
            }}
            style={{ width: 200 }}
          />
        </div>
        <div>
          <Table
            columns={this.columns}
          />
        </div>
      </div>
    )
  }
}
export default Main
