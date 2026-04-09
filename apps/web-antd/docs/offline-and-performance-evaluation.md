# ANTD 离线可用与多 Tab/多表单性能评估

## 一、离线模式（不启动后端）

### 1) 当前实现

- 开关：`apps/web-antd/.env.development`
  - `VITE_OFFLINE_MOCK=true` 时启用离线模式。
- 权限模式切换：`apps/web-antd/src/preferences.ts`
  - 离线模式下 `accessMode='frontend'`，使用前端路由构建菜单与可访问页面。
  - 非离线模式保持 `accessMode='backend'`（现有行为）。
- 请求层 mock：`apps/web-antd/src/api/request.ts`
  - 当请求因后端不可达失败时，优先从 `apps/web-antd/src/mock/offline.ts` 返回 mock 响应。
  - 未覆盖接口返回明确错误：`offline mock not implemented`，并带接口标识，便于后续补齐或排查。
- 已覆盖关键接口：
  - `POST /system/auth/login`
  - `GET /system/auth/get-permission-info`
  - `POST /system/captcha/get`
  - `POST /system/captcha/check`
  - `POST /system/auth/refresh-token`
  - `POST /system/auth/logout`
  - `GET /system/tenant/simple-list`
  - `GET /system/tenant/get-by-website`

### 2) 可移除性

- 该能力为“增量、低侵入”：
  - 关闭 `VITE_OFFLINE_MOCK` 即恢复原有在线逻辑。
  - 删除 `src/mock/offline.ts` 与请求层导入即可彻底移除。

### 3) 使用建议

1. 后端联调：`VITE_OFFLINE_MOCK=false`
2. 前端单机演示：`VITE_OFFLINE_MOCK=true`
3. 若出现“未mock接口”提示，按提示的 method + path 在 `offline.ts` 增补即可。

## 二、默认白天模式

- 覆盖位置：`apps/web-antd/src/preferences.ts`
- 配置：`theme.mode='light'`
- 行为：仅影响“首次初始化默认值”，用户后续在设置中的选择仍会被本地偏好持久化优先。

## 三、10+ Tab / 多表单联动 / 大字段量能力评估

### 1) 已具备能力（代码事实）

- 多 tab 基础能力：`packages/stores/src/modules/tabbar.ts`
  - 支持拖拽、访问历史、缓存更新、标签持久化。
  - `tabbar.maxCount=0` 代表不限制打开数量（理论可 10+）。
  - `tabbar.keepAlive=true` 会缓存页面组件状态，提升回切体验。

### 2) 性能风险点

1. **深层响应式 + 深度 watch**
   - 大对象/大数组在深度侦听下，字段越多，触发成本越高。
2. **联动链同步执行**
   - 表单 A 改动 -> B/C/D 联动，若都在同一事件循环内重算，易造成输入卡顿。
3. **keepAlive 累积**
   - 10~20 个复杂表单页同时缓存时，内存持续增长；如果还包含大表格/富文本，影响更明显。
4. **跨 tab 联动实现方式**
   - 若采用全局 store 全量对象同步，可能导致非当前 tab 也频繁重渲染。

### 3) 压测基线设计（建议）

| 维度 | 级别A | 级别B | 级别C |
| --- | --- | --- | --- |
| 打开 tab 数 | 10 | 15 | 20 |
| 单 tab 字段数 | 100 | 300 | 1000 |
| 联动关系 | 单向 1->N | 双向联动 | 跨 tab 联动 |

关键指标：

- 首次进入页面耗时（TTI）
- 字段输入到 UI 稳定的耗时（P95）
- 联动传播耗时（单次改动触发到全部依赖完成）
- 切换 tab 耗时（冷切/热切）
- 内存峰值与 10 分钟后的稳态内存

### 4) 建议压测方法

1. 使用 Playwright 编写自动化脚本：
   - 批量打开 tab
   - 在关键字段持续输入
   - 执行跨表单、跨 tab 联动动作
2. 浏览器 Performance + Memory 面板采样：
   - 记录长任务（Long Task）与 GC 频次
3. 将结果分离为：
   - 架构瓶颈（watch / store 粒度 / keepAlive 策略）
   - 组件瓶颈（大表单渲染、表格/富文本等重组件）

### 5) 优化优先级（从高到低）

1. 避免深度 watch 全量表单对象，改为“按字段订阅”
2. 将联动计算拆分为批处理（微任务/节流），避免每次输入都全量重算
3. 对非活跃 tab 降级策略：
   - 仅保留关键状态，不保留重组件实例
4. 大字段表单分段渲染（折叠区、虚拟化、按需挂载）
5. 跨 tab 联动用“最小共享状态”而非整个 form model
