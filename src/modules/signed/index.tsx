import React from 'react'
import { Row, Col, Button } from 'antd'
import Modal from 'pilipa/libs/modal'
import ContentBox from '@/modules/common/content'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import SearchName from '@/modules/common/search/SearchName'
import Profile from '@/modules/common/company-detail/Profile'
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
  public componentWillMount () {
    const modal = new Modal({
      header: null,
      footer: null,
      content: <Profile />
    })
    modal.show()
  }
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
              style={{paddingTop: '5px'}}
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
        <Button
        >
          测试
        </Button>
      </ContentBox>
    )
  }
}
export default Main
