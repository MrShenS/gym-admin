import service from '@/utils/request'

// const baseUrl = '/api/admin/posts'

// const baseUrl = 'http://localhost:8099/api/File'



//Nginx 代理后的地址
const baseUrl = '/api/File'

const fileApi = {}


fileApi.savefile = (file) => {
    return service({
      url: `${baseUrl}`,
      method: 'post',
      data: file,
    })
  }




  fileApi.getfileByParam = (Param) => {
    return service({
      url: `${baseUrl}/ByParam`,
      method: 'post',
      data: Param,
    })
  }


  fileApi.updatefile = (file) => {
    return service({
      url: `${baseUrl}`,
      method: 'put',
      data: file,
    })
  }

  fileApi.deletefile = (file) => {
    return service({
      url: `${baseUrl}`,
      method: 'delete',
      data: file,
    })
  }


  fileApi.getAllfile = () => {
    return service({
      url: `${baseUrl}/getAllFileName`,
      method: 'get',
    })
  }



  
  fileApi.getfile = (fileName) => {
    return service({
      url: `${baseUrl}/downloadTemplate`,
      method: 'post',
      params:{
        "fileName":fileName
      }
    })
  }



  fileApi.getAllfileOfStatus = () => {
    return service({
      url: `${baseUrl}/UpdateStatus`,
      method: 'get',
    })
  }


export default fileApi
