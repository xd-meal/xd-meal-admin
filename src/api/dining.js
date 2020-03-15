import { axios } from '@/utils/request'

const api = {
  list: '/admin/dining/'
}

export default api

export function getDiningList (startTime, endTime) {
  return axios({
    url: api.list + startTime + '/' + endTime,
    method: 'get'
  })
}
