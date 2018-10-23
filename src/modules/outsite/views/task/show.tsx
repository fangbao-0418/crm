import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Tabs, Table, Row, Select } from 'antd'
import { Modal } from 'pilipa'
import { TaskItem } from '@/modules/outsite/types/outsite'
import { Button } from 'antd'
import ContentBox from '@/modules/common/content'
import Service from '@/modules/outsite/services'
import { ColumnProps } from 'antd/lib/table'
import Workorder from '@/modules/outsite/views/task/workorder.component'
import Status from '@/modules/outsite/enum'
const styles = require('../../styles/list.styl')
type Props = RouteComponentProps<{id?: string}>
interface State {
  dataSource: TaskItem[]
  selectedRowKeys: number[]
  trackdata: any[]
  personList: any[]
  orderId?: string
}
// 列表
class Main extends React.Component<Props, State> {
  public state: State = {
    dataSource: [],
    selectedRowKeys: [],
    trackdata: [], // 跟进小计
    personList:[] // 人员数组
  }
  public taskid: string
  public childTaskid: number
  public columns: ColumnProps<TaskItem>[] = [{
    title: '序列号ID',
    dataIndex: 'id',
    render: (text, item) => {
      return <span>{item.id}</span>
    }
  }, {
    title: '子任务名称',
    dataIndex: 'name',
    render: (text, item) => {
      return (
      <>
        {item.name}
      </>)
    }
  }, {
    title: '当前外勤人员',
    dataIndex: 'userName',
    render: (text, item) => {
      return (
      <>
        <span>{item.userName}</span>
      </>)
    }
  }, {
    title: '开始时间',
    dataIndex: 'startTime',
    render: (text, item) => {
      return (
        <span>{item.startTime}</span>
      )
    }
  }, {
    title: '结束时间',
    dataIndex: 'endTime',
    render: (text, item) => {
      return (
        <span>{item.endTime}</span>
      )
    }
  }, {
    title: '状态',
    dataIndex: 'status',
    render: (text) => {
      return Status[text]
    }
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (text, item) => {
      return (
        <span>
          <span
            className='href mr5'
            onClick={() => { this.onAuditTask.bind(this)(item) }}
          >
            审批
          </span>
          <span
            className={`href mr5 ${item.status === '1' ? '' : 'likebtn-disabled'}`}
            onClick={() => { this.showChangeModal.bind(this)(item) }}
          >
            转接任务
          </span>
          <span
            className='href'
            onClick={() => { this.showVoucherModal.bind(this)(item) }}
          >
            查看凭证
          </span>
        </span>
      )
    }
  }]
  public componentWillMount () {
    this.taskid = this.props.match.params.id
    this.getList()
    Service.getLogByTaskid(this.taskid).then((res: any) => {
      if (res) {
        this.setState({
          trackdata:res
        })
      }
    })
    Service.getWorkerList().then((res: any) => {
      if (res) {
        this.setState({
          personList:res
        })
      }
    })
  }

  // 全选反选
  public onSelectAllChange (selectedRowKeys: number[]) {
    this.setState({selectedRowKeys})
  }

  // 获取列表数据
  public getList () {
    Service.getItemByTaskid(this.taskid).then((d) => {
      this.setState({
        dataSource: d.subList,
        orderId: d.orderId
      })
    })
  }

  // 审批任务的弹层
  public onAuditTask (record: TaskItem) {
    this.childTaskid = record.id
    const modal = new Modal({
      title: '审核取消',
      content: (
        <div className={`${styles.modalbox} ${styles.cancelbox}`}>
          <p>{`确定取消“${record.name}”在内及后继子任务？`}</p>
          <div className={`${styles.cancelcont}`}>{`原因： ${record.cancelReason}`}</div>
        </div>
      ),
      onOk: () => {
        const params = {
          id: record.id,
          status: 'CANCELAPPROVE'
        }
        Service.auditTaskSure(params).then((res) => {
          this.getList()
          modal.hide()
        })
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }

  // 审批子任务的确定
  public onAuditItem (item: TaskItem) {
    //
  }

  // tab切换
  public onTabChange (key: string) {
    console.log('tab change::', arguments)
    // this.getList() // 不同状态参数
  }

  // 查看凭证弹层
  public showVoucherModal (record: TaskItem) {
    if (record.imageUrl === null) {
      APP.error('暂无凭证')
      return
    }
    const modal = new Modal({
      title: '审查凭证',
      content: (
        <div>
          <div className={`${styles.modalbox} ${styles.voucherbox}`}>
            <img
              src={`${record.imageUrl}`}
            />
          </div>
        </div>
      ),
      onOk: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  // 批量分配
  public showAllotModal () {
    const { selectedRowKeys } = this.state
    if (!selectedRowKeys.length) {
      APP.error('请选择任务')
      return
    }
    const { personList } = this.state
    let transferTasksPer: number
    const modal = new Modal({
      title: '批量分配',
      content: (
        <div className={styles.modalbox}>
          <Select
            style={{width: '100%'}}
            placeholder='选择分配的外勤'
            onChange={(value: number) => {
              transferTasksPer = value
            }}
          >
            {
              personList.length > 0 && personList.map((item: any, index: number) => {
                return (
                  <Select.Option key={`personList-${index}`} value={item.id}>{item.name}</Select.Option>
                )
              })
            }
          </Select>
        </div>
      ),
      onOk: () => {
        Service.transferTasksPer({
          userid: transferTasksPer,
          ids: selectedRowKeys
        }).then((res: any) => {
          //
          modal.hide()
        })
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }
  // 切换人员
  public onMultiChange () {
    console.log('分配人员：', arguments)
  }

  // 转接任务
  public showChangeModal (record: TaskItem) {
    const { personList } = this.state
    let transferTasksPer: number
    const modal = new Modal({
      title: '转接任务',
      content: (
        <div>
          <span>分配：</span>
          <Select
            style={{ width: '50%' }}
            onChange={(value: number) => {
              transferTasksPer = value
            }}
          >
            {
              personList.length > 0 && personList.map((item: any, index: number) => {
                return (
                  <Select.Option
                    key={`personList-${index}`}
                    value={item.id}
                  >
                    {item.name}
                  </Select.Option>
                )
              })
            }
          </Select>
        </div>
      ),
      onOk: () => {
        Service.transferTasksPer({
          userid: transferTasksPer,
          ids: [record.id]
        }).then((res) => {
          modal.hide()
        })
      }
    })
    modal.show()
  }

  public render () {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    const { trackdata, personList } = this.state
    return (
    <div className={styles.container}>
      <ContentBox title='客户的名称在这里显示'>
        <Row>
          <Tabs defaultActiveKey='sublist' onChange={this.onTabChange}>
              <Tabs.TabPane key={`sublist`} tab={'任务详情'}>
                <Table
                  columns={this.columns}
                  dataSource={this.state.dataSource}
                  rowSelection={rowSelection}
                  bordered
                  pagination={false}
                  rowKey={'id'}
                />
                <div className={styles['bottom-btns']}>
                  <Button type='primary' onClick={this.showAllotModal.bind(this)}>批量分配</Button>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane key={`tracklog`} tab={'跟进小计'}>
                <div className={styles.trackbox}>
                {
                  trackdata.length > 0 && trackdata.map((item: any, index: number) => {
                    return (
                    <div className={styles.trackitem} key={`trackitem-${index}`}>
                      <div><em>{item.userName}</em><span>{item.updateTime}</span></div>
                      <p>{item.content}</p>
                    </div>)
                  })
                }
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane key={`workorder`} tab={'工单详情'}>
                <div>
                  <Workorder />
                </div>
              </Tabs.TabPane>
          </Tabs>
        </Row>
      </ContentBox>
    </div>
    )
  }
}
export default withRouter(Main)
