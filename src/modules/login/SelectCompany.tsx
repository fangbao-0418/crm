import React from 'react'
const styles = require('./style')
class Main extends React.Component {
  public state = {
    dataSource: [
      {name: '北京爱康鼎科技有限公司'},
      {name: '北京爱康鼎科技有限公司'},
      {name: '北京爱康鼎科技有限公司'}
    ]
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
                    {item.name}
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
