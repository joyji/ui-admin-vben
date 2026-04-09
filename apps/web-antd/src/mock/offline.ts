import type { AuthPermissionInfo } from '@vben/types';

import type { AuthApi } from '#/api';

import { accessRoutes } from '#/router/routes';

type OfflineMockResponse<T = any> = {
  code: number;
  data: T;
  msg: string;
};

const OFFLINE_TOKEN = 'offline-mock-access-token';
const OFFLINE_REFRESH_TOKEN = 'offline-mock-refresh-token';
const now = new Date().toISOString();

const demoUserList = [
  {
    id: 1,
    username: 'admin',
    nickname: '管理员',
    deptId: 1,
    deptName: '总经办',
    email: 'admin@example.com',
    mobile: '13800000000',
    status: 0,
    createTime: now,
  },
];

const demoRoleList = [
  {
    id: 1,
    name: '超级管理员',
    code: 'super_admin',
    sort: 1,
    status: 0,
    createTime: now,
  },
];

const demoDeptList = [
  {
    id: 1,
    name: '总经办',
    parentId: 0,
  },
];

const demoDictTypeList = [
  {
    id: 1,
    name: '用户状态',
    type: 'common_status',
    status: 0,
    remark: '离线演示字典',
    createTime: now,
  },
];

const demoDictDataList = [
  {
    id: 1,
    dictType: 'common_status',
    label: '开启',
    value: '0',
    status: 0,
    sort: 1,
  },
  {
    id: 2,
    dictType: 'common_status',
    label: '关闭',
    value: '1',
    status: 0,
    sort: 2,
  },
];

const demoTenantList = [
  {
    id: 1,
    name: '默认租户',
    contactName: '管理员',
    status: 0,
    createTime: now,
  },
];

const demoJobList = [
  {
    id: 1,
    name: '离线演示任务',
    status: 1,
    invokeTarget: 'demoTask.run',
    cronExpression: '0/30 * * * * ?',
    createTime: now,
  },
];

const demoConfigList = [
  {
    id: 1,
    category: 'sys',
    name: '系统名称',
    key: 'sys.name',
    value: '离线演示系统',
    type: true,
    createTime: now,
  },
];

const demoFileList = [
  {
    id: 1,
    name: 'offline-demo.txt',
    path: '/offline-demo.txt',
    size: 1024,
    type: 'txt',
    createTime: now,
  },
];

const demoCustomerList = [
  {
    id: 1,
    name: '离线演示客户',
    mobile: '13900000000',
    industryId: 1,
    level: 1,
    ownerUserName: '管理员',
    createTime: now,
  },
];

const demoContractList = [
  {
    id: 1,
    no: 'HT20260001',
    name: '离线演示合同',
    customerName: '离线演示客户',
    totalPrice: 10000,
    auditStatus: 20,
    createTime: now,
  },
];

const demoBusinessList = [
  {
    id: 1,
    name: '离线演示商机',
    customerName: '离线演示客户',
    statusTypeId: 1,
    statusId: 1,
    price: 20000,
    createTime: now,
  },
];

const demoUserProfile = {
  dept: {
    id: 1,
    name: '总经办',
  },
  postIds: [1],
  posts: [
    {
      id: 1,
      name: '系统管理员',
    },
  ],
  roles: [
    {
      id: 1,
      name: '超级管理员',
    },
  ],
  user: {
    avatar: '',
    createTime: now,
    deptId: 1,
    email: 'admin@example.com',
    id: 1,
    mobile: '13800000000',
    nickname: '离线演示账号',
    sex: 1,
    status: 0,
    username: 'admin',
  },
};

const offlineUser: AuthPermissionInfo['user'] = {
  avatar: '',
  homePath: '/analytics',
  nickname: '离线演示账号',
  realName: '离线演示账号',
  userId: 'offline-user',
  username: 'offline-admin',
};

function ok<T>(data: T): OfflineMockResponse<T> {
  return {
    code: 0,
    data,
    msg: 'ok',
  };
}

function buildPageResult() {
  return {
    list: [],
    total: 0,
  };
}

function isCommonReadEndpoint(method: string, url: string) {
  if (method !== 'GET') {
    return false;
  }
  return (
    url.endsWith('/page') ||
    url.endsWith('/list') ||
    url.endsWith('/get') ||
    url.endsWith('/get-page')
  );
}

function isCommonWriteEndpoint(method: string, url: string) {
  if (method === 'POST') {
    return /\/(create|save|add|submit)$/.test(url);
  }
  if (method === 'PUT') {
    return /\/(update|edit)$/.test(url);
  }
  if (method === 'DELETE') {
    return /\/(delete|remove|batch-delete|delete-list)$/.test(url);
  }
  return false;
}

function getPermissionInfo(): AuthPermissionInfo {
  return {
    menus: accessRoutes as any,
    permissions: ['*:*:*'],
    roles: ['super_admin'],
    user: offlineUser,
  };
}

function mockLogin(): AuthApi.LoginResult {
  return {
    accessToken: OFFLINE_TOKEN,
    expiresTime: Date.now() + 2 * 60 * 60 * 1000,
    refreshToken: OFFLINE_REFRESH_TOKEN,
    userId: 1,
  };
}

function mockCaptcha() {
  return {
    backgroundImage: '',
    secretKey: 'offline-captcha-secret',
    slidingImage: '',
  };
}

function mockCaptchaCheck() {
  return true;
}

function mockTenantSimpleList(): AuthApi.TenantResult[] {
  return [
    {
      id: 1,
      name: '默认租户',
    },
  ];
}

function mockGetTenantByWebsite(): AuthApi.TenantResult {
  return {
    id: 1,
    name: '默认租户',
  };
}

function mockRefreshToken() {
  return {
    accessToken: OFFLINE_TOKEN,
    expiresTime: Date.now() + 2 * 60 * 60 * 1000,
    refreshToken: OFFLINE_REFRESH_TOKEN,
    userId: 1,
  };
}

const offlineHandlers: Record<string, () => OfflineMockResponse<any>> = {
  'GET /system/dict-data/page': () => ok({ list: demoDictDataList, total: 2 }),
  'GET /system/dict-data/simple-list': () => ok(demoDictDataList),
  'GET /system/dict-type/page': () => ok({ list: demoDictTypeList, total: 1 }),
  'GET /system/dict-type/list-all-simple': () => ok(demoDictTypeList),
  'GET /system/auth/get-permission-info': () => ok(getPermissionInfo()),
  'GET /system/user/profile/get': () => ok(demoUserProfile),
  'GET /system/area/tree': () => ok([]),
  'GET /system/dept/list': () => ok(demoDeptList),
  'GET /system/dept/simple-list': () => ok(demoDeptList),
  'GET /system/menu/list': () => ok(getPermissionInfo().menus),
  'GET /system/menu/simple-list': () => ok(getPermissionInfo().menus),
  'GET /system/role/page': () => ok({ list: demoRoleList, total: 1 }),
  'GET /system/role/simple-list': () => ok(demoRoleList),
  'GET /system/tenant/get-by-website': () => ok(mockGetTenantByWebsite()),
  'GET /system/tenant/simple-list': () => ok(mockTenantSimpleList()),
  'GET /system/tenant/page': () => ok({ list: demoTenantList, total: 1 }),
  'GET /system/user/page': () => ok({ list: demoUserList, total: 1 }),
  'GET /system/user/simple-list': () => ok(demoUserList),
  'GET /infra/job/page': () => ok({ list: demoJobList, total: 1 }),
  'GET /infra/job-log/page': () => ok({ list: [], total: 0 }),
  'GET /infra/file/page': () => ok({ list: demoFileList, total: 1 }),
  'GET /infra/config/page': () => ok({ list: demoConfigList, total: 1 }),
  'GET /infra/data-source-config/list': () => ok([]),
  'GET /infra/file-config/page': () => ok({ list: [], total: 0 }),
  'GET /infra/api-access-log/page': () => ok({ list: [], total: 0 }),
  'GET /infra/api-error-log/page': () => ok({ list: [], total: 0 }),
  'GET /crm/business/page': () => ok({ list: demoBusinessList, total: 1 }),
  'GET /crm/business/simple-all-list': () => ok(demoBusinessList),
  'GET /crm/contract/page': () => ok({ list: demoContractList, total: 1 }),
  'GET /crm/contract/simple-list': () => ok(demoContractList),
  'GET /crm/customer/page': () => ok({ list: demoCustomerList, total: 1 }),
  'GET /crm/customer/simple-list': () => ok(demoCustomerList),
  'GET /crm/contact/page': () => ok({ list: [], total: 0 }),
  'GET /crm/product/page': () => ok({ list: [], total: 0 }),
  'GET /crm/product/simple-list': () => ok([]),
  'GET /crm/receivable/page': () => ok({ list: [], total: 0 }),
  'GET /crm/receivable-plan/page': () => ok({ list: [], total: 0 }),
  'GET /crm/receivable-plan/simple-list': () => ok([]),
  'GET /crm/follow-up-record/page': () => ok({ list: [], total: 0 }),
  'GET /system/notify-message/get-unread-list': () => ok([]),
  'GET /system/notify-message/get-unread-count': () => ok(0),
  'GET /system/permission/list-role-menus': () => ok([1]),
  'GET /system/permission/list-user-roles': () => ok([1]),
  'POST /system/auth/login': () => ok(mockLogin()),
  'POST /system/auth/logout': () => ok(true),
  'POST /system/auth/refresh-token': () => ok(mockRefreshToken()),
  'POST /system/captcha/check': () => ok(mockCaptchaCheck()),
  'POST /system/captcha/get': () => ok(mockCaptcha()),
};

function normalizeUrl(url: string) {
  return url.split('?')[0] ?? url;
}

function buildRouteKey(method: string, url: string) {
  return `${method.toUpperCase()} ${normalizeUrl(url)}`;
}

function resolveOfflineMock(
  method: string,
  url: string,
): null | OfflineMockResponse<any> {
  const normalizedMethod = method.toUpperCase();
  const normalizedUrl = normalizeUrl(url);
  const queryKey = buildRouteKey(
    normalizedMethod,
    `${normalizedUrl}${url.includes('?') ? url.slice(url.indexOf('?')) : ''}`,
  );
  const queryHandler = offlineHandlers[queryKey];
  if (queryHandler) {
    return queryHandler();
  }
  const key = `${normalizedMethod} ${normalizedUrl}`;
  const handler = offlineHandlers[key];
  if (handler) {
    return handler();
  }
  // 高频基础查询兜底：simple-list/list-all-simple 默认返回空数组
  if (
    normalizedMethod === 'GET' &&
    (normalizedUrl.endsWith('/simple-list') ||
      normalizedUrl.endsWith('/list-all-simple'))
  ) {
    return ok([]);
  }
  // 通用统计类兜底：count数量接口
  if (
    normalizedMethod === 'GET' &&
    /\/(count|remind-count|audit-count|follow-count|get-unread-count)$/.test(
      normalizedUrl,
    )
  ) {
    return ok(0);
  }
  // 通用树形兜底：tree接口
  if (normalizedMethod === 'GET' && normalizedUrl.endsWith('/tree')) {
    return ok([]);
  }
  // 通用扩展查询兜底：get-by-*、list-by-*
  if (
    normalizedMethod === 'GET' &&
    (normalizedUrl.includes('/get-by-') || normalizedUrl.includes('/list-by-'))
  ) {
    return ok([]);
  }
  // 高频列表查询兜底：分页、列表、详情查询
  if (isCommonReadEndpoint(normalizedMethod, normalizedUrl)) {
    if (normalizedUrl.endsWith('/get')) {
      return ok({});
    }
    return ok(buildPageResult());
  }
  // 高频写接口兜底：新增、更新、删除返回成功
  if (isCommonWriteEndpoint(normalizedMethod, normalizedUrl)) {
    return ok(true);
  }
  return null;
}

function buildUnmockedOfflineError(method: string, url: string) {
  return {
    code: 501,
    error: `离线模式未mock接口: ${method.toUpperCase()} ${normalizeUrl(url)}`,
    msg: 'offline mock not implemented',
  };
}

function shouldUseOfflineMock() {
  return (
    import.meta.env.DEV &&
    String(import.meta.env.VITE_OFFLINE_MOCK).toLowerCase() === 'true'
  );
}

export { buildUnmockedOfflineError, resolveOfflineMock, shouldUseOfflineMock };
