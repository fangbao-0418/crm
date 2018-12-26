import React from 'react'
import ContentBox from '@/modules/common/content'
import CustomerSignDetail from './CustomerSignDetail'
class Main extends React.Component {
  public render () {
    return (
      <ContentBox
        title='客资分析仪表盘'
      >
        <CustomerSignDetail />
      </ContentBox>
    )
  }
}
export default Main
