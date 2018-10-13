/**
 * 绩效配置
 */
import Service from '@/modules/common/services/service'
interface AddPerformPayload {
  companyId?: any // 公司ID
  productId?: any // 商品ID
  productName: string // 商品名称
  productPrice?: any // 商品价格
}
interface PerformPayload {
  id: number // 主键id
  reward: number // 绩效
}

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
  public RevisePerformance (payload: PerformPayload) {
    return Service.http(`outside/v1/api/outside/task/reward/update`, 'PUT', payload)
  }
  // 新增绩效
  public newPerformance (payload: AddPerformPayload) {
    return Service.http(`outside/v1/api/outside/task/reward/product/data`, 'POST', payload)
  }
}

export default new PerformService()
