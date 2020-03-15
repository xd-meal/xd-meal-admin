// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard',
    children: [
      // dashboard
      {
        // path: '/dashboard',
        name: 'dashboard',
        // redirect: '/dashboard/workplace',
        path: '/dashboard',
        // component: RouteView,
        component: () => import('@/views/dashboard/Workplace'),
        meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, role: [1, 2] }
        // children: [
        //   // 外部链接
        //   // {
        //   //   path: 'https://www.baidu.com/',
        //   //   name: 'Monitor',
        //   //   meta: { title: '监控页（外部）', target: '_blank' }
        //   // },
        //   {
        //     path: '/dashboard/workplace',
        //     name: 'Workplace',
        //     component: () => import('@/views/dashboard/Workplace'),
        //     meta: { title: '工作台', keepAlive: true, role: [1, 2] }
        //   }
        // ]
      },

      {
        path: '/dining',
        redirect: '/dining/add',
        component: RouteView,
        meta: { title: '餐次管理', icon: 'bars', role: [1, 2] },
        children: [
          {
            path: '/dining/add',
            name: 'AddDining',
            component: () => import('@/views/form/BasicForm'),
            meta: { title: '添加餐次', keepAlive: false, role: [2] }
          },
          {
            path: '/dining/list',
            name: 'DiningList',
            component: () => import('@/views/dining/List'),
            meta: { title: '餐次列表', keepAlive: true, role: [1, 2] }
          },
          {
            path: '/dining/detail',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '餐次详情', keepAlive: true, role: [1, 2] }
          }
        ]
      },

      {
        path: '/dish',
        name: 'dish',
        component: () => import('@/views/dish/List'),
        meta: { title: '菜品管理', icon: 'bell', role: [2] }
      },

      {
        path: '/stats',
        name: 'stats',
        component: RouteView,
        redirect: '/stats/dining',
        meta: { title: '统计报表', icon: 'file-text', role: [1, 2] },
        children: [
          {
            path: '/stats/dining',
            name: 'StatsDining',
            component: () => import('@/views/profile/basic/Index'),
            meta: { title: '逐餐次统计', role: [1, 2] }
          },
          {
            path: '/stats/multi',
            name: 'StatsMulti',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: '多餐次合并统计', role: [1, 2] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '帐号管理', icon: 'user', keepAlive: true, role: [1, 2] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '帐号列表', keepAlive: true, role: [1, 2] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, role: [1, 2] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', role: [1, 2] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', keepAlive: true, role: [1, 2] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', keepAlive: true, role: [1, 2] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', keepAlive: true, role: [1, 2] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', keepAlive: true, role: [1, 2] }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
