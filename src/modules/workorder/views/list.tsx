import React from 'react'
import { Table, DatePicker, Form, Select, Button, Row, Col } from 'antd'
import moment from 'moment'
import SearchForm from '../components/SearchForm'
import HCframe from '@/modules/common/components/HCframe'
import {  OrderItem } from '../types/workorder'
import Service from '@/modules/workorder/api'
import ContentBox from '@/modules/common/content'
const styles = require('../styles/list.styl')
const showPath = '/workorder/show'
const data: any = []
for (let i = 0; i < 25; i++) {
  data.push({
    id: i,
    workNo: `C ${i}`,
    customerName: `北京爱康鼎科技有限公司 ${i}`,
    createTime: `2018/09/18`,
    orderNo: `${i}`,
    name: `代理记账`,
    status: `准备材料(外勤)`,
    managerName:`张三 ${i}`
  })
}

class Main extends React.Component<any, any> {
  public columns = [{
    title: '工单编号',
    dataIndex: 'workNo'
  }, {
    title: '企业名称',
    dataIndex: 'customerName'
  }, {
    title: '创建日期',
    dataIndex: 'createTime',
    sorter: (a: any, b: any) => {
      return moment(a.createTime).unix() - moment(b.createTime).unix()
    }
  }, {
    title: '对应订单',
    dataIndex: 'orderNo'
  }, {
    title: '服务内容',
    dataIndex: 'name'
  }, {
    title: '当前状态',
    dataIndex: 'status'
  }, {
    title: '操作',
    dataIndex: 'take',
    render: (k: any, item: OrderItem) => {
      return (
        <div>
          <a  onClick={() => { this.onShow.bind(this)(item) }}>查看</a>
        </div>
      )
    }
  }]
  constructor (props: any) {
    super(props)
    const value = props.value || {}
    this.state = {
      selectedRowKeys: [],
      dataSource:[],
      pageSize: 10, // 一页多少条
      pageTotal: 1,  // 总数
      pageCurrent: 1, // 当前页数
      searchStr:'',  // 搜索条件
      chooseSever:'', // 选择的服务内容
      chooseState:'', // 选择的状态
      chooseBeginDate:'', // 开始时间
      chooseEndDate:''   // 结束时间
    }
  }
  public componentWillMount () {
    this.getList()
  }

  //分页
  public onChangeCurrent (page: number) {
    console.log(page)
    this.setState({
      pageCurrent:page
    }, () => {
      this.getList()
    })
  }
  public render () {
    const { selectedRowKeys, pageTotal } = this.state
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
      <ContentBox
        className={styles.container}
        title='我的工单'
        rightCotent={(
          // <span className={styles.acts}>
              <Button type='primary' onClick={this.exportBtn.bind(this)}>导出</Button>
            // </span>
        )}
      >
        <SearchForm onChange={this.onChange.bind(this)} />
        <Table
          className={styles.table}
          // onChange={this.pageChange}
          columns={this.columns}
          dataSource={this.state.dataSource}
          pagination={{
            total: pageTotal,
            showSizeChanger: true,
            pageSizeOptions: ['10', '30', '50', '80', '100', '200'],
            onShowSizeChange:(current, size) => {
              this.setState({
                pageCurrent: current,
                pageSize: size
              }, () => this.getList())
            },
            onChange:(page, pageSize) => {
              this.onChangeCurrent(page)
            }
          }}
        />
      </ContentBox>
    )
  }
  // 表单改变
  public onChange (formData: any) {
    console.log(formData)
    this.setState({
      pageCurrent: 1, // 表单改变时,当前分页为1
      searchStr: formData.text,  // 搜索条件
      chooseSever: formData.currency === '全部服务内容' ? '' : formData.currency, // 选择的服务内容
      chooseState: formData.orderState === '全部状态' ? '' : formData.orderState, // 选择的状态
      chooseBeginDate: formData.dateArr.length === 0 ? '' : formData.dateArr[0].format('YYYY-MM-DD'), // 开始时间
      chooseEndDate: formData.dateArr.length === 0 ? '' : formData.dateArr[1].format('YYYY-MM-DD')  // 结束时间
    }, () => {
      this.getList()
    })
  }

  // 导出
  public exportBtn () {
    this.getExportExcel()
  }
  // 查看
  public onShow (item: OrderItem) {
    APP.history.push(`${showPath}/${item.id}`)
  }
  // 选择的数组
  public onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }
  // 分页
  public pageChange = (pageIndex: any) => {
    console.log('pageIndex : ', pageIndex.current)
    this.setState({
      pageCurrent:pageIndex.current
    }, () => {
      this.getList()
    })
  }
  // 获取列表数据
  public getList () {
    const {searchStr, chooseSever, chooseState, chooseBeginDate, chooseEndDate, pageCurrent, pageSize} = this.state
    Service.getWorkOrderList(pageCurrent, pageSize, searchStr, chooseBeginDate, chooseEndDate, chooseSever, chooseState).then((res: any) => {
      // console.log('1212121', JSON.stringify(res))
      this.setState({
        dataSource: res.records,
        pageSize: res.pageSize,
        pageCurrent: res.pageCurrent,
        pageTotal: res.pageTotal
      })
    })
  }
  // 导出
  public getExportExcel () {
    const {searchStr, chooseSever, chooseState, chooseBeginDate, chooseEndDate} = this.state
    window.open(
      `/work/v1/api/order/excel?param=${searchStr}&` +
      `startDate=${chooseBeginDate}&` +
      `endDate=${chooseEndDate}&` +
      `name=${chooseSever}&` +
      `status=${chooseState}`
      )
  }
  // 下载 导出
  // public downFile (url: any, type = 'get') {
  //   window.open(url)
    // const xhr = new XMLHttpRequest()
    // xhr.open(type, url, true)
    // // xhr.setRequestHeader('Authorization', `Bearer ${APP.token}`)
    // xhr.responseType = 'blob'
    // xhr.onreadystatechange = () => {
    //   if (xhr.readyState === 4) {
    //     if (xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304)) {
    //       const name = xhr.getResponseHeader('Content-disposition')
    //       const filename = decodeURI(name.match(/filename="(.*)\"$/)[1])
    //       const blob = new Blob([xhr.response], {type: 'application/octet-binary'})
    //       const fileUrl = URL.createObjectURL(blob)
    //       const link = document.createElement('a')
    //       link.href = fileUrl
    //       link.download = filename
    //       link.click()
    //     }
    //   }
    // }
    // xhr.send(null)
  // }
}
export default Main
