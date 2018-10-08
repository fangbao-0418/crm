import React from 'react'
import { Table, Button, Row, Col, Modal } from 'antd'
import SearchForm from '@/modules/outsite/components/TplSearchForm'
import HCframe from '@/modules/common/components/HCframe'
import {  OrderItem } from '@/modules/outsite/types/tploutside'
import MessageShowModal from '@/modules/outsite/views/tasktpl/tpllist.model'
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
    dataIndex: 'category'
  }, {
    title: '期限(天))',
    dataIndex: 'id'
  },  {
    title: '操作时间',
    dataIndex: 'id'
  }, {
    title: '状态',
    dataIndex: 'status'
  }, {
    title: '操作',
    dataIndex: 'take',
    render: (k: any, item: OrderItem) => {
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
      showData:{},
      showTitle:''// 弹窗的标题
    }
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
      <HCframe title='其他任务配置'>
        <Row>
          <Col span={20}>
            <SearchForm onChange={this.onChange.bind(this)} />
          </Col>
          <Col span={4} style={{textAlign: 'right'}}>
            <span className={styles.acts}>
              <Button type='primary'  onClick={this.searchBtn.bind(this)}>搜索</Button>
              <Button type='primary'  onClick={this.addtBtn.bind(this)}>新增</Button>
            </span>
          </Col>
        </Row>
        <Row>
        <Table  columns={this.columns} dataSource={data} />
        </Row>
      </HCframe>
      <Modal
        title={this.state.showTitle}
        visible={this.state.modalVisible}
        onOk={this.modalHandleOk.bind(this)}
        onCancel={this.modalHandleCancel.bind(this)}
        footer={null}
      >
        <MessageShowModal data={this.state.showData} identifying={this.state.showTitle}/>
      </Modal>
    </div>
    )
  }
  // 表单改变
  public onChange (formData: any) {
    console.log('表单改变', formData)
  }

  // 新增
  public addtBtn () {
    console.log('点击新增')
    this.setState({ showTitle: '新增' })
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
  public onShow (item: OrderItem) {
    console.log('点击编辑')
    this.setState({ showTitle: '编辑' })
    this.modalShow(item)
  }
  // 启用
  public onBegin (item: OrderItem) {
    console.log('点击启用禁用')
    this.setState({ showTitle: '确认信息' })
    this.modalShow(item)
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
  public modalShow (showData: any = {}) {
    this.setState({
      modalVisible: true,
      showData
    })
  }
  public modalHide () {
    this.setState({
      modalVisible: false
    })
  }

  public modalHandleOk () {
    this.modalHide()
  }

  public modalHandleCancel () {
    this.modalHide()
  }
}
export default Main
