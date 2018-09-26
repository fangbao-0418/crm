import React from 'react'
import { Button, Table, Divider, Form, Input, Modal } from 'antd'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'

const styles = require('./style')
const FormItem = Form.Item

interface State {
  val: string
  help: string
  title: string
  visible: boolean
  dataSource: any[]
}

class Main extends React.Component {
  public state: State = {
    val: '', // 弹窗权限值
    help: '', // 验证提示
    title: '', // 弹窗标题
    visible: false, // 弹窗显示
    dataSource: [
      {
        id: 1,
        name: '技术部',
        dataIndex: 'name',
        children: [
          {
            id: 2,
            name: '前端',
            dataIndex: 'name'
          },
          {
            id: 3,
            name: '后端',
            dataIndex: 'name'
          }
        ]
      }
    ]
  }

  // 修改、添加部门
  public setDepartment = (title: string, name?: string) => {
    this.setState({visible: true, title, val: name || ''})
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

  public render () {
    const columns = [{
      title: '部门名称',
      dataIndex: 'name'
    }, {
      title: '操作',
      render: (val: any, info: any) => {
        return (
          <div>
            <a onClick={() => {this.setDepartment('添加部门')}}>添加子部门</a>
            <Divider type='vertical'/>
            <a onClick={() => {this.setDepartment('修改部门', info.name)}}>修改</a>
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
            onClick={() => {this.setDepartment('添加部门')}}
          />
        )}
      >
        <Table
          dataSource={this.state.dataSource}
          columns={columns}
          rowKey='id'
          pagination={false}
        />
        <Modal
          title={this.state.title}
          visible={this.state.visible}
          destroyOnClose={true}
          onOk={() => {
            if (this.state.val === '') {
              this.setState({help: '部门名称不能为空'})
              return
            }
            this.setState({visible: false})
          }}
          onCancel={() => {
            this.setState({visible: false, help: '', val: ''})
          }}
        >
          <FormItem
           required
           label='部门名称'
           labelCol={{span: 8}}
           wrapperCol={{span: 10}}
           help={<span style={{color: 'red'}}>{this.state.help}</span>}
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
      </ContentBox>
    )
  }
}

export default Main
