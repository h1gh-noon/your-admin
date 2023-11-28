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
    // meta: {
    //   title: '主页',
    //   icon: 'server'
    // },
    children: [
      {
        path: 'home',
        name: 'home-view',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          title: '首页',
          icon: 'server'
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: Layout,
    children: [
      {
        path: 'userTable',
        name: 'user-table',
        component: () => import('@/views/user/UserTable.vue'),
        meta: {
          title: '用户管理',
          keepAlive: true,
          icon: 'db'
        }
      }
    ]
  },
  {
    path: '/shop',
    name: 'shop',
    component: Layout,
    meta: {
      title: '店铺管理',
      icon: 'server'
    },
    children: [
      {
        path: 'shopCategoryTable',
        name: 'shop-category',
        component: () => import('@/views/shop/ShopCategory.vue'),
        meta: {
          title: '店铺分类',
          icon: 'db'
        }
      },
      {
        path: 'shopTable',
        name: 'shop-table',
        component: () => import('@/views/shop/ShopTable.vue'),
        meta: {
          title: '店铺',
          keepAlive: true,
          icon: 'db'
        }
      }
    ]
  },
  {
    path: '/product',
    name: 'product',
    component: Layout,
    meta: {
      title: '商品管理',
      icon: 'server'
    },
    children: [
      {
        path: 'productCategoryTable',
        name: 'product-category',
        component: () => import('@/views/product/ProductCategory.vue'),
        meta: {
          title: '商品分类',
          icon: 'db'
        }
      },
      {
        path: 'productTable',
        name: 'product-table',
        component: () => import('@/views/product/ProductTable.vue'),
        meta: {
          title: '商品',
          keepAlive: true,
          icon: 'db'
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
        props: {
          echartsId: 'echarts-2'
        },
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
          title: '缓存页面',
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
