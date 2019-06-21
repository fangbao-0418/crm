import React from 'react'
import BusinessInfo from './BusinessInfo'
import BaseInfo from './BaseInfo'
import LinkMan from './LinkMan'
import Card from '@/components/Card'
import AddButton from '@/modules/common/content/AddButton'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import { updateCustomer } from '@/modules/customer/api'
import _ from 'lodash'
const styles = require('./style')
interface Props {
  linkMan: Customer.LinkManProps[]
  detail: Customer.DetailProps
}
class Main extends React.Component<Props> {
  public state = {
    disabled: true
  }
  public linkMan: any = {}
  public businessInfo: any = {}
  public addLinkMan () {
    const linkMan = this.props.linkMan
    linkMan.push({
      contactPerson: '',
      contactPhone: '',
      source: 1
    })
    APP.dispatch({
      type: 'change customer data',
      payload: {
        linkMan
      }
    })
  }
  public save () {
    const id = this.props.detail.id
    if (this.state.disabled !== false) {
      return Promise.resolve()
    }
    return updateCustomer(id, this.props.detail).then(() => {
      APP.success('保存成功')
    })
  }
  public render () {
    return (
      <div className={styles.container}>
        <Card
          title='工商信息'
          rightContent={
            APP.hasPermission('crm_sign_myself_detail_save') && (
            <Icon
              className='href'
              type={!this.state.disabled ? 'save' : 'edit'}
              theme='outlined'
              onClick={() => {
                console.log(this.state.disabled, 'on click')
                if (this.state.disabled === true) {
                  this.setState({
                    disabled: false
                  })
                  return
                }
                Promise.all([
                  new Promise((resolve, reject) => {
                    this.businessInfo.props.form.validateFields((errs: any) => {
                      if (errs) {
                        reject()
                      } else {
                        const linkMan = _.cloneDeep(this.props.linkMan)
                        const detail = this.props.detail
                        linkMan.map((item) => {
                          delete item.key
                        })
                        detail.contactPersons = linkMan
                        APP.dispatch<Customer.Props>({
                          type: 'change customer data',
                          payload: {
                            detail
                          }
                        })
                        resolve()
                      }
                    })
                  }),
                  new Promise((resolve, reject) => {
                    this.linkMan.props.form.validateFields((errs: any) => {
                      if (errs) {
                        reject()
                      } else {
                        resolve()
                      }
                    })
                  })
                ]).then(() => {
                  if (!this.state.disabled) {
                    if (!this.props.detail.unifiedCreditCode && this.props.detail.companyInfoSource !== 0) {
                      APP.error('请输入社会统一信用代码！')
                      return
                    }
                    if (this.props.detail.isConfirmed === 0 && this.props.detail.companyInfoSource === 3 && !this.props.detail.businessHoursBegin) {
                      APP.error('请选择营业开始时间！')
                      return
                    }
                    if (this.props.detail.companyInfoSource !== 0 && this.props.detail.isConfirmed === 0 && !(/^[3 | 5]/.test(this.props.detail.unifiedCreditCode))) {
                      APP.error('公司不属于录入范围，请通过天眼查和网址读取！')
                      return
                    }
                  }
                  this.setState({
                    // disabled: !this.state.disabled
                  }, () => {
                    this.save().then(() => {
                      this.setState({
                        disabled: !this.state.disabled
                      })
                    })
                  })
                }, () => {
                  if (!this.state.disabled) {
                    APP.error('请检查输入项')
                  }
                })
              }}
            />
          )}
        >
          <BusinessInfo
            getWrappedInstance={(ref) => {
              this.businessInfo = ref
            }}
            disabled={!APP.hasPermission('crm_sign_myself_detail_business_save') || this.state.disabled}
          />
        </Card>
        <Card
          title='基本信息'
        >
          <BaseInfo
            disabled={!APP.hasPermission('crm_sign_myself_detail_baseinfo_save') || this.state.disabled}
          />
        </Card>
        <Card
          title='联系方式'
          rightContent={(APP.hasPermission('crm_sign_myself_detail_contact_save') && !this.state.disabled) && (
            <AddButton
              onClick={this.addLinkMan.bind(this)}
            />
          )}
        >
          <LinkMan
            getWrappedInstance={(ref) => {
              this.linkMan = ref
            }}
            disabled={!APP.hasPermission('crm_sign_myself_detail_contact_save') || this.state.disabled}
          />
        </Card>
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Main)
