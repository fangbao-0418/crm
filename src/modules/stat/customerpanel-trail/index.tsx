import React from 'react'
import ContentBox from '@/modules/common/content'
import TrailDetail from './TrailDetail'

class Main extends React.Component {
  public render () {
    return (
      <ContentBox
        title='客户仪表盘'
      >
        <TrailDetail />
      </ContentBox>
    )
  }
}
export default Main
