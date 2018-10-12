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
}

export default new PerformService()
