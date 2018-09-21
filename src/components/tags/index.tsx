import React from 'react'
import Tag from './Tag'
const styles = require('./style')
class Main extends React.Component {
  public dataSource = [
    {
      title: '电话状态',
      options: [
        {
          label: '无效电话',
          value: '1'
        },
        {
          label: '无人接听',
          value: '2'
        }
      ]
    }
  ]
  public render () {
    const dataSource = this.dataSource
    return (
      <div className={styles.container}>
        {
          dataSource.map((item, index) => {
            return (
              <div key={`tags-${index}`} className={styles.tags}>
                <label>{item.title}</label>
                <ul>
                  {
                    item.options.map((item2, index2) => {
                      return (
                        <li key={`tag-${index}-${index2}`}>
                          <Tag title={item2.label} />
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          })
        }
      </div>
    )
  }
}
export default Main
