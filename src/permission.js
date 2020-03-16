// import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
const defaultRoutePath = '/dashboard/workplace'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if (document.cookie.includes('XD-MEAL-SESSION')) {
    /* has token */
    if (to.path === '/user/login') {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      if (!store.getters.role) {
        store
          .dispatch('GetInfo')
          .then(res => {
            const role = res && res.role
            store.dispatch('GenerateRoutes', role).then(() => {
              // 根据roles权限生成可访问的路由表
              // 动态添加可访问路由表
              if (role < 1) {
                notification.error({
                  message: '错误',
                  description: '无权访问，即将返回首页'
                })
                setTimeout(() => {
                  window.location = '/'
                }, 1500)
                return
              }
              store.dispatch('FetchDishList')
              router.addRoutes(store.getters.addRouters)
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，即将返回登录界面'
            })
            setTimeout(() => {
              window.location = '/'
            }, 1500)
            // store.dispatch('Logout').then(() => {
            //
            //   // next({ path: '/user/login', query: { redirect: to.fullPath } })
            // })
          })
      } else {
        next()
      }
    }
  } else {
    window.location = '/'
    // if (whiteList.includes(to.name)) {
    //   // 在免登录白名单，直接进入
    //   next()
    // } else {
    // next({ path: '/', query: { redirect: to.fullPath } })
    // NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    // }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
