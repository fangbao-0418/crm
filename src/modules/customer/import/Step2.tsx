import React from 'react'
import { Upload, Button } from 'antd'
import { importFile, checkFile } from '../api'
const Dragger = Upload.Dragger
const styles = require('./style')
interface Props {
  onPre?: () => void
  paramsValue: {
    step1?: {
      agencyId?: string
      agencyName?: string
      customerSource?: string,
      salesPerson?: Array<{id: string, name: string}>,
      // city?: {cityCode: string, cityName: string}
      type?: string
      /** 后缀 */
      customerNameSuffix?: string
    }
  }
  onOk?: (value?: any) => void
}
interface State {
  info: any
  isCanCheck: boolean
  isCanExport: boolean
  signal: string
}
class Main extends React.Component<Props> {
  public state: State = {
    info: {},
    isCanCheck: false,
    isCanExport: false,
    signal: ''
  }
  public check () {
    console.log('检测')
    const info = this.state.info
    const name = info.file.name
    const suffix = name.substr(name.lastIndexOf('.'))
    if (suffix !== '.xls' && suffix !== '.xlsx') {
      APP.error('请上传excel格式文件')
      return
    }
    const ids: string[] = []
    const salesNames: string[] = []
    if (this.props.paramsValue.step1.salesPerson instanceof Array) {
      this.props.paramsValue.step1.salesPerson.forEach((item, index) => {
        ids.push(item.id)
        salesNames.push(item.name)
      })
    }
    console.log(this.props.paramsValue.step1.type , this.props.paramsValue.step1.type === '3', '11')
    const paramsFile = {
      agencyId: String(this.props.paramsValue.step1.type) === '3' ? APP.user.companyId : this.props.paramsValue.step1.agencyId, // 需要从登陆信息读取
      agencyName: String(this.props.paramsValue.step1.type) === '3' ? APP.user.companyName : this.props.paramsValue.step1.agencyName,
      customerSource: this.props.paramsValue.step1.customerSource,
      salesPersonIds: ids.join(','),
      salesPersonNames: salesNames.join(','),
      type: this.props.paramsValue.step1.type,
      customerNameSuffix: this.props.paramsValue.step1.customerNameSuffix
    }
    return checkFile(info.file, paramsFile).then((res) => {
      if (res.status === 200) {
        APP.success('文件检测通过，请导入')
        this.setState({
          isCanExport: true,
          signal: res.data && res.data.signal
        })
      } else {
        APP.error(res.message)
        this.setState({
          isCanExport: false
        })
      }
    })
  }
  public uploadFile () {
    const info = this.state.info
    const name = info.file.name
    const suffix = name.substr(name.lastIndexOf('.'))
    if (suffix !== '.xls' && suffix !== '.xlsx') {
      APP.error('请上传excel格式文件')
      return
    }
    const ids: string[] = []
    const salesNames: string[] = []
    if (this.props.paramsValue.step1.salesPerson instanceof Array) {
      this.props.paramsValue.step1.salesPerson.forEach((item, index) => {
        ids.push(item.id)
        salesNames.push(item.name)
      })
    }
    console.log(this.props.paramsValue.step1.type , this.props.paramsValue.step1.type === '3', '11')
    const paramsFile = {
      agencyId: String(this.props.paramsValue.step1.type) === '3' ? APP.user.companyId : this.props.paramsValue.step1.agencyId, // 需要从登陆信息读取
      agencyName: String(this.props.paramsValue.step1.type) === '3' ? APP.user.companyName : this.props.paramsValue.step1.agencyName,
      customerSource: this.props.paramsValue.step1.customerSource,
      salesPersonIds: ids.join(','),
      salesPersonNames: salesNames.join(','),
      type: this.props.paramsValue.step1.type,
      signal: this.state.signal,
      customerNameSuffix: this.props.paramsValue.step1.customerNameSuffix
    }
    return importFile(info.file, paramsFile).then((res) => {
      if (res.status === 200) {
        if (this.props.onOk) {
          this.props.onOk(res.data)
        }
      } else {
        APP.error(res.message)
      }
    })
  }
  public render () {
    const props = {
      name: 'file',
      multiple: false,
      showUploadList: true,
      beforeUpload: () => {
        return false
      },
      onChange: (info: any) => {
        console.log(info, 'this.info')
        if (info.fileList.length === 0) {
          this.setState({
            isCanCheck: false,
            isCanExport: false
          })
        } else {
          this.setState({
            isCanCheck: true
          })
        }
        this.setState({
          info
        })
      }
    }
    return (
      <div>
        <div className={styles.step2}>
          <Dragger {...props}>
            <Button disabled={this.state.isCanCheck} type='primary' className='mr10'>上传文件</Button>
          </Dragger>
          {/* <Button className={styles.down} type='ghost' onClick={this.downFile.bind(this)}>下载客户模版</Button>
          {
            !this.state.disabled &&
            <p className='text-center'>
              导入说明：导入文件仅支持excel格式
            </p>
          } */}
        </div>
        <div className='text-right'>
          {/* <Button className='mr5' type='ghost' onClick={() => {this.props.onPre()}}>上一步</Button> */}
          <Button disabled={!this.state.isCanCheck} className='mr5' type='primary' onClick={() => this.check()}>检查</Button>
          <Button disabled={!this.state.isCanExport} type='primary' onClick={this.uploadFile.bind(this)}>导入</Button>
        </div>
      </div>
    )
  }
}
export default Main
