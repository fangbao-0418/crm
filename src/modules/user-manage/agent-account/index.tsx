import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import Accounting from '@/modules/user-manage/agent-account/accounting'
import Custom from '@/modules/user-manage/agent-account/custom'
import {
  Button , Divider, Form, Input, Modal, Table, Tabs
} from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import React from 'react'

const stylus = require('./index.styl')
const FormItem = Form.Item

interface Props extends FormComponentProps {
  mode: string // 模式
  info: any // 账户信息
  onOk?: (val: any) => void // 确认回调
  onCancel?: () => void // 取消回调
}

interface States {
  val: string // 弹窗部门值
  mode: 'add' | 'addRoot' | 'modify' // 添加子部门 | 添加根部门 | 修改部门
  visible: boolean // 是否展示弹窗
  verification: 'empty' | 'same' | 'normal' // 部门为空 | 部门重复 | 正常状态
  dataSource: any[]
  currentInfo: any // 当前选中部门信息
  itemInfo: any // 选中项信息
}

const tableData = [{
  key: 1,
  name: '人力行政中心',
  children: [{
    key: 11,
    name: '人力咨询部'
  }, {
    key: 12,
    name: 'hrbp部'
  }, {
    key: 13,
    name: '行政运维部'
  }]
}, {
  key: 2,
  name: '营销中心',
  children: [{
    key: 21,
    name: '渠道部'
  }, {
    key: 22,
    name: '直营部'
  }]
}]

class AgentAccount extends React.Component<any, any> {
  public state: States = {
    dataSource: ['人力行政中心', '营销中心', '技术中心'],
    mode: 'add',
    visible: false,
    itemInfo: {},
    val: '',
    verification: 'normal',
    currentInfo: {}
  }
  public componentWillMount () {
    const {mode} = this.props
  }
  public addDept (info?: any) {
    this.setState({ visible: true, info })
  }

  // 修改、添加部门
  public setDepartment = (mode: 'add' | 'addRoot' | 'modify', currentInfo?: any) => {
    const val = mode === 'modify' ? currentInfo.name : ''
    currentInfo = currentInfo || {}
    this.setState({visible: true, mode, currentInfo, val})
  }

  // 禁用部门
  public forbidDepartment = () => {

  }

  // 删除部门
  public delDepartment = () => {
    Modal.confirm({
      title: '删除部门',
      content: '确定要删除部门吗？',
      onOk: () => {},
      onCancel: () => {}
    })
  }

  // 设置错误信息
  public getErrorInfo: any = (verification: 'empty' | 'same' | 'normal') => {
    let errorInfo
    if (verification === 'empty') {
      errorInfo = {help: '部门名称不能为空', validateStatus: 'error'}
    } else if (verification === 'same') {
      errorInfo = {help: '部门名称重复', validateStatus: 'error'}
    } else if (verification === 'normal') {
      errorInfo = {help: ''}
    }
    return errorInfo
  }

  // 获取弹窗标题
  public getTitle: any = (mode: any) => {
    let title
    if (mode === 'add') {
      title = '添加子部门'
    } else if (mode === 'addRoot') {
      title = '添加根部门'
    } else if (mode === 'modify') {
      title = '修改部门'
    }
    return title
  }

  public render () {
    const {verification, mode, currentInfo} = this.state
    const TabPane: any = Tabs.TabPane
    const columns = [
      { title: '部门名称', dataIndex: 'name', key: 'department',
        onHeaderCell: (column: any) => {
          return {
            style: {
              textIndent: '50px'
            }
          }
        }
      },
      { title: '操作', key: 'operation',
        width: 350,
        render: (val: any, info: any) => {
          return (
            <div>
              <a onClick={() => {this.setDepartment('add', info)}}>添加子部门</a>
              <Divider type='vertical'/>
              <a onClick={() => {this.setDepartment('modify', info)}}>修改</a>
              <Divider type='vertical'/>
              <a onClick={() => {this.forbidDepartment()}}>禁用</a>
              <Divider type='vertical'/>
              <a onClick={() => {this.delDepartment()}}>删除</a>
            </div>
          )
        },
        onHeaderCell: (column: any) => {
          return {
            style: {
              textAlign: 'center'
            }
          }
        }
      }
    ]
    return (
      <div>
        <ContentBox
          title='代理商账号'
          rightCotent={(
            <AddButton
              title='添加一级部门'
              onClick={() => {}}
            />
          )}
        >
          <div className={stylus.tabcon}>
          <Tabs
            defaultActiveKey='1'
            animated={false}
          >
            <TabPane tab='部门' key='1'>
              <div className={stylus.formitem}>
                <Input
                  placeholder='请输入公司名称'
                  className={stylus.searchcondition}
                />
              </div>
              <Table
                className='components-table-demo-nested'
                columns={columns}
                dataSource={tableData}
                pagination={false}
              />
            </TabPane>
            <TabPane tab='账号' key='2'><Accounting /></TabPane>
            <TabPane tab='自定义角色' key='3'><Custom /></TabPane>
          </Tabs>
        </div>
        </ContentBox>
        {
          this.state.visible &&
          <Modal
            title={this.getTitle(this.state.mode)}
            visible={true}
            destroyOnClose={true}
            onOk={() => {
              if (this.state.val === '') {
                this.setState({verification: 'empty'})
                return
              }
              this.setState({visible: false})
            }}
            onCancel={() => {
              this.setState({visible: false, verification: 'normal'})
            }}
          >
            <FormItem
              required
              label='部门名称'
              labelCol={{span: 8}}
              wrapperCol={{span: 10}}
              {...this.getErrorInfo(verification)}
            >
              <Input
                defaultValue={this.state.val}
                onChange={(e) => {
                  this.setState({
                    val: e.target.value
                  })
                }}
              />
            </FormItem>
          </Modal>
        }
      </div>
    )
  }
}

export default AgentAccount
