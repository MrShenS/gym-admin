import service from '@/utils/request'

// const baseUrl = 'http://localhost:8099/api/dashboard'

// const baseUrl = 'http:localhost:8090/api/admin/posts'

//Nginx 代理后的地址
const baseUrl = '/api/dashboard'


const dashboardApi = {}


dashboardApi.getHeaderNumber = () => {
    return service({
      url: `${baseUrl}/headerNumber`,
      method: 'get',
    })
  }


  dashboardApi.getFacilitiesRatios = () => {
    return service({
      url: `${baseUrl}/facilitiesRatio`,
      method: 'get',
    })
  }

  dashboardApi.GetOptions = () => {
    return service({
      url: `${baseUrl}/GetOptions`,
      method: 'get',
    })
  }


export default dashboardApi
