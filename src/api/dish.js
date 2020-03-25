import { axios } from '@/utils/request'

const api = {
  list: '/admin/dish/list',
  add: '/admin/dish'
}

export default api

export function getDishList () {
  return axios({
    url: api.list,
    method: 'get'
  })
}

export function addDish (dish) {
  return axios.post(api.add, dish)
}

// id == 0 add     post
// id != 0 update  put
// export function saveService (parameter) {
//   return axios({
//     url: api.service,
//     method: parameter.id === 0 ? 'post' : 'put',
//     data: parameter
//   })
// }
