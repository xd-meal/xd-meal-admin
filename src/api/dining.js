import { axios } from '@/utils/request'

const api = {
  list: '/v1/admin/dining/',
  add: '/v1/admin/dining',
  poster: '/v2/admin/poster'
}

export default api

export function getDiningList (startTime, endTime) {
  return axios.get(api.list + startTime + '/' + endTime)
}

export function addDining (dining) {
  return axios.post(api.add, dining)
}

export function deleteDining (diningID) {
  return axios.delete(api.add + '/' + diningID)
}

export function generatePoster (diningID) {
  return axios.get(api.poster + '/' + diningID)
}
