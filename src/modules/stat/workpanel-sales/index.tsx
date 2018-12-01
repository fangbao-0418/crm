import React from 'react'
import ContentBox from '@/modules/common/content'
import SaleDetail from './SaleDetail'

class Main extends React.Component {
  public render () {
    return (
      <ContentBox
        title='工作仪表盘'
      >
        <SaleDetail />
      </ContentBox>
    )
  }
}
export default Main
