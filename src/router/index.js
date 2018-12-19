import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import('@/components/index')
const Purchase = () => import('@/components/purchase/purchase')
const Replenish = () => import('@/components/replenish/replenish')
const Payment = () => import('@/components/payment/payment')
const PurchaseList = () => import('@/components/purchase-list/purchase-list')
const PurchaseDetail = () => import('@/components/purchase-detail/purchase-detail')
const IncomeList = () => import('@/components/incomeList/incomeList')
const Commission = () => import('@/components/commission/commission')
const Custom = () => import('@/components/custom/custom')
const CustomList = () => import('@/components/customList/customList')
const CustomOrderList = () => import('@/components/customerOrList/customerOrList')
const OrderDetail = () => import('@/components/orderDetail/orderDetail')
const Delivery = () => import('@/components/delivery/delivery')
const Search = () => import('@/components/search/search')
const OrderList = () => import('@/components/orderList/orderList')
const Express = () => import('@/components/express/express')
const Success = () => import('@/components/success/success')
const My = () => import('@/components/my/my')
const UserInfo = () => import('@/components/userInfo/userInfo')
const BindPhone = () => import('@/components/bindPhone/bindPhone')
const Apply = () => import('@/components/apply/apply')
const Visitor = () => import('@/components/visitor/visitor')
const DeliveryList = () => import('@/components/deliveryList/deliveryList')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '代理商后台',
      component: Index,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/my',
      component: My,
      meta: {
        title: '我的'
      }
    },
    {
      path: '/userInfo',
      component: UserInfo
    },
    {
      path: '/bindPhone',
      component: BindPhone
    },
    {
      path: '/orderList',
      component: OrderList,
      meta: {
        title: '订单'
      }
    },
    {
      path: '/visitor',
      component: Visitor
    },
    {
      path: '/purchase',
      name: '进货',
      component: Purchase,
      meta: {
        title: '进货'
      }
    },
    {
      path: '/replenish',
      name: '补货',
      component: Replenish,
      meta: {
        title: '补货'
      }
    },
    {
      path: '/payment',
      name: '支付',
      component: Payment,
      meta: {
        title: '确认订单'
      }
    },
    {
      path: '/apply',
      component: Apply,
      meta: {
        title: '代理商申请'
      }
    },
    {
      path: '/purchaseList',
      component: PurchaseList,
      meta: {
        title: '充值余额明细列表'
      }
    },
    {
      path: '/purchaseDetail',
      component: PurchaseDetail,
      meta: {
        title: '充值余额明细'
      }
    },
    {
      path: '/deliveryList',
      component: DeliveryList,
      meta: {
        title: '我的发货记录'
      }
    },
    {
      path: '/incomeList',
      component: IncomeList,
      meta: {
        title: '收益明细列表'
      }
    },
    {
      path: '/commission',
      component: Commission,
      meta: {
        title: '总佣金'
      }
    },
    {
      path: '/custom/:userSn',
      component: Custom,
      meta: {
        title: '客户主页'
      }
    },
    {
      path: '/customList',
      component: CustomList,
      meta: {
        title: '客户列表'
      }
    },
    {
      path: '/customOrderList/:userSn',
      component: CustomOrderList,
      meta: {
        title: '客户订单列表'
      }
    },
    {
      path: '/orderDetail/:type/:orderNo',
      component: OrderDetail,
      name: 'orderDetail',
      meta: {
        title: '订单详情'
      },
      children: [
        {
          path: '/orderDetail/express',
          component: Express
        }
      ]
    },
    {
      path: '/delivery',
      component: Delivery,
      meta: {
        title: '查看物流'
      }
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/success',
      component: Success
    }
  ]
})
