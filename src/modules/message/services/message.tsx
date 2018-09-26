/**
 * 提醒工具类
 *
 * 1. 通信类，支持推拉
 * 2. UI类，基于antd
 * 暂时不拆分，后期可分离协议类，授权类、通信驱动类、UI类、消息逻辑类
 */
import { ReactNode, ReactElement } from 'react'
import { notification, message } from 'antd'
import { ArgsProps } from 'antd/lib/notification'
import _ from 'lodash'

import MsgService from '@/modules/message/services'

type Method = (...args: Array<any>) => any

// 消息类型
interface MsgUIConf {
  btn?: ReactNode	                  // 自定义关闭按钮	ReactNode	-
  className?: string                // 自定义 CSS class	string	-
  message?: string | ReactNode      // 通知提醒标题，必选	string|ReactNode	-
  description?: string | ReactNode  // 通知提醒内容，必选	string|ReactNode	-
  duration?: any                    // 默认 4.5 秒后自动关闭，配置为 null 则不自动关闭	number	4.5
  icon?: ReactNode                  // 自定义图标	ReactNode	-
  key?: string	                    // 当前通知唯一标志	string	-
  placement?: string                // 弹出位置，可选 topLeft topRight bottomLeft bottomRight	string	topRight
  style?: React.CSSProperties       // 自定义内联样式	React.CSSProperties	-
  onClose?: Method                  // 点击默认关闭按钮时触发的回调函数	Function	-
}

// Msg默认参数
interface Conf {
  token?: string,
  pullConf?: any
}

// 消息接口
interface MsgI {
  // config?: any
  getToken?: Method     // 获取token
  refreshToken?: Method // 刷新token

  connect?: Method      // 通信 连接，默认需要添加：根据通信方式，补充onData监听
  close?: Method        // 通信 断开连接
  onData?: Method       // 暂定一个dada事件，发布订阅

  evAdd?: Method
  evRemove?: Method
  evTrigger?: Method

  uiOpen?: Method       // 基础方法
  uiShow?: Method       // 通用方法
  uiAlert?: Method      // 类型
  uiError?: Method      // 类型
}

// 消息类型
const msgActions = {
  REMINDER: 'REMINDER' // 催单
}

class Msg implements MsgI {
  public config: any
  private conf: Conf = {
    // 拉模式配置
    pullConf : {
      duration: 10000
    }
  }
  private looptimer: any
  private evs: any

  // 初始化
  public constructor (conf: Conf = {}) {
    this.conf = _.extend(this.conf, conf)
    this.evs = {}
  }

  // 默认使用拉形式
  public connect (conf: any) {
    return this.pullConnect(conf)
  }

  public onData (data: any) {
    return this.pullOnData(data)
  }

  public close () {
    return this.pullClose()
  }

  public evAdd (ev: string, fn: Method) {
    if (!this.evs[ev]) {
      this.evs[ev] = []
    }
    this.evs[ev].push(fn)
    return this
  }

  public evRemove (ev: string) {
    if (!this.evs[ev]) {
      return this
    }
    delete this.evs[ev]
    return this
  }

  public evTrigger (ev: string, ...args: Array<any>) {
    if (!this.evs[ev]) {
      return this
    }
    this.evs[ev].map((fn: Method) => fn(...args))
    return this
  }

  // 消息可视化展现方法
  public uiOpen (conf: ArgsProps) {
    notification.open(conf)
    return this
  }
  public uiShow (conf: ArgsProps) {
    notification.info(conf)
    return this
  }
  public uiError (conf: ArgsProps) {
    notification.error(conf)
    return this
  }

  // 拉模式的连接、中断、基础数据返回操作方法
  private pullConnect (conf: any) {
    this.looptimer = setInterval(() => {
      MsgService.getCurrentByUserid(123).then((data: any) => {
        this.evTrigger('data', data)
        this.onData(data)
      }).catch((e: any) => {
        this.uiError({
          // message: '数据有误',
          message: null,
          description: 'error'
        })
      })
    }, this.conf.pullConf.duration || 5000)
    return this
  }
  private pullClose () {
    clearInterval(this.looptimer)
    this.looptimer = null
    this.evTrigger('close')
    return this
  }
  private pullOnData (data: any) {
    this.uiShow({
      message: '测试',
      description: <div>内容可以自定义</div>,
      placement: 'bottomRight',
      duration: 100000
    })
    return this
  }
}

export default (conf: Conf) => {
  return new Msg(conf)
}
