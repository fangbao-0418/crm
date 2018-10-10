import React from 'react'
import { Upload, Icon, message } from 'antd'
import { importFile } from '../api'
const Dragger = Upload.Dragger
const styles = require('./style')
interface Props {
  paramsValue: {
    step1?: {
      agencyId?: string
      customerSource?: string,
      salesPerson?: Array<{id: string, name: string}>,
      city?: {cityCode: string, cityName: string}
    }
  }
  onOk?: (value?: any) => void
}
class Main extends React.Component<Props> {
  public downFile () {
    const fileUrl = require('@/assets/files/客资导入模版.xlsx')
    const el = document.createElement('a')
    el.setAttribute('href', fileUrl)
    el.setAttribute('download', '客资导入模版')
    el.click()
  }
  public render () {
    const props = {
      name: 'file',
      multiple: false,
      showUploadList: false,
      // action: '/crm-manage/v1/api/customer/upload',
      // data: {
      //   cityCode: '110000',
      //   cityName: '北京',
      //   customerSource: 1
      // },
      beforeUpload: () => {
        return false
      },
      // customRequest: (file: any) => {
      //   console.log(file)
      //   return importFile(file, {
      //     cityCode: '110000',
      //     cityName: '北京',
      //     customerSource: 1
      //   })
      // },
      onChange: (info: any) => {
        console.log(info)
        console.log(this.props.paramsValue, 'paramsValue')
        const ids: string[] = []
        const salesNames: string[] = []
        this.props.paramsValue.step1.salesPerson.forEach((item, index) => {
          ids.push(item.id)
          salesNames.push(item.name)
        })
        const paramsFile = {
          customerSource: this.props.paramsValue.step1.customerSource,
          ids: ids.join(','),
          salesNames: salesNames.join(','),
          cityCode: this.props.paramsValue.step1.city.cityCode,
          cityName: this.props.paramsValue.step1.city.cityName
        }
        console.log(paramsFile, 'paramsFile')
        return importFile(info.file, {
          cityCode: '110000',
          cityName: '北京',
          customerSource: 1
        }).then((res) => {
          if (this.props.onOk) {
            this.props.onOk(res)
          }
        })
        console.log(info)
        // const status = info.file.status;
        // if (status !== 'uploading') {
        //   console.log(info.file, info.fileList);
        // }
        // if (status === 'done') {
        //   message.success(`${info.file.name} file uploaded successfully.`);
        // } else if (status === 'error') {
        //   message.error(`${info.file.name} file upload failed.`);
        // }
      }
    }
    return (
      <div className={styles.step2}>
        <p className='text-center mt20'>
          导入说明：导入文件仅支持excel格式
          <span
            className='href'
            onClick={this.downFile.bind(this)}
          >
            下载客户模版
          </span>
        </p>
        <Dragger {...props}>
          <p className='ant-upload-drag-icon'>
            <Icon type='inbox' />
          </p>
          <p className='text-center'>上传文件</p>
        </Dragger>
      </div>
    )
  }
}
export default Main
