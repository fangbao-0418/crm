import React from 'react'
import { Modal, Input, Form, Select, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { fetchRoleInfo, fetchNewRoleInfo } from '../api'

const FormItem = Form.Item
const Option = Select.Option
const styles = require('./style')
const CheckboxGroup = Checkbox.Group

const list = [
  {label: '增加', value: '111'},
  {label: '删除', value: '222'},
  {label: '修改', value: '333'},
  {label: '查看', value: '333'}
]

interface Props extends FormComponentProps {
  mode: 'view' | 'add' | 'modify'
  tab: 'System' | 'Proxy'
  currentRoleId: number
  onOk: () => any
  onCancel: () => any
}

interface State {
  title: string,
  info: any
}

class Main extends React.Component<Props, State> {

  public state: State = {
    title: '',
    info: null
  }

  public componentWillMount () {
    this.setTitle()
    this.fetchRoleInfo()
  }

  // 获取数据
  public fetchRoleInfo () {
    const {mode, tab, currentRoleId} = this.props
    if (mode === 'add') {
      fetchNewRoleInfo(tab).then((res) => {
        this.setState({info: res})
      })
    } else {
      fetchRoleInfo(tab, currentRoleId).then((res) => {
        this.setState({info: res})
      })
    }
  }

  // 设置标题
  public setTitle () {
    const {mode} = this.props
    let title
    if (mode === 'view') {
      title = '查看权限'
    } else if (mode === 'add') {
      title = '添加权限'
    } else if (mode === 'modify') {
      title = '修改权限'
    }
    this.setState({title})
  }

  // 点击确认
  public onOk = () => {
    this.props.onOk()
  }

  // 点击取消
  public onCancel = () => {
    this.props.onCancel()
  }

  // 渲染系统节点
  public renderSystemNode (data: any) {
    return data.map((item: any) => {
      return (
        <div className={styles.contentWrap} key={item.systemCode}>
          <div className={styles.title}>{item.systemName}：</div>
          <div className={styles.contentBox}>
            <div className={styles.selectAll}><Checkbox disabled={this.props.mode === 'view'}>全选</Checkbox></div>
            {this.renderPageNode(item.roleSystemAuthorityItemDTOList)}
          </div>
        </div>
      )
    })
  }

  // 渲染页面节点
  public renderPageNode (data: any) {
    console.log(data)
    return data.map((item: any) => {
      return (
        <div className={styles.item} key={item.authorityId}>
          <Checkbox disabled={this.props.mode === 'view'} className={styles.itemTitle}>{item.authorityName}</Checkbox>
          <div>
            {this.renderButtonNode(item.roleSystemAuthorityButtonList)}
          </div>
        </div>
      )
    })
  }

  // 渲染按钮节点
  public renderButtonNode (data: any) {
    return data.map((item: any) => {
      return (
        <Checkbox disabled={this.props.mode === 'view'} key={item.authorityButtonId} defaultChecked={item.enableFlag}>{item.buttonName}</Checkbox>
      )
    })
  }

  public render () {
    const { mode } = this.props
    const {info} = this.state
    return (
      <Modal
        title={this.state.title}
        visible={true}
        className={styles.wrap}
        width={1200}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        {
          info
          ? <div>
              <Form layout='inline'>
                <FormItem className={styles.input} label='角色名称' required>
                  <Input disabled={mode === 'view'} size='small' defaultValue={info.roleName} />
                </FormItem>
                <FormItem className={styles.input} label='数据共享' required>
                  <Select disabled={mode === 'view'} size='small' style={{width: '160px'}} placeholder='请选择是否数据共享' defaultValue={info.shareFlag}>
                    <Option value={0}>是</Option>
                    <Option value={1}>否</Option>
                  </Select>
                </FormItem>
              </Form>
              <div className={styles.content}>
                {/*<div className={styles.contentWrap}>
                  <div className={styles.title}>中心运营系统权限：</div>
                  <div className={styles.contentBox}>
                    <div className={styles.selectAll}><Checkbox>全选</Checkbox></div>
                    <div className={styles.item}>
                      <Checkbox className={styles.itemTitle}>渠道</Checkbox>
                      <CheckboxGroup className={styles.itemOption} options={list}></CheckboxGroup>
                    </div>
                  </div>
                </div>*/}
                {this.renderSystemNode(info.roleSystemAuthorityResponseList)}
              </div>
            </div>
          : <span></span>
        }
      </Modal>
    )
  }
}

export default Form.create()(Main)
