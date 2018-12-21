import React from 'react'
import ContentBox from '@/modules/common/content'
import PerformanceStatistics from './performanceDetail'
class Main extends React.Component {
  public render () {
    return (
      <ContentBox
        title='客户仪表盘'
      >
        <PerformanceStatistics />
      </ContentBox>
    )
  }
}
export default Main
