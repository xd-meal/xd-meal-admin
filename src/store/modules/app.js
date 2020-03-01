const app = {
  state: {
    sidebar: true,
    device: 'desktop',
    theme: 'light',
    layout: 'sidemenu',
    contentWidth: 'Fluid',
    fixedHeader: false,
    fixSiderbar: true,
    autoHideHeader: false,
    color: '#FF6600',
    weak: false
  },
  mutations: {
    SET_SIDEBAR_TYPE: (state, type) => {
    },
    CLOSE_SIDEBAR: (state) => {
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    TOGGLE_THEME: (state, theme) => {
    },
    TOGGLE_LAYOUT_MODE: (state, layout) => {
    },
    TOGGLE_FIXED_HEADER: (state, fixed) => {
    },
    TOGGLE_FIXED_SIDERBAR: (state, fixed) => {
    },
    TOGGLE_FIXED_HEADER_HIDDEN: (state, show) => {
    },
    TOGGLE_CONTENT_WIDTH: (state, type) => {
    },
    TOGGLE_COLOR: (state, color) => {
    },
    TOGGLE_WEAK: (state, flag) => {
    }
  },
  actions: {
    setSidebar ({ commit }, type) {
    },
    CloseSidebar ({ commit }) {
    },
    ToggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    ToggleTheme ({ commit }, theme) {
    },
    ToggleLayoutMode ({ commit }, mode) {
    },
    ToggleFixedHeader ({ commit }, fixedHeader) {
    },
    ToggleFixSiderbar ({ commit }, fixSiderbar) {
    },
    ToggleFixedHeaderHidden ({ commit }, show) {
    },
    ToggleContentWidth ({ commit }, type) {
    },
    ToggleColor ({ commit }, color) {
    },
    ToggleWeak ({ commit }, weakFlag) {
    }
  }
}

export default app
