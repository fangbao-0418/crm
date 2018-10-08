import React from 'react'
import Service from '@/modules/workorder/api'

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
        <div className={styles.div}>姓名:{this.props.data.name}</div>
        <div className={styles.div}>代理商:{this.props.data.name}</div>
        <div className={styles.div}>部门名称:{this.props.data.name}</div>
        <div className={styles.div}>汇报上级:{this.props.data.parentId}</div>
        <div className={styles.div}>联系电话:{this.props.data.phone}</div>
        <div className={styles.div}>邮箱:{this.props.data.email}</div>
      </div>
    )
  }
}
export default Main
