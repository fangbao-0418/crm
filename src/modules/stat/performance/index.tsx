import React from 'react'
import ContentBox from '@/modules/common/content'
import PerformanceDetail from './PerformanceDetail'
class Main extends React.Component {
  public render () {
    return (
      <ContentBox
        title='业绩仪表盘'
      >
        <PerformanceDetail />
      </ContentBox>
    )
  }
}
export default Main
