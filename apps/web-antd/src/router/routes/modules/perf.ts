import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/infra/perf/tab-form-linkage',
    name: 'InfraPerfTabFormLinkage',
    component: () => import('#/views/infra/perf/tab-form-linkage/index.vue'),
    meta: {
      title: '性能压测-Tab表单联动',
      icon: 'lucide:gauge',
      keepAlive: false,
    },
  },
];

export default routes;
