import { axios } from '@/utils/request'

const api = {
  list: '/admin/dish/list'
}

export default api

export function getDishList () {
  return axios({
    url: api.list,
    method: 'get'
  })
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
