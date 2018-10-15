import React from 'react'
import { Tabs, Table, Input, Popconfirm, Form  } from 'antd'
import InputCell from '@/modules/outsite/components/InputCell'
import { FormComponentProps } from 'antd/lib/form'
import { ColumnProps } from 'antd/lib/table'
import ContentBox from '@/modules/common/content'
import { PerfromItem, PerformList } from '@/modules/outsite/types/perform'
import PerService from '@/modules/outsite/services/perform'
const TabPane = Tabs.TabPane
const showPath = '@/subform'
const Search = Input.Search
interface MyColumnProps<T> extends ColumnProps<T> {
  editable?: boolean
}
const data: any = []
for (let i = 0; i < 25; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  })
}
interface EditableRowProps extends FormComponentProps {
  index: number
}
const EditableContext = React.createContext({})
const EditableRow = ({ form, index, ...props }: EditableRowProps) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)
interface States {
  modalTitle: string,
  modalVisible: boolean,
  chooseDate: string,
  dataSource: PerformList,
  spanText: string,
  currentId: number // 当前选中绩效id
  selectedRowKeys: string[],
  pageConf?: any,
  data?: any
  editingKey: string
}
interface Info {
  reward: number,
  companyId: number,
  productId: number,
  productName: string,
  productPrice?: any
}
interface ColProps extends PerfromItem {
  dataIndex: string
  title: string
}
function callback (key: string) {
  console.log(key)
}
class Main extends React.Component<any, any> {
  public state: States = {
    modalTitle: '',
    modalVisible: false,
    selectedRowKeys: [],
    dataSource: [],
    data: [],
    editingKey: '',
    chooseDate:'',
    spanText:'编辑',
    currentId: 0,
    pageConf: {
      current: 1,
      total: 11
    }
  }
  public columns: MyColumnProps<any>[] = [
    {
      title: '任务名称',
      dataIndex: 'name',
      render: (k: any, item: PerfromItem) => {
        return <span>{item.productName}</span>
      }
    },
    {
      title: '任务价格',
      dataIndex: 'age',
      render: (k: any, item: PerfromItem) => {
        return <span>{item.productPrice}</span>
      }
    },
    {
      title: '绩效额度',
      dataIndex: 'address',
      width: '30%',
      editable: true,
      render: (k: any, item: PerfromItem) => {
        return <span>{item.reward}</span>
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text: any, record: any) => {
        const editable = this.isEditing(record)
        return (
          <div>
            {editable ? (
              <span>
                <EditableContext.Consumer>
                  {(form) => (
                    <a
                      href='javascript:;'
                      onClick={() => this.save(form, record.key)}
                      style={{ marginRight: 8 }}
                    >
                      保存
                    </a>
                  )}
                </EditableContext.Consumer>
              </span>
            ) : (
              <a onClick={() => this.edit(record.key)}>编辑</a>
            )}
          </div>
        )
      }
    }
  ]
  constructor (props: any) {
    super(props)
    // this.state = { data, editingKey: '' }
  }

  public isEditing = (record: any) => {
    return record.key === this.state.editingKey
  }

  public edit (key: number) {
    this.setState({ editingKey: key })
  }

  public save (form: any, key: number) {
    form.validateFields((error: any, row: any) => {
      if (error) {
        return
      }
      const newData = [...this.state.data]
      const index = newData.findIndex((item) => key === item.key)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row
        })
        this.setState({ data: newData, editingKey: '' })
      } else {
        newData.push(row)
        this.setState({ data: newData, editingKey: '' })
      }
    })
  }

  public cancel = () => {
    this.setState({ editingKey: '' })
  }
  public componentWillMount () {
    this.getList()
    PerService.newPerformance ({companyId: 1, productId: 2, productName:'注册', productPrice:200.00}).then((res) => {
      console.log(res, 22222)
      this.setState({modalVisible: false})
      this.getList()
    })
  }
  // 获取列表数据
  public getList () {
    const {pageConf} = this.state
    PerService.getPerformListByUserid (pageConf.current, pageConf.size).then((d: any) => {
      this.setState({
        dataSource: d.records,
        pageConf: {
          pageSize: d.pageSize,
          total: d.pageTotal,
          currentPage: d.pageCurrent
        }
      })
    })
  }
  // 修改绩效
  public revisePerform (val: Info) {
    const {currentId} = this.state
    const {reward} = val
    const payload = {
      id: currentId,
      reward
    }
    PerService.RevisePerformance (payload).then((res) => {
      console.log(res)
      this.setState({modalVisible: false})
      this.getList()
    })
  }
  // 新增绩效
  public addPerform (val: Info) {
    const {companyId, productName, productPrice} = val
    const productId = 1111 // todo
    const payload = {
      companyId,
      productId,
      productName,
      productPrice
    }
    PerService.newPerformance(payload).then((res) => {
      console.log(res)
      this.setState({modalVisible: false})
      this.getList()
    })
  }

  public render () {
    const components = {
      body: {
        row: EditableFormRow,
        cell: InputCell.bind(this, EditableContext)
      }
    }

    const columns: any = this.columns.map((col: any) => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: (record: any) => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      }
    })
    return (
      <ContentBox
        title='绩效配置'
      >
        <div>
          <Search
            placeholder='请输入客户和联系人名称'
            onSearch={(value) => console.log(value)}
            style={{width: 200, marginBottom: '25px'}}
          />
          <Table
            components={components}
            bordered
            dataSource={this.state.data}
            columns={columns}
          />
        </div>
      </ContentBox>
    )
  }
}
export default Main

// interface States {
//   modalTitle: string,
//   modalVisible: boolean,
//   chooseDate: string,
//   dataSource: PerformList,
//   spanText: string,
//   currentId: number // 当前选中绩效id
//   selectedRowKeys: string[],
//   pageConf?: any
// }
// interface Info {
//   reward: number,
//   companyId: number,
//   productId: number,
//   productName: string,
//   productPrice?: any
// }
// interface ColProps extends PerfromItem {
//   dataIndex: string
//   title: string
// }
// function callback (key: string) {
//   console.log(key)
// }

// class Main extends React.Component {
//   public state: States = {
//     modalTitle: '',
//     modalVisible: false,
//     selectedRowKeys: [],
//     dataSource: [],
//     chooseDate:'',
//     spanText:'编辑',
//     currentId: 0,
//     pageConf: {
//       current: 1,
//       total: 11
//     }
//   }
//   public columns = [{
//     title: '任务名称',
//     dataIndex: 'name',
//     render: (k: any, item: PerfromItem) => {
//       return <span>{item.productName}</span>
//     }
//   }, {
//     title: '任务价格',
//     dataIndex: 'price',
//     render: (k: any, item: PerfromItem) => {
//       return <span>{item.productPrice}</span>
//     }
//   }, {
//     title: '绩效额度',
//     dataIndex: 'address',
//     render: (k: any, item: PerfromItem) => {
//       return <span><InputNumber readOnly precision={2} defaultValue={item.reward} onChange={this.onChange} />{item.reward}</span>
//     }
//   }, {
//     title: '操作',
//     dataIndex: 'operation',
//     render: (k: any, item: PerfromItem) => {
//       return (
//         <span>
//           <span style={{color: '#3B91F7'}}  onClick={() => { this.onShow.bind(this)(item) }}>{this.state.spanText}</span>
//         </span>
//       )
//     }
//   }]
//   public onShow (item: PerfromItem) {
//     console.log('点击编辑')
//     this.setState({ spanText: '保存' })
//     // this.modalShow(item)
//   }
//   public modalShow (showData: any = {}) {
//     this.setState({
//       modalVisible: false,
//       showData
//     })
//   }
//   public componentWillMount () {
//     this.getList()
//     // PerService.newPerformance ({companyId: 1, productId: 2, productName:'注册', productPrice:200.00}).then((res) => {
//     //   console.log(res, 22222)
//     //   this.setState({modalVisible: false})
//     //   this.getList()
//     // })
//   }
//   // 获取列表数据
//   public getList () {
//     const {pageConf} = this.state
//     PerService.getPerformListByUserid (pageConf.current, pageConf.size).then((d: any) => {
//       this.setState({
//         dataSource: d.records,
//         pageConf: {
//           pageSize: d.pageSize,
//           total: d.pageTotal,
//           currentPage: d.pageCurrent
//         }
//       })
//     })
//   }
//   // 修改绩效
//   public revisePerform (val: Info) {
//     const {currentId} = this.state
//     const {reward} = val
//     const payload = {
//       id: currentId,
//       reward
//     }
//     PerService.RevisePerformance (payload).then((res) => {
//       console.log(res)
//       this.setState({modalVisible: false})
//       this.getList()
//     })
//   }
//   // 新增绩效
//   public addPerform (val: Info) {
//     const {companyId, productName, productPrice} = val
//     const productId = 1111 // todo
//     const payload = {
//       companyId,
//       productId,
//       productName,
//       productPrice
//     }
//     PerService.newPerformance(payload).then((res) => {
//       console.log(res)
//       this.setState({modalVisible: false})
//       this.getList()
//     })
//   }

//   public add () {
//     const modal = new Modal({
//       style: 'width: 800px',
//       content: (
//         <Provider><BaseInfo onClose={() => {modal.hide()}}/></Provider>
//       ),
//       footer: null,
//       title: '新增',
//       mask: true,
//       onCancel: () => {
//         modal.hide()
//       }
//     })
//     modal.show()
//   }

//   public callback (key: string) {
//     console.log('key', key)
//   }
//   public onChange (value: any) {
//     console.log('changed', value)
//   }
//   public render () {
//     return (
//       <ContentBox
//         title='绩效配置'
//       >
//         <div>
//           <Search
//             placeholder='请输入客户和联系人名称'
//             onSearch={(value) => console.log(value)}
//             style={{width: 200, marginBottom: '25px'}}
//           />
//           <Table columns={this.columns} dataSource={this.state.dataSource} size='middle'/>
//         </div>
//       </ContentBox>
//     )
//   }
// }

// export default Main
