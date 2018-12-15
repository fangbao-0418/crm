import React from 'react'
import ContentBox from '@/modules/common/content'
import BusinessDetail from './BusinessDetail'

class Main extends React.Component {
  public render () {
    return (
      <ContentBox
        title='客户仪表盘'
      >
        <BusinessDetail />
      </ContentBox>
    )
  }
}
export default Main