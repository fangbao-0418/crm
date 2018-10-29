import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
const styles = require('./style')
interface Props extends Customer.Props {
  isShowAgent?: boolean
  type?: 'business' | 'open' | 'customer',
  customerName?: string
}
class Main extends React.Component<Props> {
  public render () {
    return (
      <div className={styles.profile}>
        <div className={styles.left}>
          <div className={styles.picture}></div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            {this.props.detail.customerName}
          </div>
          <p>
            {
              String(this.props.detail.isConfirmed) === '1' &&
              <span>
                <span className={styles.verified} />
                <span className='mr20 ml10'>认证</span>
              </span>
            }
            {/* <span className={styles.telphone} />
            <span className='mr20 ml10'>电话</span> */}
            <span className={styles.tyc} onClick={() => {window.open(`https://www.tianyancha.com/search?key=${this.props.detail.customerName}`)}}/>
            <span className='mr20 ml10'>天眼查</span>
          </p>
          <p>
            {
              this.props.type === 'open' &&
              <span>
                <label>最后跟进人:</label>
                <span>
                  {this.props.detail.lastReleaseSalesperson}
                </span>
                <span>
                  {/* 所属机构过滤 */}
                  {this.props.detail.lastReleaseSalesperson ? '('+ APP.user.companyName + ')' : ''}
                </span>
              </span>
            }
            {
               this.props.type !== 'open' &&
               <span>
                <label>跟进人:</label>
                <span>
                  {this.props.detail.currentSalesperson}
                </span>
                <span>
                  {/* 所属机构过滤 */}
                  {this.props.detail.currentSalesperson? '('+ APP.user.companyName + ')' : ''}
                </span>
               </span>
            }
            <label style={{marginLeft: '10px'}}>意向度:</label>
            <span>
              {APP.dictionary[`EnumIntentionality-${this.props.detail.tagIntention}`]}
            </span>
            <label style={{marginLeft: '10px'}}>
              {APP.dictionary[`EnumCustomerSource-${this.props.detail.customerSource}`]}
            </label>
            <label style={{marginLeft: '10px'}}></label>
            <span>
              {moment(this.props.detail.createTime).format('YYYY-MM-DD')}
            </span>
          </p>
          {
            this.props.isShowAgent &&
            <p>
              <label>记账状态:</label><span>正常做账</span>
              <label style={{marginLeft: '10px'}}>运营会计:</label><span>张飞飞</span>
              <label style={{marginLeft: '10px'}}>核算会计:</label><span>张飞</span>
              <label style={{marginLeft: '10px'}}>当前账期:</label><span>2018-09</span>
              <label style={{marginLeft: '10px'}}>服务期止:</label><span>2019-10</span>
            </p>
          }
        </div>
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Main)
