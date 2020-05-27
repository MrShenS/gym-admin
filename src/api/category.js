import service from '@/utils/request'

// const baseUrl = '/api/admin/posts'

// const baseUrl = 'http://localhost:8099/api/Category'

//Nginx 代理后的地址
const baseUrl = '/api/Category'

const categoryApi = {}


categoryApi.getGategory = () => {
  return service({
    url: `${baseUrl}`,
    method: 'get',
  })
}


categoryApi.getGategoryByCategory = (categoryType) => {
  return service({
    url: `${baseUrl}/CategoryType`,
    method: 'get',
    params: {
      "categoryType":categoryType
    }
  })
}

categoryApi.saveGategory = (saveGategory) => {
  return service({
    url: `${baseUrl}`,
    method: 'post',
    data:saveGategory,
  })
}

categoryApi.updateGategory = (updateGategory) => {
  return service({
    url: `${baseUrl}`,
    method: 'put',
    data:updateGategory,
  })
}

categoryApi.deleteGategory = (deleteGategory) => {
  return service({
    url: `${baseUrl}`,
    method: 'delete',
    data:deleteGategory,
  })
}



export default categoryApi
