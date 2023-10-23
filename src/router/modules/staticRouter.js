import { LOGIN_URL } from '@/common/config'
const Layout = () => import('@/components/layouts/LayoutIndex.vue')
/**
 * staticRouter (静态路由)
 */
export const staticRouter = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    name: 'root',
    component: Layout,
    meta: {
      title: '主页',
      icon: 'server'
    },
    children: [
      {
        path: 'home',
        name: 'home-view',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          title: '首页',
          // icon: 'db'
        }
      },
      {
        path: 'hello',
        name: 'hello-world',
        component: () => import('@/components/HelloWorld.vue'),
        meta: {
          title: '缓存组件',
          keepAlive: true,
          // icon: 'db'
        }
      }
    ]
  },
  {
    path: '/table',
    name: 'table',
    component: Layout,
    meta: {
      title: '表格组件',
      icon: 'server'
    },
    children: [
      {
        path: 'tabledemo',
        name: 'table-demo',
        component: () => import('@/views/TableDemo.vue'),
        meta: {
          title: '表格demo',
          // icon: 'db'
        }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    name: 'test',
    meta: {
      title: 'test',
      icon: 'db'
    },
    children: [
      {
        path: 'thome',
        name: 'thome',
        component: () =>
          import('@/views/HomeView.vue').then(res => ({
            ...res.default,
            name: 'TestHomeView'
          })),
        meta: {
          title: '首页(缓存页面)',
          keepAlive: true
          // icon: 'server'
        }
      },
      {
        path: 'thello',
        name: 'thello',
        component: () => import('@/components/HelloWorld.vue'),
        meta: {
          title: '缓存组件',
          keepAlive: true
          // icon: 'server'
        }
      }
    ]
  },
  {
    path: LOGIN_URL,
    name: 'login',
    component: () => import('@/components/LoginPage.vue'),
    hidden: true,
    meta: {
      title: '登录',
      icon: 'server'
    }
  }
]

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/components/errorPage/403.vue'),
    meta: {
      title: '403页面'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/components/errorPage/404.vue')
  }
]
