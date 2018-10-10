import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
const styles = require('./style')
interface Props extends Customer.Props {
  isShowAgent?: boolean
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
              this.props.detail.isConfirmed === '1' &&
              <span>
                <span className={styles.verified} />
                <span className='mr20 ml10'>认证</span>
              </span>
            }
            {/* <span className={styles.telphone} />
            <span className='mr20 ml10'>电话</span> */}
            <span className={styles.tyc} onClick={() => {window.open('https://www.tianyancha.com/login?from=https%3A%2F%2Fwww.tianyancha.com%2Fsearch%3Fkey%3D%25E5%258C%2597%25E4%25BA%25AC%25E7%2588%25B1%25E5%25BA%25B7%25E9%25BC%258E%25E7%25A7%2591%25E6%258A%2580%25E6%259C%2589%25E9%2599%2590%25E5%2585%25AC%25E5%258F%25B8')}}/>
            <span className='mr20 ml10'>天眼查</span>
          </p>
          <p>
            <label>跟进人:</label>
            <span>
              {this.props.detail.currentSalesperson}
            </span>
            <span>
              {/* 所属机构过滤 */}
              ({this.props.detail.agencyId})
            </span>
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
