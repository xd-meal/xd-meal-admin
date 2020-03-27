import xlsx from 'xlsx'
export default {
  vm: {},
  // eslint-disable-next-line no-unused-vars
  install (Vue) {
    if (this.installed) {
      return
    }
    this.installed = true

    Vue.xlsx = xlsx

    Object.defineProperties(Vue.prototype, {
      $xlsx: {
        get: function get () {
          return xlsx
        }
      }
    })
  }
}
