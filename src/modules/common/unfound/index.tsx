import React from 'react'
import { Button } from 'antd'
const img = 'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg'
const styles = require('./style')
class Main extends React.Component {
  public render () {
    return (
      <div className={styles.container}>
        <div className='img-block'>
          <div
            className='img-ele'
            style={{ backgroundImage: `url(${img})` }}
          />
        </div>
        <div className='content'>
          <h1>404</h1>
          <div className='desc'>404</div>
          <div className='actions'>
            {
              React.createElement('span', {
                onClick: () => {
                  APP.history.push('/')
                }
              }, <Button type='primary'>返回首页</Button>)
            }
          </div>
        </div>
      </div>
    )
  }
}
export default Main
