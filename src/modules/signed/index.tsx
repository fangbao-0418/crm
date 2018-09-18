import React from 'react'
import { Row, Col } from 'antd'
import ContentBox from '@/modules/common/content'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import SearchName from '@/modules/common/search/SearchName'
class Main extends React.Component {
  public data: ConditionOptionProps[] = [
    {
      field: 'date',
      value: 'all',
      label: ['入库时间'],
      options: [
        {
          label: '全部',
          value: 'all'
        },
        {
          label: '今天',
          value: 'today'
        },
        {
          label: '7天',
          value: '7d'
        }
      ],
      type: 'date'
    },
    {
      label: ['电话状态'],
      field: 'telephoneStatus',
      options: [
        {
          label: '全部',
          value: 'all'
        },
        {
          label: '无效电话',
          value: 'wxdh'
        },
        {
          label: '直接拒绝',
          value: 'zjjj'
        }
      ]
    }
  ]
  public render () {
    return (
      <ContentBox>
        <Row>
          <Col span={16}>
            <Condition
              dataSource={this.data}
              onChange={(values) => {
                console.log(values)
              }}
            />
          </Col>
          <Col span={8}>
            <SearchName />
          </Col>
        </Row>
      </ContentBox>
    )
  }
}
export default Main
