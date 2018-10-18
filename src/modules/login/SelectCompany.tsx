import React from 'react'
const styles = require('./style')
import { companylist } from '@/modules/common/api'
interface States {
  dataSource: Array<{companyName: string, companyId: string}>
}
class Main extends React.Component {
  public state: States = {
    dataSource: []
  }
  public componentWillMount () {
    const token = APP.token
    companylist(token).then((res) => {
      this.setState({
        dataSource: res
      })
    })
  }
  public render () {
    const { dataSource } = this.state
    return (
      <div className={styles['select-company']}>
        <ul>
          {
            dataSource.map((item, index) => {
              return (
                <li key={`search-company-${index}`}>
                  <span
                    onClick={() => {
                      APP.history.push('/')
                    }}
                  >
                    {item.companyName}
                  </span>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
export default Main
