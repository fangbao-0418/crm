import React from 'react'
import Profile from '@/modules/common/company-detail/Profile'
import BaseInfo from '@/modules/customer/BaseInfo'
import Record from '@/modules/customer/Record'
import Card from '@/components/Card'
import Tags from '@/components/tags'
import { Button, Input, DatePicker } from 'antd'
const styles = require('./style')
interface Props {
  customerId: string
  isOpen?: boolean
}
class Main extends React.Component<Props> {
  public onSave () {
    const sourceBaseinfo: any = this.refs.baseinfo
    const baseinfo = sourceBaseinfo.getWrappedInstance()
    console.log(baseinfo.refs.wrappedComponent.save(), 'SAVE')
  }
  public render () {
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <Profile />
          <Card
            title='基本信息'
            showFold
          >
            <BaseInfo ref='baseinfo' customerId={this.props.customerId}/>
          </Card>
          {
            !this.props.isOpen &&
            <Card title='跟进记录'>
              <Tags className='mb10' />
              <Tags />
              <Input.TextArea
                className='mt10'
                placeholder='请输入备注'
              />
              <div className='mt10' >
                预约下次拜访日期  <DatePicker />
              </div>
              <div className='text-right mt10'>
                <Button
                  type='primary'
                  className='mr5'
                  onClick={this.onSave.bind(this)}
                >
                  保存
                </Button>
                <Button type='ghost'>
                  删除
                </Button>
              </div>
            </Card>
          }
        </div>
        <div className={styles.right}>
          <Record/>
        </div>
      </div>
    )
  }
}
export default Main
