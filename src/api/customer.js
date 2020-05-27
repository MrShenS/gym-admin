import service from '@/utils/request'

// const baseUrl = '/api/admin/posts'

// const baseUrl = 'http://localhost:8099/api/Customer'


//Nginx 代理后的地址
const baseUrl = '/api/Customer'

const customerApi = {}


customerApi.getCustomer = () => {
  return service({
    url: `${baseUrl}`,
    method: 'get',
  })
}


customerApi.getCustomerByQueryParam = (name,address)=>{
  return service({
    url: `${baseUrl}/getCustomerByQueryParam`,
    method: 'get',
    params: {
      "name":name,
      "address":address
    }
  })
}



customerApi.getCustomerDetail = (param)=>{
  return service({
    url: `${baseUrl}/getCustomerDetail`,
    method: 'get',
    params: {"phone":param}
  })
}


customerApi.saveCustomer = (saveCustomer) => {
  return service({
    url: `${baseUrl}`,
    method: 'post',
    data:saveCustomer,
  })
}

customerApi.updateCustomer = (updateCustomer) => {
  return service({
    url: `${baseUrl}`,
    method: 'put',
    data:updateCustomer,
  })
}

customerApi.deleteCustomer = (deleteCustomer) => {
  return service({
    url: `${baseUrl}`,
    method: 'delete',
    data:deleteCustomer,
  })
}



export default customerApi
