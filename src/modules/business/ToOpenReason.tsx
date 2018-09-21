import React from 'react'
import { Row, Col, Tag } from 'antd'
const styles = require('./style')
const { CheckableTag } = Tag
interface OptionProps {
  label: string,
  value: string
}
interface States {
  value: string
}
class Main extends React.Component {
  public state: States = {
    value: ''
  }
  public data: OptionProps[] = [
    {
      label: '客户无需求',
      value: '1'
    },
    {
      label: '无效信息',
      value: '2'
    },
    {
      label: '价格问题',
      value: '3'
    },
    {
      label: '竞品问题',
      value: '4'
    },
    {
      label: '风险客户',
      value: '5'
    },
    {
      label: '无法提供服务',
      value: '6'
    },
    {
      label: '禁签行业',
      value: '7'
    },
    {
      label: '客户多次被骚扰',
      value: '8'
    },
    {
      label: '其他',
      value: '9'
    }
  ]
  public handleChange (index: number, value: string) {
    this.setState({
      value
    }, () => {
      console.log(this.state.value)
    })
  }
  public render () {
    return (
      <div className={styles.reason}>
        <Row>
          <Col span={6}>
            请选择转公海原因：
          </Col>
          <Col span={18}>
            <ul>
              {
                this.data.map((item, index) => {
                  return (
                    <CheckableTag
                      key={index}
                      children={item.label}
                      checked={item.value === this.state.value}
                      onChange={this.handleChange.bind(this, index, item.value)}
                    />
                  )
                })
              }
            </ul>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Main
