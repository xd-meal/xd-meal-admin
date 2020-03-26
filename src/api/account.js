import { axios } from '@/utils/request'

const api = {
  list: '/admin/users',
  add: '/admin/user/list'
}

export default api

export function getUserList () {
  return axios({
    url: api.list,
    method: 'get'
  })
}

export function addUsers (users) {
  return axios.post(api.add, users)
}
