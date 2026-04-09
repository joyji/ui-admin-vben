import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/system',
    name: 'OfflineSystem',
    meta: {
      title: '系统管理',
      icon: 'ant-design:setting-outlined',
    },
    children: [
      {
        path: '/system/user',
        name: 'OfflineSystemUser',
        component: () => import('#/views/system/user/index.vue'),
        meta: {
          title: '用户管理',
        },
      },
      {
        path: '/system/role',
        name: 'OfflineSystemRole',
        component: () => import('#/views/system/role/index.vue'),
        meta: {
          title: '角色管理',
        },
      },
      {
        path: '/system/menu',
        name: 'OfflineSystemMenu',
        component: () => import('#/views/system/menu/index.vue'),
        meta: {
          title: '菜单管理',
        },
      },
      {
        path: '/system/dict/type',
        name: 'OfflineSystemDictType',
        component: () => import('#/views/system/dict/type/index.vue'),
        meta: {
          title: '字典类型',
        },
      },
    ],
  },
  {
    path: '/infra',
    name: 'OfflineInfra',
    meta: {
      title: '基础设施',
      icon: 'ant-design:cloud-server-outlined',
    },
    children: [
      {
        path: '/infra/job',
        name: 'OfflineInfraJob',
        component: () => import('#/views/infra/job/index.vue'),
        meta: {
          title: '定时任务',
        },
      },
      {
        path: '/infra/config',
        name: 'OfflineInfraConfig',
        component: () => import('#/views/infra/config/index.vue'),
        meta: {
          title: '参数配置',
        },
      },
      {
        path: '/infra/file',
        name: 'OfflineInfraFile',
        component: () => import('#/views/infra/file/index.vue'),
        meta: {
          title: '文件管理',
        },
      },
    ],
  },
  {
    path: '/crm',
    name: 'OfflineCrm',
    meta: {
      title: 'CRM',
      icon: 'simple-icons:civicrm',
    },
    children: [
      {
        path: '/crm/customer',
        name: 'OfflineCrmCustomer',
        component: () => import('#/views/crm/customer/index.vue'),
        meta: {
          title: '客户管理',
        },
      },
      {
        path: '/crm/contract',
        name: 'OfflineCrmContract',
        component: () => import('#/views/crm/contract/index.vue'),
        meta: {
          title: '合同管理',
        },
      },
      {
        path: '/crm/business',
        name: 'OfflineCrmBusiness',
        component: () => import('#/views/crm/business/index.vue'),
        meta: {
          title: '商机管理',
        },
      },
    ],
  },
  {
    path: '/mall',
    name: 'OfflineMall',
    meta: {
      title: '商城',
      icon: 'lucide:shopping-bag',
    },
    children: [
      {
        path: '/mall/product/brand',
        name: 'OfflineMallBrand',
        component: () => import('#/views/mall/product/brand/index.vue'),
        meta: {
          title: '商品品牌',
        },
      },
      {
        path: '/mall/product/category',
        name: 'OfflineMallCategory',
        component: () => import('#/views/mall/product/category/index.vue'),
        meta: {
          title: '商品分类',
        },
      },
      {
        path: '/mall/product/spu',
        name: 'OfflineMallSpu',
        component: () => import('#/views/mall/product/spu/index.vue'),
        meta: {
          title: '商品 SPU',
        },
      },
    ],
  },
];

export default routes;
