import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Purchase from '@/components/purchase/purchase'
import Replenish from '@/components/replenish/replenish'
import Payment from '@/components/payment/payment'
import PurchaseList from '@/components/purchase-list/purchase-list'
import PurchaseDetail from '@/components/purchase-detail/purchase-detail'
import IncomeList from '@/components/incomeList/incomeList'
import Commission from '@/components/commission/commission'
import Custom from '@/components/custom/custom'
import CustomList from '@/components/customList/customList'
import CustomOrderList from '@/components/customerOrList/customerOrList'
import OrderDetail from '@/components/orderDetail/orderDetail'
import Delivery from '@/components/delivery/delivery'
import Search from '@/components/search/search'
import OrderList from '@/components/orderList/orderList'
import Express from '@/components/express/express'
import Success from '@/components/success/success'
import My from '@/components/my/my'
import UserInfo from '@/components/userInfo/userInfo'
import BindPhone from '@/components/bindPhone/bindPhone'
import Apply from '@/components/apply/apply'
import Visitor from '@/components/visitor/visitor'
import DeliveryList from '@/components/deliveryList/deliveryList'
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
