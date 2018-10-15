import React from 'react'
import ContentBox from '@/modules/common/content'
import { Input, Select, Table, Divider, DatePicker } from 'antd'
import { Modal } from 'pilipa'
import Detail from './Detail'
const Search = Input.Search
const Option = Select.Option
const dataSource = [{
  key: 1
}]
const { RangePicker } = DatePicker
class Main extends React.Component {
  public columns = [
    {
      title: '操作日志'
    },
    {
      title: '操作人'
    },
    {
      title: '操作事件'
    },
    {
      title: '操作',
      render: () => {
        return (
          <div>
            <span
              className='href'
              onClick={() => {
                APP.history.push('/operate-log/detail/1')
              }}
            >
              查看
            </span>
            <Divider type='vertical'/>
            <span className='href'>删除</span>
          </div>
        )
      }
    }
  ]
  public render () {
    return (
      <ContentBox
        title='操作日志'
      >
        <div className='mb10'>
          <Search
            placeholder='请输入操作人'
            onSearch={(value) => console.log(value)}
            style={{ width: 200 }}
            className='mr5'
          />
          <RangePicker />
        </div>
        <div>
          <Table
            columns={this.columns}
            dataSource={dataSource}
          />
        </div>
      </ContentBox>
    )
  }
}
export default Main
