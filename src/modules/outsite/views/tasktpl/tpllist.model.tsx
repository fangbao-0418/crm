import React from 'react'
import { Button, Select, Row, Col, Input} from 'antd'
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

// 消息详情
class Main extends React.Component<Props, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      data
    }
  }
  public componentWillMount () {
  }
  public render () {
    const {id, deadline} = this.props.data
    const {identifying} = this.props
    return (
      <div >
       {this.show()}
      </div>
    )
  }
  public show () {
    const {id, orderNo, workNo} = this.props.data
    const {identifying} = this.props
    if (identifying === '新增') {
      return (
        <Row className={styles['page-show']}>
          <Col style={{margin: 15}}>
                <span className={styles.div}>任务名称:</span>
                <Input
                    type='text'
                    // size={size}
                    // value={state.text}
                    placeholder='请输入子任务名称'
                    // onChange={this.handleTextChange}
                    style={{ width: '30%',  marginLeft: '3%'}}
                />
          </Col>
          <Col style={{margin: 15}}>
                <span className={styles.div}>任务分类:</span>
                <Select
                    // value={state.currency}
                    // size={size}
                    style={{ width: '30%', marginLeft: '3%' }}
                    // onChange={this.handleCurrencyChange}
                >
                    <Option value='税务'>税务</Option>
                    <Option value='工商'>工商</Option>
                    <Option value='其他'>其他</Option>
                    <Option value='特殊'>特殊</Option>
                </Select>
          </Col>
          <Col style={{margin: 15}}>
                <span className={styles.div}>任务限期:</span>
                <Select
                    // value={state.currency}
                    // size={size}
                    style={{ width: '30%', marginLeft: '3%' }}
                    // onChange={this.handleCurrencyChange}
                >
                    <Option value='税务'>1</Option>
                    <Option value='工商'>3</Option>
                    <Option value='其他'>5</Option>
                    <Option value='特殊'>10</Option>
                </Select>
                <span className={styles.div}>天</span>
          </Col>
          <Col style={{textAlign: 'right'}}>
            <span className={styles.acts}>
              <Button type='primary'  onClick={this.sureBtn.bind(this)}>保存</Button>
              <Button type='primary'  onClick={this.cancelBtn.bind(this)}>取消</Button>
            </span>
          </Col>
        </Row>
      )
    } else if (identifying === '编辑') {
      return (
        <div className={styles['page-show']}>
            <div className={styles.div}>任务名称:{identifying}</div>
            <div className={styles.div}>任务分类:{this.state.data.department}</div>
            <div className={styles.div}>任务限期:{this.state.data.leader}</div>
            <span className={styles.acts}>
              <Button type='primary'  onClick={this.sureBtn.bind(this)}>保存</Button>
              <Button type='primary'  onClick={this.cancelBtn.bind(this)}>取消</Button>
            </span>
        </div>
      )
    } else {
      return (
        <div className={styles['page-show']}>
             <div className={styles.div}>确定{orderNo}{workNo}的子任务吗?</div>
             <span className={styles.acts}>
              <Button type='primary'  onClick={this.sureBtn.bind(this)}>确认</Button>
              <Button type='primary'  onClick={this.cancelBtn.bind(this)}>取消</Button>
            </span>
        </div>
      )
    }
  }
  public sureBtn () {
  }
  public cancelBtn () {
  }
}
export default Main
