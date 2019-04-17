import React from 'react'
import { Row, Col, Tag } from 'antd'
const styles = require('./style')
const { CheckableTag } = Tag
interface OptionProps {
  label: string,
  value: string
}
interface States {
  item: {label: string, value: string}
}
interface Props {
  onChange: (item: {label: string, value: string}) => void
}
class Main extends React.Component<Props> {
  public state: States = {
    item: {label: '', value: ''}
  }
  public data: OptionProps[] = APP.constants.releaseCause
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
                      checked={item.value === this.state.item.value}
                      onChange={() => {
                        this.setState({
                          item
                        })
                        console.log(item, 'item')
                        this.props.onChange(item)
                      }}
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
