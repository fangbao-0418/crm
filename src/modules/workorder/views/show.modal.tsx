import React from 'react'
import Service from '@/modules/workorder/api'
import {  Row, Col } from 'antd'

const styles = require('../styles/show.modal.styl')
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
}

// 消息详情
class Main extends React.Component<Props, any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      data
    }
  }

  public render () {
    return (
      <div className={styles['page-show']}>
        <Row className={styles.div}>
          <Col className={styles.title} span={4}>姓名:</Col>
          <Col span={20}>{this.props.data.name}</Col>
        </Row>
        <Row className={styles.div}>
          <Col className={styles.title} span={4}>代理商:</Col>
          <Col span={20}>{this.props.data.name}</Col>
        </Row>
        <Row className={styles.div}>
          <Col className={styles.title} span={4}>部门名称:</Col>
          <Col span={20}>{this.props.data.name}</Col>
        </Row>
        <Row className={styles.div}>
          <Col className={styles.title} span={4}>汇报上级:</Col>
          <Col span={20}>{this.props.data.parentId}</Col>
        </Row>
        <Row className={styles.div}>
          <Col className={styles.title} span={4}>联系电话:</Col>
          <Col span={20}>{this.props.data.phone}</Col>
        </Row>
        <Row className={styles.div}>
          <Col className={styles.title} span={4}>邮箱:</Col>
          <Col span={20}>{this.props.data.email}</Col>
        </Row>
      </div>
    )
  }
}
export default Main
