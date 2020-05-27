import service from '@/utils/request'

// const baseUrl = '/api/admin/posts'

// const baseUrl = 'http://localhost:8099/api/activity'
//Nginx 代理后的地址
const baseUrl = '/api/activity'

const activityApi = {}


activityApi.saveActivity = (activity) => {
    return service({
      url: `${baseUrl}`,
      method: 'post',
      data: activity,
    })
  }




  activityApi.getActivityByParam = (Param) => {
    return service({
      url: `${baseUrl}/ByParam`,
      method: 'post',
      data: Param,
    })
  }


  activityApi.updateActivity = (activity) => {
    return service({
      url: `${baseUrl}`,
      method: 'put',
      data: activity,
    })
  }

  activityApi.deleteActivity = (activity) => {
    return service({
      url: `${baseUrl}`,
      method: 'delete',
      data: activity,
    })
  }


  activityApi.getAllActivity = (activity) => {
    return service({
      url: `${baseUrl}`,
      method: 'get',
    })
  }


  activityApi.getAllActivityOfStatus = () => {
    return service({
      url: `${baseUrl}/UpdateStatus`,
      method: 'get',
    })
  }


  activityApi.updateAllActivityOfStatus = (activityList) => {
    return service({
      url: `${baseUrl}/UpdateStatus`,
      method: 'put',
      data: activityList,
    })
  }





//获取首页活动信息
activityApi.getActivity = () => {
  return service({
    url: `${baseUrl}/OfDashboard`,
    method: 'get'
  })
}

export default activityApi
