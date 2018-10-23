/** http://pilipawiki1.vaiwan.com:8081/pages/viewpage.action?pageId=5538003 */
enum Status {
  UNDISTRIBUTED = '待分配',
  DISTRIBUTED = '已分配',
  COLLECTING = '收集资料',
  FINISHED = '已完成',
  REFUSED = '已驳回',
  RUNNING = '进行中',
  SUBMITED = '已交付',
  CANCELPENDING = '取消',
  REJECTPENDING = '拒绝',
  CANCELLED = '已取消',
  COMMITED = '已提交',
  ACCEPT = '已分配',
  REJECT = '已分配',
  REJECTAPPROVE = '拒绝待审批',
  REJECTUNAPPROVE = '拒绝待审批',
  CANCEL = '已分配',
  CANCELAPPROVE = '取消待审批',
  CANCELUNAPPROVE = '取消待审批',
  SUBMITAPPROVE = '已交付',
  SUBMITUNAPPROVE	= '已交付',
  WAITING = '待处理',
  PENDING = '待审批',
  START = '待处理',
  FINISH = '进行中'
}
export default Status
