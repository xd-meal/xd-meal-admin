import { axios } from '@/utils/request'

const api = {
  list: '/admin/dining/',
  add: '/admin/dining'
}

export default api

export function getDiningList (startTime, endTime) {
  return axios({
    url: api.list + startTime + '/' + endTime,
    method: 'get'
  })
}

export function addDining (dining) {
  return axios.post(api.add, dining)
}
