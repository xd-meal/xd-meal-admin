const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  role: state => state.user.role,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  dishList: state => state.dish.list,
  diningList: state => state.dining.list,
  diningListArray: state => Object.values(state.dining.list)
}

export default getters
