import React from 'react'
import { Button } from 'antd'
import GVerify from '@/utils/gVerify'
import { userLogin, fetchSmsVerifyCode } from '@/modules/common/api'
const styles = require('./style')
import classNames from 'classnames'
interface Props {
  onOk?: () => void
}
interface State {
  type: number
  error: any
  message: string
}
class Main extends React.Component<Props> {
  public state: State = {
    type: 1,
    error: {},
    message: '获取验证码'
  }
  public values: any = {}
  public verify: any
  public num = 0
  public componentWillMount () {
    if (APP.token) {
      APP.history.push('/')
    }
  }
  public componentDidMount () {
    this.verify = new GVerify('verify')
    $(this.refs.sms).find('ul li').click((e) => {
      $(e.currentTarget).siblings().removeClass(styles.active)
      $(e.currentTarget).addClass(styles.active)
    })
  }
  public changeType (type: number) {
    this.setState({
      type
    })
  }
  public toLogin () {
    const { error } = this.state
    if (!this.values.phone) {
      error.phone = '手机号不能为空'
    }
    if (!this.verify.validate(this.values['verify-code'] || '')) {
      error['verify-code'] = '图片验证码不匹配'
    }
    if (!this.values['sms-verify-code']) {
      error['sms-verify-code'] = '短信验证码不能为空'
    }
    this.setState({
      error
    })
    if (error.phone || error['verify-code'] || error['sms-verify-code']) {
      return
    }
    userLogin({
      phone: this.values.phone,
      validCode: this.values['verify-code'],
      phoneValidCode: this.values['sms-verify-code']
    }).then((res) => {
      APP.token = res.token
      if (this.props.onOk) {
        this.props.onOk()
      }
    }, () => {
      error.phone = '手机号尚未注册或短信验证码不正确'
      this.setState({
        error
      })
    })
  }
  public handleChange (field: 'phone' | 'verify-code' | 'sms-verify-code', e: React.SyntheticEvent) {
    this.setState({
      error: {}
    })
    const target: any = e.target
    const value = target.value
    this.values[field] = value
  }
  public getSmsVerifyCode () {
    const { error } = this.state
    if (!/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(this.values.phone)) {
      error.phone = '手机号码格式不正确'
      this.setState({
        error
      })
      return
    }
    if (this.num === 0) {
      fetchSmsVerifyCode(this.values.phone)
      this.num = 59
      this.setState({
        message: '获取验证码'
      })
    } else {
      return
    }
    this.setState({
      message: `${this.num}s重新发送`
    })
    const t = setInterval(() => {
      if (this.num <= 1) {
        this.num = 0
        this.setState({
          message: '获取验证码'
        })
        clearInterval(t)
      } else {
        this.num--
        this.setState({
          message: `${this.num}s重新发送`
        })
      }
    }, 1000)
  }
  public render () {
    const { error, message } = this.state
    return (
      <div className={styles.box}>
        <div className={styles.title}>噼里啪管理系统</div>
        <div className={styles.switch}>
          <span className={classNames({[styles.active]: this.state.type === 1})} onClick={this.changeType.bind(this, 1)}>短信登录</span>
          <span className={classNames({[styles.active]: this.state.type === 2})} onClick={this.changeType.bind(this, 2)}>微信登录</span>
        </div>
        <div className={styles.sms} ref='sms'>
          <ul>
            <li className={classNames({[styles['has-error']]: !!error.phone})}>
              <div className={styles.phone}>
                <input maxLength={11} placeholder='请输入手机号' onChange={this.handleChange.bind(this, 'phone')}/>
              </div>
              <span className={styles.error}>
                {error.phone}
              </span>
            </li>
            <li className={classNames({[styles['has-error']]: !!error['verify-code']})}>
              <div className={styles['verify-text']}>
                <input maxLength={4} onChange={this.handleChange.bind(this, 'verify-code')}/>
              </div>
              <div id='verify' className={styles['verify-image']} style={{width: '110px', height: '42px'}}></div>
              <span className={styles.error}>
                {error['verify-code']}
              </span>
            </li>
            <li className={classNames({[styles['has-error']]: !!error['sms-verify-code']})}>
              <div className={styles['sms-verify-text']}>
                <input maxLength={6} onChange={this.handleChange.bind(this, 'sms-verify-code')}/>
                <span
                  style={{color: message === '获取验证码' ? null : '#cccccc'}}
                  onClick={this.getSmsVerifyCode.bind(this)}
                >{message}
                </span>
              </div>
              <span className={styles.error}>
                {error['sms-verify-code']}
              </span>
            </li>
          </ul>
          <Button
            size='large'
            type='primary'
            className={styles['login-btn']}
            onClick={this.toLogin.bind(this)}
          >
            登录
          </Button>
        </div>
      </div>
    )
  }
}
export default Main
