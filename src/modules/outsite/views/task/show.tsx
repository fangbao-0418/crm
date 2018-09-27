import React from 'react'
import monent, { Moment } from 'moment'
import { Modal, Icon, Table, Row, Col } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { MessageList, MessageItem } from '@/modules/message/types/messge'
import { Button } from 'antd'
import SearchForm from '@/modules/message/components/SearchForm'
import HCframe from '@/modules/common/components/HCframe'
import Msg from '@/modules/message/services/message'

const styles = require('../../styles/show.styl')

interface Props {
  data: any
}

interface States {
  data?: any
}

// 消息详情
class Main extends React.Component<Props, any> {
  public state: States = {
  }

  public componentWillMount () {
    this.getList()
  }

  public componentDidMount () {
  }

  // 全选反选
  public onSelectAllChange (selectedRowKeys: any) {
    console.log('select')
    this.setState({selectedRowKeys})
  }

  // 获取列表数据
  public getList () {
    this.setState({
    })
  }

  public render () {
    const {title, createAt, sender, content} = this.props.data
    return (
      <div className={styles['page-show']}>
        <h5>{title}</h5>
        <div>发送人：{sender.username}</div>
        <div>时间：{createAt}</div>
        <div className={styles.content}>{content}</div>
      </div>
    )
  }
}
export default Main
