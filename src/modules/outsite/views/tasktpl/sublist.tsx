import React from 'react'
import { Table, Button, Row, Col, Modal } from 'antd'
import SearchForm from '@/modules/outsite/components/TplSearchForm'
import HCframe from '@/modules/common/components/HCframe'
import {  TasktplItem } from '@/modules/outsite/types/tploutside'
import MessageShowModal from '@/modules/outsite/views/tasktpl/tpllist.model'
import Service from '@/modules/outsite/services'
import _ from 'lodash'

const styles = require('@/modules/outsite/styles/tpllist')
const data: any = [
  {
    id: '3',
    name: '网上申请',
    priority: 'close',
    status: 'normal', // 状态 forbidden 禁用 normal 启用
    type: 'sub',
    category: 'tax', // tax 税务，business 工商，others 其他，special 特殊

    subList: null,
    delFlag: 0
  },
  {
    id: '4',
    name: '下发执照',
    priority: 'close',
    status: 'forbidden',
    type: 'sub',
    category: 'business',
    subList: null,
    delFlag: 0
  },
  {
    id: '5',
    name: '刻章',
    priority: 'close',
    status: 'normal',
    type: 'sub',
    category: 'others',
    subList: null,
    delFlag: 0
  }
]
class Main extends React.Component<any, any> {
  public columns = [{
    title: '子任务名称',
    dataIndex: 'name'
  }, {
    title: '任务分类',
    dataIndex: 'category',
    render: (k: any, item: TasktplItem) => {
      return Service.taskTplCateDict[item.category]
    }
    /*
  }, {
    title: '期限(天))',
    dataIndex: 'id'
    */
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
    title: '操作',
    dataIndex: 'take',
    render: (k: any, item: TasktplItem) => {
      return (
        <span>
          <span className={`likebtn`} onClick={() => { this.onShow.bind(this)(item) }}>编辑</span>
          <span className={`likebtn`} onClick={() => { this.onBegin.bind(this)(item) }}>{item.status === 'normal' ? '启用' : '禁用'}</span>
        </span>
      )
    }
  }]
  constructor (props: any) {
    super(props)
    const value = props.value || {}
    this.state = {
      selectedRowKeys: [],
      modalVisible: false,
      searchData:{
        name: '',
        status: '',
        category: '',
        pageSize: 10,
        pageCurrent: 1
      },
      subItem: {
        name: '',
        category: ''
      },
      dataSource: [],
      showTitle:''// 弹窗的标题
    }
  }

  public componentWillMount () {
    this.getList()
  }

  public render () {
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [{
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          this.setState({
            // selectedRowKeys: [...Array(46).keys()] // 0...45
          })
        }
      }, {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys: any) => {
          let newSelectedRowKeys = []
          newSelectedRowKeys = changableRowKeys.filter((key: any, index: any) => {
            if (index % 2 !== 0) {
              return false
            }
            return true
          })
          this.setState({ selectedRowKeys: newSelectedRowKeys })
        }
      }, {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys: any) => {
          let newSelectedRowKeys = []
          newSelectedRowKeys = changableRowKeys.filter((key: any, index: any) => {
            if (index % 2 !== 0) {
              return true
            }
            return false
          })
          this.setState({ selectedRowKeys: newSelectedRowKeys })
        }
      }]
      // onSelection: this.onSelection
    }
    return (
      <div className={styles.container}>
      <HCframe
        title='其他任务配置'
        act={<div>
          <a onClick={this.addtBtn.bind(this)} className='btn'><i>+</i> 新增</a>
        </div>}
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
          columns={this.columns}
          dataSource={this.state.dataSource}
        />
        </Row>
      </HCframe>
      <Modal
        title={this.state.showTitle}
        visible={this.state.modalVisible}
        onOk={this.modalHandleOk.bind(this)}
        onCancel={this.modalHandleCancel.bind(this)}
        // footer={null}
      >
        <MessageShowModal data={this.state.subItem} identifying={this.state.showTitle} onChange={this.onSubFormChange.bind(this)}/>
      </Modal>
    </div>
    )
  }

  public getList () {
    Service.getTplSublistByCond(this.state.searchData).then((res: any) => {
      if (!res || !res.records) {
        return
      }
      const { searchData } = this.state
      searchData.pageSize = res.size
      searchData.pageCurrent = res.current
      this.setState({
        dataSource: res.records,
        searchData
      })
    })
  }

  // 搜索表单改变
  public onChange (formData: any) {
    console.log('表单改变', formData)
    const { searchData } = this.state
    _.extend(searchData, formData)
    this.setState({
      searchData
    }, () => {
      this.getList()
    })
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

  // 新增
  public addtBtn () {
    console.log('点击新增')
    this.setState({
      showTitle: '新增',
      // 置空item
      subItem: {
        name: '',
        category: ''
      }
    })
    // service.delList(selectedRowKeys)
    this.modalShow()
  }

  // 搜索
  public searchBtn () {
    const { selectedRowKeys } = this.state
    console.log('set readed list::', selectedRowKeys)
    // service.setReadedList(selectedRowKeys)
  }

  // 编辑
  public onShow (subItem: TasktplItem) {
    console.log('点击编辑', subItem)
    this.setState({
      showTitle: '编辑',
      subItem
    }, () => {
      this.modalShow()
    })
  }

  // 启用
  public onBegin (subItem: TasktplItem) {
    console.log('点击启用禁用')
    this.setState({
      showTitle: '确认信息',
      subItem
    })
    this.modalShow()
  }

  // 选择的数组
  public onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  // 分页
  public pageChange = (selectedRowKeys: any) => {
    console.log('pageChange changed: ', selectedRowKeys)
  }

  public modalShow () {
    console.log('current state::', this.state)
    this.setState({
      modalVisible: true
    })
  }

  public modalHide () {
    this.setState({
      modalVisible: false
    })
  }

  // 添加子任务
  public modalHandleOk () {
    const { showTitle, subItem } = this.state
    // 禁用的弹出 // TODO: 禁用和表单弹层不应该写到一个文件，后面分离
    if (showTitle !== '编辑' && showTitle !== '新增') {
      subItem.status = 'FORBIDEEN'
      Service.addTplSubItem(subItem).then(() => {
        this.getList()
        this.modalHide()
      })
    } else {
      if (!subItem.name || !subItem.category) {
        return
      }
      Service.addTplSubItem(subItem).then(() => {
        this.getList()
        this.modalHide()
      })
    }
  }

  public modalHandleCancel () {
    this.modalHide()
  }
}
export default Main
