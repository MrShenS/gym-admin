import service from '@/utils/request'

// const baseUrl = '/api/admin/posts'

// const baseUrl = 'http://localhost:8099/api'

//Nginx 代理后的地址
const baseUrl = '/api'

const postApi = {}


// postApi.create = (postToCreate, autoSave) => {
//   return service({
//     url: baseUrl,
//     method: 'post',
//     data: postToCreate,
//     mute: autoSave,
//     params: {
//       autoSave: autoSave
//     }
//   })
// }


postApi.register = (bsurl,postToCreate) => {
    return service({
      url: `${baseUrl}/register`,
      method: 'post',
      data: postToCreate,
    })
  }


  postApi.login = (LoginParam) => {
    return service({
      url: `${baseUrl}/login`,
      method: 'post',
      data: LoginParam,
    })
  }

export default postApi
