import { axios } from '@/utils/request'

const api = {
  diningByTime: '/report/order_count/',
  countByTime: '/report/user_count/',
  personByTime: '/report/person_detail/'
}

export default api

export function statDiningByTime (startTime, endTime) {
  return axios({
    url: api.diningByTime + startTime + '/' + endTime,
    method: 'get'
  })
}

export function statCountByTime (startTime, endTime) {
  return axios({
    url: api.countByTime + startTime + '/' + endTime,
    method: 'get'
  })
}

export function statPersonByTime (startTime, endTime) {
  return axios({
    url: api.personByTime + startTime + '/' + endTime,
    method: 'get'
  })
}
