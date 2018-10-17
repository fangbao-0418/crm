import React from 'react'
import ContentBox from '@/modules/common/content'
import { fetchDetail } from './api'
import { withRouter, RouteComponentProps } from 'react-router'
const styles = require('./style')
type Props = RouteComponentProps<{
  id: string
}>
interface State {
  info: OperateLog.ItemProps
}
class Main extends React.Component<Props, State> {
  public state: State = {
    info: {}
  }
  public componentWillMount () {
    fetchDetail(this.props.match.params.id).then((res) => {
      this.setState({
        info: res
      })
    })
  }
  public render () {
    const { info } = this.state
    return (
      <ContentBox
        title='操作日志/日志详情'
      >
        <div className={styles.detail}>
          <div className={styles['detail-item']}>
            <div>
              <span>操作人：{info.operatorName}</span>
              <span>时间：{info.operationTime}</span>
            </div>
            <div className='mt20'>变更前</div>
            <p>
              {info.originalMode || '暂无'}
            </p>
            <div>变更后</div>
            <p>
              {info.modifyMode || '暂无'}
            </p>
          </div>
        </div>
      </ContentBox>
    )
  }
}
export default withRouter(Main)
