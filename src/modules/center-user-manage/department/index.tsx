import React from 'react'
import { Button, Table, Divider, Form, Input, Modal } from 'antd'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'

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
    dataSource: [
      {
        id: 1,
        parentId: 0,
        name: '技术部',
        organizationList: [
          {
            id: 2,
            parentId: 1,
            name: '前端'
          },
          {
            id: 3,
            parentId: 1,
            name: '后端'
          }
        ]
      }
    ]
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
    const columns = [{
      title: '部门名称',
      dataIndex: 'name'
    }, {
      title: '操作',
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
              if (this.state.val === '') {
                this.setState({verification: 'empty'})
                return
              } else {
                this.setState({verification: 'normal'})
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
      </ContentBox>
    )
  }
}

export default Main
