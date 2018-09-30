import {
  Button , Divider, Form, Input, Modal, Table, Tabs
} from 'antd'
import React from 'react'

import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import AccountModal from '@/modules/user-manage/agent-account/account-modal'

const stylus = require('./index.styl')
const Formitem = Form.Item

interface States {
  selectedRowKeys: any[],
  dataSource: any[]
  mode: 'view' | 'modify' | 'add' // 弹窗的模式
  verification: 'empty' | 'same' | 'normal' // 为空 | 部门 | 正常状态
  assignmentVisiblity: boolean // 批量分配显示状态
  visible: boolean // 查看修改显示状态
  itemInfo: any // 选中项信息
  val: string
}

class Accounting extends React.Component<any, any> {
  public state: States = {
    selectedRowKeys: [],
    dataSource: [
      {
        key: 1,
        name: '赵飞燕',
        cellPhone: '13122563584',
        agency: '北京凯德茂有限公司',
        roleName: '运营主管',
        mailBox: '315774963@qq.com',
        department: '市场部'
      },
      {
        key: 2,
        name: '赵合德',
        cellPhone: '12345678901',
        agency: '北京凯德茂无限公司',
        roleName: '运营主管',
        mailBox: '315774963@qq.com',
        department: '市场部'
      },
      {
        key: 3,
        name: '张飞燕',
        cellPhone: '13294389438',
        agency: '北京凯德茂到底有没有限公司',
        roleName: '运营主管',
        mailBox: '315774963@qq.com',
        department: '市场部'
      }
    ],
    val: '',
    mode: 'add',
    verification: 'normal',
    assignmentVisiblity: false,
    visible: false,
    itemInfo: {}
  }
  public onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }
  // 确认删除
  public delConfirm = (type: 'batch' | 'single', id?: number) => {
    Modal.confirm({
      title: '删除账号',
      content: '确定删除账号吗？',
      onOk: () => {
        // let ids
        // type === 'batch' ? ids = this.state.selectedRowKeys : ids = [id]
        // // todo updateUser要从全局获取
        // delAccount({ids, updateUser: 111111}).then(() => {
        //   this.getList()
        // })
      }
    })
  }
  // 批量添加
  public assignment () {
    if (this.state.selectedRowKeys.length !== 0) {
      const val = ''
      this.setState({assignmentVisiblity: true, val})
    } else {
      Modal.info({
        title: '提示',
        content: '请至少选择一条数据',
        onOk: () => {
        }
      })
    }
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

  // 查看、修改、添加账号
  public showAccountModal = (mode: 'view' | 'modify' | 'add', itemInfo?: any) => {
    this.setState({mode, itemInfo, visible: true})
  }
  public render () {
    const { verification, selectedRowKeys, itemInfo, mode } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    const columns: any[] = [
      {
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '手机号',
        dataIndex: 'cellPhone'
      },
      {
        title: '代理商',
        dataIndex: 'agency'
      },
      {
        title: '角色名称',
        dataIndex: 'roleName'
      },
      {
        title: '邮箱',
        dataIndex: 'mailBox'
      },
      {
        title: '部门',
        dataIndex: 'department'
      },
      {
        title: '操作',
        dataIndex: 'oprate',
        render: (info: any) => {
          return (
            <div>
              <a onClick={() => {this.showAccountModal('view', info)}}>查看</a>
              <Divider type='vertical'/>
              <a onClick={() => {this.showAccountModal('modify', info)}}>修改</a>
              <Divider type='vertical' />
              <a onClick={() => this.delConfirm('single', info.id)}>删除</a>
            </div>
          )
        }
      }
    ]
    return (
      <div>
        <div className={stylus.formitem}>
          <Input
            placeholder='请输入公司名称'
            className={stylus.searchcondition}
          />
          <Input
            placeholder='请输入姓名'
            className={stylus.searchcondition}
          />
          <Input
            placeholder='请输入手机号'
            className={stylus.searchcondition}
          />
          <Input
            placeholder='请输入部门名称'
            className={stylus.searchcondition}
          />
        </div>
        <div>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            rowSelection={rowSelection}
            pagination={{
              showQuickJumper: true
            }}
          />
        </div>
        {
          this.state.dataSource.length === 0
          || <Button
            type='primary'
            className={stylus.assignBtn}
            onClick={() => this.assignment()}
          >
            批量分配
          </Button>
        }
        {
          this.state.dataSource.length === 0
          || <Button
            type='primary'
            disabled={!this.state.selectedRowKeys.length}
            className={stylus.delBtn}
            onClick={() => this.delConfirm('batch')}
          >
            批量删除
          </Button>
        }
        {
          this.state.assignmentVisiblity &&
          <div>
            <Modal
              title='批量分配'
              destroyOnClose={true}
              visible={this.state.assignmentVisiblity}
              onOk={() => {
                if (this.state.val === '') {
                  this.setState({verification: 'empty'})
                  return
                }
                this.setState({assignmentVisiblity: false})
              }}
              onCancel={() => {
                this.setState({assignmentVisiblity: false, verification: 'normal'})
              }}
              okText='确认'
              cancelText='取消'
            >
              <Form>
                <Formitem
                  required
                  label='上级直属'
                  wrapperCol={{ span: 10 }}
                  labelCol={{ span: 4 }}
                  {...this.getErrorInfo(verification)}
                >
                  <Input
                    style={{ width: '200px' }}
                    placeholder='请输入上级直属'
                    onChange={(e) => {
                      this.setState({
                        val: e.target.value
                      })
                    }}
                  />
                </Formitem>
              </Form>
            </Modal>
          </div>
        }
        {
          this.state.visible &&
          <AccountModal
            info={itemInfo}
            mode={mode}
            onOk={(val: any) => {
              console.log(445, val)
            }}
            onCancel={() => {
              this.setState({visible: false})
            }}
          />
        }
      </div>
    )
  }
}

export default Accounting
