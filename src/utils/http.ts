import { notification, loading } from 'pilipa'
import store from '@/store'
import filters from './filters'
function handleError (err: JQuery.jqXHR) {
  let res = {}
  const { responseJSON, responseText } = err
  try {
    res = responseJSON || JSON.parse(responseText)
  } catch (e) {
    console.log(e)
  }
  return res
}
$(document).ajaxSend((event, response, options) => {
  const disableUrls = [
    '/notification/v1/api/remind/prompt/last/(\\w)+',
    '/notification/v1/api/remind/unread/(\\w)+'
  ]
  const { url } = options
  const index = disableUrls.findIndex((test) => {
    const pattern = new RegExp(test)
    if (pattern.test(url)) {
      return true
    }
  })
  if (index > -1) {
    return
  }
  console.log(index, 'url')
  store.dispatch({type: 'loading show'})
  const { ajaxCount } = store.getState().common
  if (ajaxCount > 0 && $('.pilipa-loading').length === 0) {
    loading.show()
  }
})

$(document).ajaxComplete((event, response, options) => {
  store.dispatch({type: 'loading hidden'})
  const { ajaxCount } = store.getState().common
  if (ajaxCount <= 0) {
    loading.hide()
  }
})
$(document).ajaxError((event, response) => {
  let msgConf = null
  const err: any = handleError(response) || {}
  err.message = err.message || err.errMsg
  if (response.status === 401) {
    APP.history.push('/logout')
  }
  let pass = true
  const url = err.path
  filters.errorPrompt.map((pattern) => {
    if (new RegExp(pattern).test(url)) {
      pass = false
    }
  })
  if (err && err.status && err.errors instanceof Array && pass) {
    const { status, errors } = err
    const message: string[] = []
    errors.forEach((item: {message: string, code: string}) => {
      message.push(item.message)
    })
    msgConf = {
      title: '系统提示',
      message: message.join('，')
    }
    notification.warning(msgConf)
  }
})
const RequestTypes = ['GET', 'POST', 'DELETE', 'PUT']
export interface AjaxConfigProps extends JQuery.AjaxSettings {
  type?: RequestTypeProps
  raw?: boolean
  extension?: JQuery.AjaxSettings
  [field: string]: any
}
type RequestTypeProps = 'GET' | 'POST' | 'DELETE' | 'PUT'
const http = (url: string, type?: AjaxConfigProps | RequestTypeProps, config: AjaxConfigProps = {}) => {
  // url = APP.env === 'production' ? 'https://x-sys.i-counting.cn' + url : url
  let data: any
  if (config instanceof Array) {
    data = config
    config = {}
    config.data = data
  }
  if (typeof type === 'object') {
    config = type
    if (typeof config.type === 'string' && RequestTypes.indexOf(config.type.toUpperCase()) > -1) {
      type = config.type || 'GET'
      delete (config.type)
    } else {
      type = 'GET'
    }
  } else {
    type = type || 'GET'
  }
  const extension = config.extension || {}
  delete config.extension
  data = config.data || config || undefined
  const headers = Object.assign({}, config.headers, {
    token: `${APP.token}`
  })
  let ajaxConfig: JQuery.AjaxSettings = {
    url: '/sys' + url,
    method: type,
    headers,
    contentType: config.contentType !== undefined ? config.contentType : 'application/json; charset=utf-8',
    data,
    timeout: 10000
    // xhrFields: {
    //   withCredentials: true
    // }
  }
  if (extension) {
    ajaxConfig = $.extend(true, ajaxConfig, extension)
  }
  delete config.headers
  delete config.contentType
  const raw = config.raw || false
  switch (type) {
  case 'POST':
    ajaxConfig.processData = config.processData || false
    ajaxConfig.data = raw ? data : JSON.stringify(data)
    break
  case 'PUT':
    ajaxConfig.processData = config.processData || false
    ajaxConfig.data = raw ? data : JSON.stringify(data)
    break
  case 'DELETE':
    ajaxConfig.processData = config.processData || false
    ajaxConfig.data = raw ? data : JSON.stringify(data)
    break
  }
  return $.ajax(ajaxConfig).then((res) => {
    let result = {}
    if (typeof res === 'string') {
      try {
        result = JSON.parse(res)
      } catch (e) {
        result = res
      }
    } else {
      result = res
    }
    return result
  }, (err) => {
    return err
  })
}
export default http
