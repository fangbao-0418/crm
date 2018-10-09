import React from 'react'
import { Button, Select, Row, Col, Input } from 'antd'
const Option = Select.Option
const styles = require('@/modules/outsite/styles/tpllist.model.styl')
const data =
  {
    name: '李银河', // 节点名称
    department: '会计部', // 是否显示合同
    leader: '陈小二', // 上级汇报
    email: '1342566@qq.com', // 负责人标签文字
    phone: '13212321234'
  }

interface Props {
  data: any,
  identifying: any, // 新增 编辑 启禁用标识
}
// 其他任务详情
class Main extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    const { name, category, id} = props.data
    this.state = {
      data,
      searchText: name,
      classify: category || '请选择任务分类', // 分类
      deadline: id || '请选择任务期限' // 期限
    }
  }
  public componentDidMount () {
  }
  public render () {
    return (
      <div >
       {this.show()}
      </div>
    )
  }
  public show () {
    const {id, name, category, status} = this.props.data
    const {identifying} = this.props
    const state = this.state
    if (identifying === '新增' || identifying === '编辑') {
      return (
        <Row className={styles['page-show']}>
          <Col style={{margin: 15}}>
                <span className={styles.div}>任务名称:</span>
                <Input
                    type='text'
                    value={state.searchText}
                    placeholder='请输入任务名称'
                    onChange={this.handleTextChange}
                    style={{ width: '30%',  marginLeft: '3%'}}
                />
          </Col>
          <Col style={{margin: 15}}>
                <span className={styles.div}>任务分类:</span>
                <Select
                    value={state.classify}
                    style={{ width: '35%', marginLeft: '3%' }}
                    onChange={this.workClassChange}
                >
                    <Option value='税务'>税务</Option>
                    <Option value='工商'>工商</Option>
                    <Option value='其他'>其他</Option>
                    <Option value='特殊'>特殊</Option>
                </Select>
          </Col>
          {/*
          <Col style={{margin: 15}}>
                <span className={styles.div}>任务限期:</span>
                <Select
                    value={state.deadline}
                    style={{ width: '35%', marginLeft: '3%' }}
                    onChange={this.workDeadlineChange}
                >
                    <Option value='1'>1</Option>
                    <Option value='3'>3</Option>
                    <Option value='5'>5</Option>
                    <Option value='10'>10</Option>
                </Select>
                <span className={styles.div}> 天</span>
          </Col>
          */}
          <Col style={{textAlign: 'right'}}>
            <span className={styles.acts}>
              <Button type='primary' style={{marginRight: 15}} onClick={this.sureBtn.bind(this)}>保存</Button>
              <Button type='primary' ghost onClick={this.cancelBtn.bind(this)}>取消</Button>
            </span>
          </Col>
        </Row>
      )
    }  else {
      return (
        <Row className={styles['page-show']}>
          <Col style={{margin: 15}}>
            <div className={styles.div}>确定 {status === 'normal' ? '启用' : '禁用'} {name} 的子任务吗?</div>
          </Col>
          <Col style={{textAlign: 'right'}}>
            <span className={styles.acts}>
              <Button type='primary' style={{marginRight: 15}} onClick={this.sureBtn.bind(this)}>保存</Button>
              <Button type='primary' ghost onClick={this.cancelBtn.bind(this)}>取消</Button>
            </span>
          </Col>
        </Row>

      )
    }
  }
  public sureBtn () {
  }
  public cancelBtn () {
  }
  // 输入框
  public handleTextChange = (e: any) => {
    const searchText  = e.target.value
    if (!('value' in this.props)) {
      this.setState({ searchText })
    }

    this.triggerChange({ searchText })
  }

  public triggerChange = (changedValue: any) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue))
    }
  }
  // 任务分类
  public workClassChange = (classify: any) => {
    if (!('value' in this.props)) {
      this.setState({ classify })
    }
    this.triggerChange({ classify })
    console.log('1__', classify)
  }
  // 任务期限
  public workDeadlineChange = (deadline: any) => {
    if (!('value' in this.props)) {
      this.setState({ deadline })
    }
    this.triggerChange({ deadline })
  }
}
export default Main
