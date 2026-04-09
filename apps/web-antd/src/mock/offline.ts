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
  'GET /system/dict-data/simple-list': () => ok([]),
  'GET /system/dict-type/list-all-simple': () => ok([]),
  'GET /system/auth/get-permission-info': () => ok(getPermissionInfo()),
  'GET /system/tenant/get-by-website': () => ok(mockGetTenantByWebsite()),
  'GET /system/tenant/simple-list': () => ok(mockTenantSimpleList()),
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
