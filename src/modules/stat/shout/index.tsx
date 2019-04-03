import React from 'react'
import ContentBox from '@/modules/common/content'
import { Tabs } from 'antd'
import { RouteComponentProps } from 'react-router'
import Monitor from './monitor'
import CallDetail from './CallDetail'
const TabPane = Tabs.TabPane
type Props = RouteComponentProps
class Main extends React.Component<Props> {
  public render () {
    let key = APP.hasPermission('crm_data_call_monitors') ? 'monitor' : 'detail'
    if (this.props.location.pathname === '/shout/detail') {
      key = 'detail'
    }
    return (
      <ContentBox
        title={key === 'detail' ? '通话详情' : '呼叫统计'}
      >
        {
          key === 'detail' ? <CallDetail /> : <Monitor />
        }
      </ContentBox>
    )
  }
}
export default Main
