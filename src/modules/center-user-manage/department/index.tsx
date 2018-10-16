import React from 'react'
import { Button, Table, Divider, Form, Input, Modal } from 'antd'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import { fetchOrganizationList, delOrganization, addOrganization, modifyOrganization, toggleForbidOrganization } from './api'

const styles = require('./style')
const FormItem = Form.Item

interface State {
  val: string // 弹窗部门值
  mode: 'add' | 'addRoot' | 'modify' // 添加子部门 | 添加根部门 | 修改部门
  visible: boolean // 是否展示弹窗
  verification: 'empty' | 'same' | 'normal' // 部门为空 | 部门重复 | 正常状态
  dataSource: any[]
  currentInfo: any // 当前选中部门信息
}

class Main extends React.Component {
  public state: State = {
    val: '',
    mode: 'add',
    visible: false,
    verification: 'normal',
    currentInfo: {},
    dataSource: []
  }

  public componentWillMount () {
    this.getDepartmentList()
  }

  // 点击弹窗确认按钮
  public onOk () {
    const {mode} = this.state
    const params = {
      name: this.state.val,
      parentId: 0,
      companyId: 0,
      organizationType: 'System'
    }
    if (this.state.val === '') {
      this.setState({verification: 'empty'})
      return
    } else {
      this.setState({verification: 'normal'})
    }
    this.setState({visible: false})
    if (mode === 'add') {
      params.parentId = this.state.currentInfo.id
      addOrganization(params)
        .then((res) => {
          this.getDepartmentList()
        })
    } else if (mode === 'addRoot') {
      params.parentId = 0
      addOrganization(params).then((res) => {
        this.getDepartmentList()
      })
    } else if (mode === 'modify') {
      const data = {
        name: this.state.val
      }
      modifyOrganization(data, this.state.currentInfo.id)
        .then((res) => {
          this.getDepartmentList()
        })
        .catch((err: any) => {
          APP.error(err.responseJSON.errors[0].message)
        })
    }
  }

  // 获取部门信息
  public getDepartmentList () {
    fetchOrganizationList().then((res) => {
      this.setState({dataSource: res})
    })
  }

  // 修改、添加部门
  public setDepartment = (mode: 'add' | 'addRoot' | 'modify', currentInfo?: any) => {
    const val = mode === 'modify' ? currentInfo.name : ''
    currentInfo = currentInfo || {}
    this.setState({visible: true, mode, currentInfo, val})
  }

  // 启用、禁用部门
  public toggleForbidDepartment = (id: number, status: 0 | 1) => {
    toggleForbidOrganization(id, status).then((res) => {
      this.getDepartmentList()
    })
  }

  // 删除部门
  public delDepartment = (id: number) => {
    Modal.confirm({
      title: '删除部门',
      content: '确定要删除部门吗？',
      onOk: () => {
        delOrganization(id)
          .then((res) => {
            this.getDepartmentList()
          })
          .catch((err) => {
            console.log(err)
          })
      },
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
    const columns = [{
      title: '部门名称',
      dataIndex: 'name'
    }, {
      title: '操作',
      render: (val: any, info: any) => {
        const {id, name, status} = info
        return (
          <div>
            {
              status === 0
              ? <div>
                  <a onClick={() => {this.setDepartment('add', info)}}>添加子部门</a>
                  <Divider type='vertical'/>
                  <a onClick={() => {this.setDepartment('modify', info)}}>修改</a>
                  <Divider type='vertical'/>
                  <a onClick={() => {this.toggleForbidDepartment(id, 1)}}>禁用</a>
                  <Divider type='vertical'/>
                  <a onClick={() => {this.delDepartment(id)}}>删除</a>
                </div>
              : <div>
                  <span className={styles.disable}>添加子部门</span>
                  <Divider type='vertical'/>
                  <span className={styles.disable}>修改</span>
                  <Divider type='vertical'/>
                  <a onClick={() => {this.toggleForbidDepartment(id, 0)}}>已禁用</a>
                  <Divider type='vertical'/>
                  <span className={styles.disable}>删除</span>
                </div>
            }
          </div>
        )
      }
    }]

    return (
      <ContentBox
        title='部门'
        rightCotent={(
          <AddButton
            title='添加一级部门'
            onClick={() => {this.setDepartment('addRoot')}}
          />
        )}
      >
        <Table
          dataSource={this.state.dataSource}
          childrenColumnName='organizationList'
          columns={columns}
          rowKey='id'
          pagination={false}
        />
        {
          this.state.visible &&
          <Modal
            title={this.getTitle(this.state.mode)}
            visible={true}
            destroyOnClose={true}
            onOk={() => {
              this.onOk()
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
      </ContentBox>
    )
  }
}

export default Main
