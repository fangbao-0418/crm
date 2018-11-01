import React from 'react'
import { Divider, Table, Row, Col } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import SearchForm from '@/modules/outsite/components/TplSearchForm'
import ContentBox from '@/modules/common/content'
import MessageShowModal from '@/modules/outsite/views/tasktpl/tpllist.model'
import Service from '@/modules/outsite/services'
import AddButton from '@/modules/common/content/AddButton'
import _ from 'lodash'
import { Modal } from 'pilipa'
type TasktplItem = OutSide.TaskItem
const styles = require('@/modules/outsite/styles/tpllist')
interface State {
  selectedRowKeys: string[]
  pageConf: {
    total: number,
    size: number,
    current: number
  },
  subItem: {
    name: string,
    category: string
  },
  dataSource: any[]
}
class Main extends React.Component<any, State> {
  public pageSizeOptions = ['15', '30', '50', '80', '100', '200']
  public columns: ColumnProps<TasktplItem>[] = [{
    title: '子任务名称',
    dataIndex: 'name'
  }, {
    title: '任务分类',
    dataIndex: 'category',
    render: (k: any, item: TasktplItem) => {
      return Service.taskTplCateDict[item.category]
    }
  },  {
    title: '操作时间',
    dataIndex: 'updateTime'
  }, {
    title: '状态',
    dataIndex: 'status',
    render: (k: any, item: TasktplItem) => {
      return item.status === 'NORMAL' ? '启用' : '禁用' // Service.task[item.category]
    }
  }, {
    title:'关联商品',
    dataIndex: 'productName',
    render: (k: any, item: TasktplItem) => {
      return item.productName
    }
  }, {
    title:'最后操作',
    dataIndex: 'updateUser',
    render: (k: any, item: TasktplItem) => {
      return item.updateUser
    }
  },
  {
    title: '操作',
    width: 160,
    align: 'center',
    dataIndex: 'take',
    render: (k: any, item: TasktplItem) => {
      return (
        <span>
          <span className='href mr5' onClick={() => { this.onShow.bind(this)(item) }}>编辑</span>
          <Divider type='vertical' style={{color: '#979797'}}/>
          <span className='href' onClick={() => { this.onBegin.bind(this)(item) }}>{item.status === 'NORMAL' ? '禁用' : '启用'}</span>
        </span>
      )
    }
  }]
  public searchData: {
    pageSize: number,
    pageCurrent: number,
    name: string,
    status: string,
    priority: string,
    origId: string,
    category?: string
  } = {
    name: '',
    status: '',
    priority: '',
    category: '',
    pageSize: 15,
    origId: undefined,
    pageCurrent: 1
  }
  public state: State = {
    selectedRowKeys: [],
    pageConf: {
      total: 0,
      size: this.searchData.pageSize,
      current: this.searchData.pageCurrent
    },
    subItem: {
      name: '',
      category: ''
    },
    dataSource: []
  }

  public componentWillMount () {
    this.getList()
  }

  public getList () {
    Service.getTplSublistByCond(this.searchData).then((res: any) => {
      if (!res || !res.records) {
        return
      }
      const { pageConf } = this.state
      pageConf.size = res.pageSize
      pageConf.current = res.pageCurrent
      pageConf.total = res.pageTotal
      this.setState({
        pageConf,
        dataSource: res.records
      })
    })
  }

  // 搜索表单改变
  public onChange (formData: any) {
    this.searchData = formData
    this.getList()
  }

  // 添加表单改变
  public onSubFormChange (formData: any) {
    console.log('子任务表单：', formData)
    const { subItem } = this.state
    _.extend(subItem, formData)
    this.setState({
      subItem
    })
  }

  // 搜索
  public searchBtn () {
    const { selectedRowKeys } = this.state
    console.log('set readed list::', selectedRowKeys)
    // service.setReadedList(selectedRowKeys)
  }

  // 编辑
  public onShow (subItem: TasktplItem) {
    let ins: any
    const modal = new Modal({
      title: subItem ? '编辑' : '新增',
      content: (
        <MessageShowModal
          getInstance={(ref: any) => {
            ins = ref
          }}
          item={subItem}
        />
      ),
      onOk: () => {
        ins.submit().then((values: any) => {
          Service.editTplSubItem(values).then(() => {
            this.getList()
            modal.hide()
          })
        })
        // modal.hide()
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }

  // 启用
  public onBegin (subItem: TasktplItem) {
    subItem.status = subItem.status === 'FORBIDDEN' ? 'NORMAL' : 'FORBIDDEN'
    const modal = new Modal({
      title: '确认信息',
      content: (
        <Row className={styles['page-show']}>
          <Col style={{margin: 15}}>
            <div
              className={styles.div}
            >
              确定 {subItem.status === 'NORMAL' ? '启用' : '禁用'} {name} 的子任务吗?
            </div>
          </Col>
        </Row>
      ),
      onOk: () => {
        Service.changeTplSubItemStatus(subItem).then(() => {
          this.getList()
          modal.hide()
        })
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }

  // 选择的数组
  public onSelectChange = (selectedRowKeys: string[]) => {
    this.setState({ selectedRowKeys })
  }
  public render () {
    const { pageConf, selectedRowKeys } = this.state
    return (
      <ContentBox
        title='其他任务配置'
        rightCotent={(
          <div>
            <AddButton
              onClick={this.onShow.bind(this)}
              title='新增'
            >
            </AddButton>
          </div>
        )}
      >
        <Row>
          <Col span={20}>
            <SearchForm onChange={this.onChange.bind(this)} />
          </Col>
          <Col span={4} style={{textAlign: 'right'}}>
            <span className={styles.acts}>
            </span>
          </Col>
        </Row>
        <Row>
        <Table
          bordered
          columns={this.columns}
          dataSource={this.state.dataSource}
          pagination={{
            total: pageConf.total,
            current: pageConf.current,
            pageSize: pageConf.size,
            onChange: (page: any) => {
              this.searchData.pageCurrent = page
              this.getList()
            },
            onShowSizeChange: (current, size) => {
              this.searchData.pageCurrent = 1
              this.searchData.pageSize = size
              this.getList()
            },
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: this.pageSizeOptions,
            showTotal (total) {
              return `共计 ${total} 条`
            }
          }}
        />
        </Row>
      </ContentBox>
    )
  }
}
export default Main
