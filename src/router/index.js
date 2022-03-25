import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/users/Users.vue'
// import Test from '../components/users/test.vue'
import OpenStack from '../components/virtual/OpenStack.vue'
import VirtualResource from '../components/fzResource/VirtualResource.vue'
import FzMirrors from '../components/fzResource/FzMirrors.vue'
import FzModels from '../components/fzResource/FzModels.vue'
import FzSoft from '../components/fzResource/FzSoft.vue'
import FzData from '../components/fzResource/FzData.vue'
import FzTaskCreate from '../components/fzTask/FzTaskCreate.vue'
import FzTaskMonitor from '../components/fzTask/FzTaskMonitor.vue'
import MicroServiceList from '../components/microService/MicroServiceList.vue'
import MicroServiceData from '../components/microService/MicroServiceData.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    // login地址路由到Login组件
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    // 重定向
    redirect: '/welcome',
    // 子路由
    children: [
      { 
        path: '/welcome', 
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      // {
      //   path: '/test',
      //   component: Test
      // },
      {
        path: '/openStack',
        component: OpenStack
      },
      {
        path: '/fzVirtual',
        component: VirtualResource
      },
      {
        path: '/fzMirrors',
        component: FzMirrors
      },
      {
        path: '/fzModels',
        component: FzModels
      },
      {
        path: '/fzSoft',
        component: FzSoft
      },
      {
        path: '/fzData',
        component: FzData
      },
      {
        path: '/fzTaskCreate',
        component: FzTaskCreate
      },
      {
        path: '/fzTaskMonitor',
        component: FzTaskMonitor
      },
      {
        path: '/microServiceList',
        component: MicroServiceList
      },
      {
        path: '/microServiceData',
        component: MicroServiceData
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to,from,next) => {
  if(to.path == '/login') return next()
  //获取token,这里由于登录失败没有token，因此暂且不适用
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})

build: {
  
}


export default router
