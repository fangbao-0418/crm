import React from 'react'
import { Button, Table, Divider, Modal, Form, Input } from 'antd'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'

const styles = require('./style')
const FormItem = Form.Item

interface State {
  tab: number,
  val: string
  help: string
  title: string
  visible: boolean
  dataSource: any[]
}

class Main extends React.Component {
  public state: State = {
    tab: 0, // 控制tab切换
    val: '', // 弹窗权限值
    help: '', // 验证提示
    title: '', // 弹窗标题
    visible: false, // 弹窗显示
    dataSource: [
      {
        id: 1,
        name: '111',
        children: [
          {
            id: '12',
            name: '111222'
          }
        ]
      },
      {
        id: 2,
        name: '222'
      }
    ]
  }

  // 切换tab
  public changeTab = (tab: number) => {
    this.setState({tab})
  }

  // 修改、添加权限
  public setPermission = (title: string, name?: string) => {
    this.setState({visible: true, title, val: name || ''})
  }

  // 禁用权限
  public forbidPermission = () => {

  }

  // 删除权限
  public delPermission = () => {
    Modal.confirm({
      title: '删除权限',
      content: '确认删除权限吗？',
      onOk: () => {},
      onCancel: () => {}
    })
  }

  public render () {
    const columns = [
      {
        title: '权限名称',
        dataIndex: 'name'
      },
      {
        title: '操作',
        render: () => {
          return (
            <div>
              <a onClick={() => {this.setPermission('修改权限')}}>修改</a>
              <Divider type='vertical'/>
              <a onClick={() => {this.setPermission('添加权限')}}>添加子页面权限</a>
              <Divider type='vertical'/>
              <a onClick={this.forbidPermission}>禁用</a>
              <Divider type='vertical'/>
              <a onClick={this.delPermission}>删除</a>
            </div>
          )
        }
      }
    ]
    return (
      <ContentBox
        title='权限'
        rightCotent={(
          <AddButton
            title='添加页面权限'
            onClick={() => {this.setPermission('添加权限')}}
          />
        )}
      >
        <div className={styles.wrap}>

          <div className={styles.tabWrap}>
            <div className={this.state.tab === 0 ? styles.active : ''} onClick={() => {this.changeTab(0)}}>中心运营系统</div>
            <div className={this.state.tab === 1 ? styles.active : ''} onClick={() => {this.changeTab(1)}}>代理商系统</div>
            <div className={this.state.tab === 2 ? styles.active : ''} onClick={() => {this.changeTab(2)}}>工单系统</div>
            <div className={this.state.tab === 3 ? styles.active : ''} onClick={() => {this.changeTab(3)}}>CRM系统</div>
          </div>

          <div className={styles.contentWrap}>
            <Table
              pagination={false}
              dataSource={this.state.dataSource}
              columns={columns}
            />
          </div>

          <Modal
            title={this.state.title}
            visible={this.state.visible}
            destroyOnClose={true}
            onOk={() => {
              if (this.state.val === '') {
                this.setState({help: '权限名称不能为空'})
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
              label='页面权限名称'
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

        </div>
      </ContentBox>
    )
  }
}

export default Main
