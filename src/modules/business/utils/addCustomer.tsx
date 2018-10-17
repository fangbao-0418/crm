import React from 'react'
import Modal from 'pilipa/libs/modal'
import { Button } from 'antd'
import Provider from '@/components/Provider'
import BaseInfo from '@/modules/customer/BaseInfo'
import showDetail from './showDetail'
export default function () {
  let ins: any
  const modal = new Modal({
    style: 'width: 600px',
    content: (
      <Provider>
        <BaseInfo
          reset
          ref={(ref: any) => { ins = ref.getWrappedInstance() }}
          onClose={() => {modal.hide()}}
          type='business'
          flowNow={() => { modal.hide()}}
        />
      </Provider>
    ),
    footer: (
      <div className='text-right mt10'>
        <Button
          className='mr5'
          type='primary'
          onClick={() => {
            console.log(ins.refs.wrappedComponent)
            ins.refs.wrappedComponent.save().then(() => {
              APP.success('保存成功')
              modal.hide()
              // this.fetchList()
            }, () => {
              APP.error('保存失败')
            })
          }}
        >
          保存
        </Button>
        <Button
          type='primary'
          onClick={() => {
            ins.refs.wrappedComponent.save().then((res: any) => {
              APP.success('保存成功') // 保存成功后跳转到详情页
              modal.hide()
              showDetail.call(this, res.data)
            }, () => {
              APP.error('保存失败')
            })
          }}
        >
          现在跟进
        </Button>
      </div>
    ),
    title: '录入客资',
    mask: true,
    onCancel: () => {
      modal.hide()
    }
  })
  modal.show()
}
