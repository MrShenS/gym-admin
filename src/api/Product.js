import service from '@/utils/request'

// const baseUrl = '/api/admin/posts'

// const baseUrl = 'http://localhost:8099/api/Product'



//Nginx 代理后的地址
const baseUrl = '/api/Product'

const productApi = {}


productApi.getProduct = () => {
  return service({
    url: `${baseUrl}`,
    method: 'get',
  })
}
productApi.saveProduct = (saveProduct) => {
  return service({
    url: `${baseUrl}`,
    method: 'post',
    data:saveProduct,
  })
}

productApi.updateProduct = (updateProduct) => {
  return service({
    url: `${baseUrl}`,
    method: 'put',
    data:updateProduct,
  })
}

productApi.deleteProduct = (deleteGategory) => {
  return service({
    url: `${baseUrl}`,
    method: 'delete',
    data:deleteGategory,
  })
}



export default productApi
