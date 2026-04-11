import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // ─── 基础组件 Demo ───
  {
    path: '/ui-kit',
    name: 'UiKit',
    meta: {
      title: '基础组件',
      icon: 'ant-design:appstore-outlined',
    },
    children: [
      {
        path: '/ui-kit/index',
        name: 'UiKitIndex',
        component: () => import('#/views/ui-kit/index.vue'),
        meta: {
          title: '组件分类导航',
          icon: 'ant-design:home-outlined',
          affixTab: false,
        },
      },
      {
        path: '/ui-kit/button',
        name: 'UiKitButton',
        component: () => import('#/views/ui-kit/button/index.vue'),
        meta: { title: '按钮类组件', icon: 'ant-design:interaction-outlined' },
      },
      {
        path: '/ui-kit/form-input',
        name: 'UiKitFormInput',
        component: () => import('#/views/ui-kit/form-input/index.vue'),
        meta: { title: '文本录入类', icon: 'ant-design:edit-outlined' },
      },
      {
        path: '/ui-kit/form-select',
        name: 'UiKitFormSelect',
        component: () => import('#/views/ui-kit/form-select/index.vue'),
        meta: { title: '选择类组件', icon: 'ant-design:unordered-list-outlined' },
      },
      {
        path: '/ui-kit/datetime',
        name: 'UiKitDatetime',
        component: () => import('#/views/ui-kit/datetime/index.vue'),
        meta: { title: '时间类组件', icon: 'ant-design:calendar-outlined' },
      },
      {
        path: '/ui-kit/table',
        name: 'UiKitTable',
        component: () => import('#/views/ui-kit/table/index.vue'),
        meta: { title: '表格类组件', icon: 'ant-design:table-outlined' },
      },
      {
        path: '/ui-kit/dialog',
        name: 'UiKitDialog',
        component: () => import('#/views/ui-kit/dialog/index.vue'),
        meta: { title: '弹窗/反馈类', icon: 'ant-design:message-outlined' },
      },
      {
        path: '/ui-kit/tree',
        name: 'UiKitTree',
        component: () => import('#/views/ui-kit/tree/index.vue'),
        meta: { title: '树组件', icon: 'ant-design:apartment-outlined' },
      },
      {
        path: '/ui-kit/upload',
        name: 'UiKitUpload',
        component: () => import('#/views/ui-kit/upload/index.vue'),
        meta: { title: '上传/下载', icon: 'ant-design:upload-outlined' },
      },
      {
        path: '/ui-kit/layout',
        name: 'UiKitLayout',
        component: () => import('#/views/ui-kit/layout/index.vue'),
        meta: { title: '布局类组件', icon: 'ant-design:layout-outlined' },
      },
      {
        path: '/ui-kit/feedback',
        name: 'UiKitFeedback',
        component: () => import('#/views/ui-kit/feedback/index.vue'),
        meta: { title: '反馈/展示类', icon: 'ant-design:bell-outlined' },
      },
    ],
  },
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
        component: () => import('#/views/system/dict/index.vue'),
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
      {
        path: '/infra/perf/tab-form-linkage',
        name: 'OfflineInfraPerfTabFormLinkage',
        component: () => import('#/views/infra/perf/tab-form-linkage/index.vue'),
        meta: {
          title: '联动压测页',
        },
      },
      {
        path: '/infra/demo/form-example',
        name: 'OfflineFormExample',
        component: () => import('#/views/infra/demo/form-example/index.vue'),
        meta: {
          title: '表单设计示例',
          icon: 'ant-design:form-outlined',
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
