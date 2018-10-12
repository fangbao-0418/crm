import React from 'react'
import { Modal, Input, Form, Select, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { fetchRoleInfo, fetchNewRoleInfo } from '../api'

const FormItem = Form.Item
const Option = Select.Option
const styles = require('./style')
const CheckboxGroup = Checkbox.Group

interface Props extends FormComponentProps {
  mode: 'view' | 'add' | 'modify'
  tab: 'System' | 'Proxy'
  currentRoleId: number
  onOk: (info: any) => void
  onCancel: () => any
}

interface State {
  title: string,
  info: any
}

class Main extends React.Component<Props, State> {
  public showInfo: any = null

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
        this.showInfo = res
        this.setState({info: this.checkSelectAll(this.showInfo)})
      })
    } else {
      fetchRoleInfo(tab, currentRoleId).then((res) => {
        this.showInfo = res
        this.setState({info: this.checkSelectAll(this.showInfo)})
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
    this.props.form.validateFields((err: any, val: any) => {
      if (err) {return}
      this.showInfo.roleName = val.name
      this.showInfo.shareFlag = val.share
      this.props.onOk(this.showInfo)
    })
  }

  // 点击取消
  public onCancel = () => {
    this.props.onCancel()
  }

  // 检测全选按钮是否勾选
  public checkSelectAll (data: any) {
    if (data) {
      data.roleSystemAuthorityResponseList.forEach((systemItem: any) => {
        systemItem.roleSystemAuthorityItemDTOList.forEach((pageItem: any) => {
          pageItem.enableFlag = pageItem.roleSystemAuthorityButtonList.every((buttonItem: any) => buttonItem.enableFlag)
        })
      })
      this.showInfo.roleSystemAuthorityResponseList.forEach((systemItem: any) => {
        systemItem.enableFlag = systemItem.roleSystemAuthorityItemDTOList.every((pageItem: any) => pageItem.enableFlag)
      })
    }
    return data
  }

  // 点击系统全选
  public systemChecked (status: boolean, systemIndex: number) {
    const currentSystem = this.showInfo.roleSystemAuthorityResponseList[systemIndex]
    currentSystem.enableFlag = status
    currentSystem.roleSystemAuthorityItemDTOList.forEach((item: any) => {
      item.enableFlag = status
      item.roleSystemAuthorityButtonList.forEach((buttonItem: any) => buttonItem.enableFlag = status)
    })
    this.setState({info: this.showInfo})
  }

  // 点击页面全选
  public pageChecked (status: boolean, systemIndex: number, pageIndex: number) {
    const currentPage = this.showInfo.roleSystemAuthorityResponseList[systemIndex].roleSystemAuthorityItemDTOList[pageIndex]
    currentPage.enableFlag = status
    currentPage.roleSystemAuthorityButtonList.forEach((item: any) => {
      item.enableFlag = status
    })
    this.setState({info: this.checkSelectAll(this.showInfo)})
  }

  // 点击按钮选择
  public buttonChecked (status: boolean, systemIndex: number, pageIndex: number, buttonIndex: number) {
    const currentPage = this.showInfo.roleSystemAuthorityResponseList[systemIndex].roleSystemAuthorityItemDTOList[pageIndex]
    const currentButton = currentPage.roleSystemAuthorityButtonList[buttonIndex]
    currentButton.enableFlag = status
    this.setState({info: this.checkSelectAll(this.showInfo)})
  }

  // 渲染系统节点
  public renderSystemNode (data: any) {
    return data.map((item: any, index: number) => {
      return (
        <div className={styles.contentWrap} key={item.systemCode}>
          <div className={styles.title}>{item.systemName}：</div>
          <div className={styles.contentBox}>
            <div className={styles.selectAll}>
              <Checkbox
                disabled={this.props.mode === 'view'}
                checked={item.enableFlag}
                onChange={(e) => {this.systemChecked(e.target.checked, index)}}
              >
                全选
              </Checkbox>
            </div>
            {this.renderPageNode(item.roleSystemAuthorityItemDTOList, index)}
          </div>
        </div>
      )
    })
  }

  // 渲染页面节点
  public renderPageNode (data: any, systemIndex: number) {
    return data.map((item: any, index: number) => {
      return (
        <div className={styles.item} key={item.authorityId}>
          <Checkbox
            disabled={this.props.mode === 'view'}
            className={styles.itemTitle}
            checked={item.enableFlag}
            onChange={(e) => {this.pageChecked(e.target.checked, systemIndex, index)}}
          >
            {item.authorityName}
          </Checkbox>
          <div>
            {this.renderButtonNode(item.roleSystemAuthorityButtonList, systemIndex, index)}
          </div>
        </div>
      )
    })
  }

  // 渲染按钮节点
  public renderButtonNode (data: any, systemIndex: number, pageIndex: number) {
    return data.map((item: any, index: number) => {
      return (
        <Checkbox
          disabled={this.props.mode === 'view'}
          checked={item.enableFlag}
          key={item.authorityButtonId}
          onChange={(e) => {this.buttonChecked(e.target.checked, systemIndex, pageIndex, index)}}
        >
          {item.buttonName}
        </Checkbox>
      )
    })
  }

  public render () {
    const { mode, form:{getFieldDecorator} } = this.props
    const {info} = this.state
    // 过滤规则
    const validation = {
      name: {
        initialValue: info && info.roleName,
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请输入角色名称！'}
        ]
      },
      share: {
        initialValue: info && info.shareFlag,
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请选择是否数据共享！'}
        ]
      }
    }
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
                    {
                      getFieldDecorator('name', validation.name)(
                        <Input disabled={mode === 'view'} size='small' defaultValue={info.roleName} />
                      )
                    }
                  </FormItem>
                  <FormItem className={styles.input} label='数据共享' required>
                    {
                      getFieldDecorator('share', validation.share)(
                        <Select disabled={mode === 'view'} size='small' style={{width: '160px'}} placeholder='请选择是否数据共享' defaultValue={info.shareFlag}>
                          <Option value={0}>是</Option>
                          <Option value={1}>否</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Form>
                <div className={styles.content}>
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
