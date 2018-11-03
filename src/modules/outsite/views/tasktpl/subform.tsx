import {  Row, Col } from 'antd'
import React from 'react'
import { withRouter } from 'react-router'
import HCframe from '@/modules/common/components/HCframe'

/*编辑系统任务   未完成*/
class Show extends React.Component<any, any> {
  public render () {
    return (
            <div>
                <HCframe title='编辑系统任务'>
                    <Row>
                        <div>
                            <Col span={4}>工单号:</Col>
                        </div>
                        <div>
                            <Col span={7}>企业名称:</Col>
                        </div>
                        <div>
                            <Col span={4}>开始日期:</Col>
                        </div>
                    </Row>

                </HCframe>

            </div>
    )
  }
}
export default withRouter(Show)
