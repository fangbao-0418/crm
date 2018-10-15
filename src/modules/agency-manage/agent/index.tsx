import React from 'react'
import { Table, Input, Divider } from 'antd'
import { DropDown } from 'pilipa'
const Search = Input.Search
class Main extends React.Component {
  public columns = [
    {
      title: '代理商'
    },
    {
      title: '级别'
    },
    {
      title: '区域'
    },
    {
      title: '创建时间'
    },
    {
      title: '状态'
    },
    {
      title: '操作',
      render: () => {
        return (
          <div>
            <span>查看</span>
            <Divider type='vertical' />
            <span>修改</span>
            <Divider type='vertical' />
            <span>准备解约</span>
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
          <DropDown
            className='inline-block middle mr5'
            data={[]}
          />
          <DropDown
            className='inline-block middle'
            data={[]}
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
