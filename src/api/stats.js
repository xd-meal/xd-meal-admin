import { axios } from '@/utils/request'

const api = {
  diningByTime: '/v1/report/order_count/',
  countByTime: '/v1/report/user_count/',
  personByTime: '/v1/report/person_detail/'
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

export function statPersonByTime (corp, startTime, endTime) {
  return axios({
    url: api.personByTime + corp + '/' + startTime + '/' + endTime,
    method: 'get'
  })
}
