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
      label: ['入库时间', '倒库时间'],
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
      <ContentBox title='签约客户'>
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
            <SearchName
              options={[
                {label: '客户名称', value: '1'},
                {label: '测试名称', value: '2'}
              ]}
              placeholder={''}
              onChange={(value) => {
                console.log(value)
              }}
            />
          </Col>
        </Row>
      </ContentBox>
    )
  }
}
export default Main
