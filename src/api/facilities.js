import service from '@/utils/request'

// const baseUrl = '/api/admin/posts'

// const baseUrl = 'http://localhost:8099/api/Facilities'

//Nginx 代理后的地址
const baseUrl = '/api/Facilities'

const facilitiesApi = {}


facilitiesApi.getFacilities = () => {
  return service({
    url: `${baseUrl}`,
    method: 'get',
  })
}
facilitiesApi.saveFacilities = (saveFacilities) => {
  return service({
    url: `${baseUrl}`,
    method: 'post',
    data:saveFacilities,
  })
}

facilitiesApi.updateFacilities = (updateFacilities) => {
  return service({
    url: `${baseUrl}`,
    method: 'put',
    data:updateFacilities,
  })
}

facilitiesApi.deleteFacilities = (deleteGategory) => {
  return service({
    url: `${baseUrl}`,
    method: 'delete',
    data:deleteGategory,
  })
}



export default facilitiesApi
