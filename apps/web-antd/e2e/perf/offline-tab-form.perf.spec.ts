import { expect, test } from '@playwright/test';

const APP_URL = process.env.PERF_BASE_URL ?? 'http://127.0.0.1:5666';
const LARGE_TEXT = 'x'.repeat(5000);

type PerfMetric = {
  action: string;
  elapsedMs: number;
  target?: string;
};

async function markStep<T>(
  metrics: PerfMetric[],
  action: string,
  fn: () => Promise<T>,
  target?: string,
): Promise<T> {
  const start = Date.now();
  const result = await fn();
  metrics.push({ action, elapsedMs: Date.now() - start, target });
  return result;
}

async function login(page: Parameters<typeof test>[0]['page']) {
  await page.goto(`${APP_URL}/#/auth/login`);
  await page.getByRole('button', { name: '登录' }).click();
  await expect(page).toHaveURL(/\/analytics/);
}

async function openByHash(
  page: Parameters<typeof test>[0]['page'],
  metrics: PerfMetric[],
  hashPath: string,
) {
  await markStep(
    metrics,
    'open-route',
    async () => {
      await page.goto(`${APP_URL}/#${hashPath}`);
      await page.waitForLoadState('networkidle');
    },
    hashPath,
  );
}

async function switchTab(
  page: Parameters<typeof test>[0]['page'],
  metrics: PerfMetric[],
  name: string,
) {
  await markStep(
    metrics,
    'switch-tab',
    async () => {
      await page.getByRole('tab', { name, exact: false }).click();
      await page.waitForTimeout(80);
    },
    name,
  );
}

async function fillUserSearchForm(
  page: Parameters<typeof test>[0]['page'],
  metrics: PerfMetric[],
  times: number,
) {
  await openByHash(page, metrics, '/system/user');
  const usernameInput = page.getByPlaceholder('请输入用户名称').first();
  const mobileInput = page.getByPlaceholder('请输入手机号码').first();
  await expect(usernameInput).toBeVisible();
  await expect(mobileInput).toBeVisible();

  for (let i = 0; i < times; i++) {
    await markStep(metrics, 'fill-field', async () => {
      await usernameInput.fill(`perf-user-${i}-${LARGE_TEXT.slice(0, 120)}`);
    }, 'system-user.username');

    await markStep(metrics, 'fill-field', async () => {
      await mobileInput.fill(`${13000000000 + i}`);
    }, 'system-user.mobile');
  }
}

async function writeReport(
  page: Parameters<typeof test>[0]['page'],
  metrics: PerfMetric[],
  scenario: string,
) {
  const sum = metrics.reduce((acc, item) => acc + item.elapsedMs, 0);
  const p95 = [...metrics]
    .map((m) => m.elapsedMs)
    .sort((a, b) => a - b)[Math.max(0, Math.floor(metrics.length * 0.95) - 1)];
  const payload = {
    generatedAt: new Date().toISOString(),
    scenario,
    baseUrl: APP_URL,
    totalActions: metrics.length,
    totalElapsedMs: sum,
    p95ElapsedMs: p95 ?? 0,
    metrics,
  };
  await test.info().attach(`${scenario}-report.json`, {
    body: JSON.stringify(payload, null, 2),
    contentType: 'application/json',
  });
}

test.describe('web-antd offline tab/form performance', () => {
  test('10+ tab scene', async ({ page }) => {
    const metrics: PerfMetric[] = [];
    await login(page);

    const routes = [
      '/analytics',
      '/system/user',
      '/system/role',
      '/system/menu',
      '/system/dict/type',
      '/infra/job',
      '/infra/config',
      '/infra/file',
      '/crm/customer',
      '/crm/contract',
      '/crm/business',
    ];

    for (const route of routes) {
      await openByHash(page, metrics, route);
    }

    await fillUserSearchForm(page, metrics, 30);

    for (let i = 0; i < 15; i++) {
      await switchTab(page, metrics, '用户管理');
      await switchTab(page, metrics, '参数配置');
      await switchTab(page, metrics, '客户管理');
    }

    await writeReport(page, metrics, 'tabs-10-plus');
  });

  test('20 tab stress scene', async ({ page }) => {
    const metrics: PerfMetric[] = [];
    await login(page);

    const routes = [
      '/analytics',
      '/system/user',
      '/system/role',
      '/system/menu',
      '/system/dict/type',
      '/infra/job',
      '/infra/config',
      '/infra/file',
      '/infra/api-access-log',
      '/infra/api-error-log',
      '/system/notice',
      '/system/post',
      '/system/dept',
      '/system/tenant',
      '/crm/customer',
      '/crm/contract',
      '/crm/business',
      '/crm/contact',
      '/crm/product',
      '/crm/receivable',
      '/crm/receivable-plan',
    ];

    for (const route of routes) {
      await openByHash(page, metrics, route);
    }

    await fillUserSearchForm(page, metrics, 60);

    for (let i = 0; i < 30; i++) {
      await switchTab(page, metrics, '用户管理');
      await switchTab(page, metrics, '定时任务');
      await switchTab(page, metrics, '客户管理');
      await switchTab(page, metrics, '合同管理');
    }

    await writeReport(page, metrics, 'tabs-20-stress');
  });
});
