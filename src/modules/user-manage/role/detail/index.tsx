import { Checkbox, Form, Input, Modal, Select, Button } from 'antd'
import React from 'react'
import { FormComponentProps } from 'antd/lib/form'
const FormItem = Form.Item
const Option = Select.Option
const styles = require('./style')
const CheckboxGroup = Checkbox.Group
const list = [
  {label: '增加', value: '111'},
  {label: '删除', value: '222'},
  {label: '修改', value: '333'},
  {label: '查看', value: '333'}
]
interface Props extends FormComponentProps {
  disabled?: boolean
  onOk?: () => void
  onCancel?: () => void
}
class Main extends React.Component<Props, any> {
  public onOk = () => {
    this.props.onOk()
  }
  public onCancel = () => {
    this.props.onCancel()
  }
  public render () {
    const { disabled } = this.props
    return (
      <div>
        <Form layout='inline'>
          <FormItem className={styles.input} label='角色名称' required>
            <Input disabled={disabled} size='small' />
          </FormItem>
          <FormItem className={styles.input} label='数据共享' required>
            <Select disabled={disabled} size='small' style={{width: '160px'}} placeholder='请选择是否数据共享'>
              <Option value={1}>是</Option>
              <Option value={0}>否</Option>
            </Select>
          </FormItem>
        </Form>
        <div className={styles.content}>
          <div className={styles.contentWrap}>
            <div className={styles.title}>中心运营系统权限：</div>
            <div className={styles.contentBox}>
              <div className={styles.selectAll}><Checkbox>全选</Checkbox></div>
              <div className={styles.item}>
                <Checkbox className={styles.itemTitle}>渠道</Checkbox>
                <CheckboxGroup className={styles.itemOption} options={list}></CheckboxGroup>
              </div>
            </div>
          </div>
        </div>
        <div className='mt10 text-right'>
          <Button type='primary' className='mr5'>保存</Button>
          <Button
            onClick={() => {
              if (this.props.onCancel) {
                this.props.onCancel()
              }
            }}
          >
            取消
          </Button>
        </div>
      </div>
    )
  }
}

export default Form.create()(Main)
