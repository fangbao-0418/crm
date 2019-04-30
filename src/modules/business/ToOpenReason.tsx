import React from 'react'
import { Row, Col, Tag, Button } from 'antd'
import classNames from 'classnames'
const styles = require('./style')
const { CheckableTag } = Tag
interface OptionProps {
  label: string,
  value: string
}
interface State {
  item: {label: string, value: string}
}
interface Props {
  onOk?: (item: {label: string, value: string}) => void
  onCancel?: () => void
}
class Main extends React.Component<Props, State> {
  public state: State = {
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
                      }}
                    />
                  )
                })
              }
            </ul>
          </Col>
        </Row>
        <div className={classNames('text-right', 'mt20')}>
          <Button className='mr5' onClick={() => this.props.onCancel()}>取消</Button>
          <Button
            type='primary'
            onClick={() => {
              console.log(this.state.item, 'item')
              if (this.state.item && !this.state.item.label) {
                APP.error('请选择原因！')
                return false
              } else {
                this.props.onOk(this.state.item)
              }
            }}
          >
            确定
          </Button>
        </div>
      </div>
    )
  }
}
export default Main
