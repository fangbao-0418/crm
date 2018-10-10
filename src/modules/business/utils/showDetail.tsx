import React from 'react'
import { Button } from 'antd'
import Modal from 'pilipa/libs/modal'
import Detail from '@/modules/customer/detail'
import Provider from '@/components/Provider'
export default function (customerId: string) {
  const that = this
  console.log(this, 'assssss')
  const modal = new Modal({
    content: (
      <Provider>
        <Detail
          type='business'
          getWrappedInstance={(ins) => {
            that.ins = ins
          }}
          customerId={customerId}
          footer={(
            <div className='text-right mt10'>
              <Button
                type='primary'
                className='mr5'
              >
                转公海
              </Button>
              <Button
                type='ghost'
                onClick={() => {
                  that.ins.save()
                }}
              >
                保存
              </Button>
            </div>
          )}
        />
      </Provider>
    ),
    footer: null,
    header: null,
    mask: true,
    onCancel: () => {
      modal.hide()
    }
  })
  modal.show()
}
