import notification from 'pilipa/libs/notification'
Object.assign(APP, {
  success: (msg: string) => {
    notification.success({
      message: msg
    })
  },
  error: (msg: string) => {
    notification.warning({
      message: msg
    })
  }
})
