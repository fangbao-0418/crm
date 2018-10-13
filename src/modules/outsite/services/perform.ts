/**
 * 绩效配置
 */
import Service from '@/modules/common/services/service'

class PerformService extends Service {
  // 绩效列表
  public getPerformListByUserid (current: any = '', size: any = 10) {
    return Service.http(
      `outside/v1/api/outside/task/reward/list?` +
      `current=${current}&` +
      `size=${size}&` +
      `productName= `
    )
  }
  // 修改绩效
  public RevisePerformance (id: any = '', reward: any = '') {
    return Service.http(`outside/v1/api/outside/task/reward/update`, 'PUT', {
      id, reward
    })
  }
  // 新增绩效
  public newPerformance (companyId: any = '', productId: any = '', productName: any = '', productPrice: any = '') {
    return Service.http(`outside/v1/api/outside/task/reward/product/data`, 'POST', {
      companyId, productId, productName, productPrice
    })
  }
}

export default new PerformService()
