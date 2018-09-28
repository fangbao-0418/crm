import React from 'react'

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
class Main extends React.Component<Props, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      data
    }
  }
  public componentWillMount () {
    this.getData()
  }
  public render () {
    const {ownerId, supervisorId} = this.props.data
    return (
      <div className={styles['page-show']}>
        <div className={styles.div}>姓名:{this.state.data.name} {ownerId} __ {supervisorId}</div>
        <div className={styles.div}>部门:{this.state.data.department}</div>
        <div className={styles.div}>汇报上级:{this.state.data.leader}</div>
        <div className={styles.div}>邮箱:{this.state.data.email}</div>
        <div className={styles.div}>电话:{this.state.data.phone}</div>
      </div>
    )
  }
  public getData () {
  }
}
export default Main
