import React from 'react'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import { Input, Select, Table, Divider } from 'antd'
import { Modal } from 'pilipa'
import Detail from './Detail'
const Search = Input.Search
const Option = Select.Option
const dataSource = [{
  key: 1
}]
class Main extends React.Component {
  public columns = [
    {
      title: 'Key值'
    },
    {
      title: '键值'
    },
    {
      title: '类型'
    },
    {
      title: '描述'
    },
    {
      title: '操作',
      render: () => {
        return (
          <div>
            <span
              className='href'
              onClick={this.showDetail.bind(this)}
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
  public showDetail () {
    const modal = new Modal({
      title: '查看',
      content: <Detail />
    })
    modal.show()
  }
  public render () {
    return (
      <ContentBox
        title='配置中心'
        rightCotent={(
          <AddButton
            title='添加键值'
            onClick={this.showDetail.bind(this)}
          />
        )}
      >
        <div className='mb10'>
          <Search
            placeholder='请输入键值名称'
            onSearch={(value) => console.log(value)}
            style={{ width: 200 }}
            className='mr5'
          />
          <Select
            style={{ width: 120 }}
          >
            <Option value='jack'>Jack</Option>
          </Select>
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
