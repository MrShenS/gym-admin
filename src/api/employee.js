import service from '@/utils/request'

// const baseUrl = '/api/admin/posts'

// const baseUrl = 'http://localhost:8099/api'


//Nginx 代理后的地址
const baseUrl = '/api'

const employeeApi = {}


employeeApi.getEmployees = () => {
  return service({
    url: `${baseUrl}/employee`,
    method: 'get',
  })
}

employeeApi.getemployeeShow = () => {
  return service({
    url: `${baseUrl}/employeeShow`,
    method: 'get',
  })
}


employeeApi.getemployeeByQueryParam = (queryParam) => {
  return service({
    url: `${baseUrl}/getEmployeeByQueryParam`,
    method: 'post',
    data:queryParam
  })
}

employeeApi.updateEmployee = (updateEmployee) => {
  return service({
    url: `${baseUrl}/employee`,
    method: 'put',
    data:updateEmployee
  })
}


employeeApi.deleteEmployee = (deleteEmployee) => {
  return service({
    url: `${baseUrl}/employee`,
    method: 'delete',
    data:deleteEmployee
  })
}


employeeApi.deleteAllEmployee = (deleteAllEmployee) => {
  return service({
    url: `${baseUrl}/AllEmployee`,
    method: 'delete',
    data:deleteAllEmployee
  })
}

export default employeeApi
