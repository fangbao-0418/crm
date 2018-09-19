import React from 'react'
import { Row, Col, Icon } from 'antd'
import Input from '@/components/input'
import TextArea from '@/components/textarea'
import Modal from 'pilipa/libs/modal'
import LinkMain from '@/modules/common/link-man'
class Main extends React.Component {
  public render () {
    return (
      <div>
        <Row gutter={8}>
          <Col span={12}>
            <Input
              label={
                [{
                  label: '公司名',
                  value: '1'
                }, {
                  label: '休闲鞋',
                  value: '2'
                }]
              }
            />
          </Col>
          <Col span={12}>
            <Input
              label='法人'
            />
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={12}>
            <Input
              label={'联系人'}
              addonAfter={
                (
                  <Icon
                    onClick={() => {
                      const modal = new Modal({
                        content: <LinkMain />
                      })
                      modal.show()
                    }}
                    style={{cursor: 'pointer'}}
                    type='ellipsis'
                    theme='outlined'
                  />
                )
              }
            />
          </Col>
          <Col span={12}>
            <Input
              label='法人'
            />
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={12}>
            <Input
              label={'客户来源'}
            />
          </Col>
          <Col span={12}>
            <Input
              label='纳税类型'
            />
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={12}>
            <Input
              label={'城市'}
            />
          </Col>
          <Col span={12}>
            <Input
              label='地区'
            />
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={24}>
            <Input
              label={'公司地址'}
              value={'xxx'}
            />
          </Col>
        </Row>
        <Row gutter={8} className='mt10'>
          <Col span={24}>
            <TextArea
              label={'备注'}
              value={'xxx'}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
export default Main
