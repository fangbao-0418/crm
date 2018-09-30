import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import Accounting from '@/modules/user-manage/direct-account/accounting'
import Custom from '@/modules/user-manage/direct-account/custom'
import {
  Button , Divider, Form, Input, Modal, Table, Tabs
} from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import React from 'react'

const stylus = require('./index.styl')
const Formitem = Form.Item

interface Props extends FormComponentProps {
  mode: string // 模式
  info: any // 账户信息
  onOk?: (val: any) => void // 确认回调
  onCancel?: () => void // 取消回调
}

interface States {
  dataSource: string[]
  mode: 'view' | 'modify' | 'add' // 弹窗的模式
  visible: boolean // 弹窗是否显示
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
    itemInfo: {}
  }
  public componentWillMount () {
    const {mode} = this.props
  }
  public addDept (info?: any) {
    this.setState({ visible: true, info })
  }
  public render () {
    const TabPane: any = Tabs.TabPane
    // const {mode, info = {}, form:{getFieldDecorator}} = this.props
    const validation = {
      name: {
        initialValue: this.state.itemInfo.name,
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请输入部门名称！'}
        ]
      }
    }
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
        render: (val: any, record: any) => {
          return (
            <div>
              <a onClick={() => { this.addDept(record) }}>添加子部门</a>
              <Divider type='vertical'/>
              <a>修改</a>
              <Divider type='vertical'/>
              <a href='javascript:;'>禁用</a>
              <Divider type='vertical'/>
              <a href='javascript:;'>删除</a>
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
          <div>
            <Modal
              title='添加部门'
              visible={this.state.visible}
              // onOk={this.hideModal}
              onCancel={() => {
                this.setState({
                  visible: false
                })
              }}
              cancelText='取消'
              okText='保存'
            >
              <Form>
                <Formitem
                  label='部门名称'
                  colon
                  wrapperCol={{ span: 10 }}
                  labelCol={{ span: 4 }}
                >
                  {/* // getFieldDecorator('name', validation.name)( */}
                  <Input style={{width: '200px'}} placeholder='请输入部门'/>
                  {/* // ) */}
                </Formitem>
              </Form>
            </Modal>
          </div>
        }
      </div>
    )
  }
}

export default AgentAccount
