# 表单 Skill — AI 高效生成代码提示词模板

> 本模板沉淀了当前项目的表单设计规范，将其作为 System Prompt 或 Cursor Rule 使用，
> AI 可以依据此模板高效、准确地生成符合项目规范的表单代码。

---

## 一、技术栈约定（必须遵守）

```
框架        : Vue 3 + TypeScript + Composition API
表单引擎    : useVbenForm（@vben/common-ui）
表单适配器  : #/adapter/form → useVbenForm, VbenFormSchema, z
UI 库       : Ant Design Vue 5（antd）
布局        : 网格 grid-cols-12，默认 3 列（每列 col-span-4）
字号        : 13px（font-family: "Microsoft YaHei"...）
输入框高度  : 28px（antd token controlHeight=28）
Label 宽度  : 100px，右对齐，无冒号（label::after display:none）
```

---

## 二、文件结构规范

```
src/views/<模块>/<页面>/
├── data.ts        # Schema 定义 + 类型 + 枚举常量 + 默认值
├── index.vue      # 页面容器（Page + Collapse + 操作栏）
└── modules/
    └── form.vue   # 弹窗/抽屉内的表单（useVbenModal + useVbenForm）
```

---

## 三、data.ts 生成提示词（核心 Skill）

将以下内容作为 prompt 前缀发给 AI：

```
你是一个熟悉 Vben Admin 5.x 项目的前端工程师。
请严格按照以下规范生成 data.ts 文件。

【技术约定】
- 导入：import type { VbenFormSchema } from '#/adapter/form'
- 导入：import { z } from '#/adapter/form'
- 每个 fieldName 使用 camelCase
- label 使用中文，简洁准确
- component 类型只能是：
    'Input' | 'InputNumber' | 'InputPassword' | 'Textarea'
  | 'Select' | 'ApiSelect' | 'TreeSelect' | 'ApiTreeSelect' | 'Cascader'
  | 'DatePicker' | 'RangePicker' | 'TimePicker'
  | 'RadioGroup' | 'CheckboxGroup' | 'Switch'
  | 'Divider' | 'Upload' | 'FileUpload'

【布局规则】
- 默认 formItemClass: 'col-span-4'（3 列）
- 2 列宽字段：'col-span-6'
- 全宽字段（如 Textarea/Divider）：'col-span-12'

【必填校验】
- 输入框必填：rules: 'required'
- 选择框必填：rules: 'selectRequired'
- 邮箱格式：rules: z.string().email('邮箱格式不正确').or(z.literal('')).optional()
- 手机号：rules: z.string().regex(/^1[3-9]\d{9}$/, '手机号格式不正确').optional()
- 自定义：rules: z.string().min(1).max(100)

【只读字段】
- componentProps: { disabled: true }
- 如果是详情态，整体 disabled，不需要 rules

【跨字段联动】
- dependencies: { triggerFields: ['fieldA'], show: (values) => !!values.fieldA }
- dependencies: { triggerFields: ['type'], rules: (values) => values.type === 'A' ? z.string().min(1) : z.string().optional() }

【枚举常量】
- 放在 data.ts 顶部，export const XXX_OPTIONS = [{ label, value }]
- options 直接写在 componentProps 中

【分组 Divider】
- component: 'Divider'
- formItemClass: 'col-span-12'
- renderComponentContent: () => '分组标题'

【默认值函数】
- export function getDefaultFormValues() { return { ... } }

【类型定义】
- export interface XxxForm { ... } 放在文件末尾

【输出格式】
- 只输出 TypeScript 代码，不需要解释
- 函数名：use<PageName>FormSchema(): VbenFormSchema[]
```

---

## 四、index.vue（页面容器）生成提示词

```
你是一个熟悉 Vben Admin 5.x 项目的前端工程师。
请严格按照以下规范生成表单详情页 index.vue。

【页面结构】
<Page auto-content-height>
  <template #extra>  ← 页头右侧按钮（弱/次/强）
  <div class="px-4 py-3">
    <a-collapse>     ← 折叠分组，默认展开
      <Form />       ← useVbenForm 渲染
    </a-collapse>
    <底部操作栏>     ← sticky bottom，居中，取消/保存/提交
  </div>
</Page>

【按钮规范（来自视觉手册）】
- 强按钮（主操作）：type="primary"，如"提交"
- 次级按钮（保存）：默认 ant-btn-default，如"保存"
- 弱按钮（次要）：class="ant-btn-back"，如"返回"/"重置"
- 按钮间距：gap-2

【表单配置】
const [Form, formApi] = useVbenForm({
  layout: 'horizontal',
  commonConfig: {
    labelWidth: 100,
    formItemClass: 'col-span-4',
    componentProps: { class: 'w-full' },
  },
  wrapperClass: 'grid-cols-12',
  schema: useXxxFormSchema(),
  showDefaultActions: false,
})

【提交流程】
async function handleSubmit() {
  const { valid } = await formApi.validate()
  if (!valid) return
  // loading 保护
  // 调用 API
  // message.success / emit('success')
}

【输出格式】
- 只输出 Vue SFC 代码
- defineOptions({ name: 'XxxForm' })
- 不引入 axios，API 调用用占位注释
```

---

## 五、modules/form.vue（弹窗表单）生成提示词

```
你是一个熟悉 Vben Admin 5.x 项目的前端工程师。
请严格按照以下规范生成弹窗表单 form.vue。

【弹窗表单模板】
const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: { class: 'w-full' },
    formItemClass: 'col-span-2',  // 2 列弹窗布局
    labelWidth: 80,
  },
  layout: 'horizontal',
  schema: useXxxFormSchema(),
  showDefaultActions: false,
})

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate()
    if (!valid) return
    modalApi.lock()
    const data = await formApi.getValues()
    try {
      await (isEdit ? updateApi(data) : createApi(data))
      await modalApi.close()
      emit('success')
      message.success('操作成功')
    } finally {
      modalApi.unlock()
    }
  },
  async onOpenChange(isOpen) {
    if (!isOpen) { formData.value = undefined; return }
    const data = modalApi.getData<XxxForm>()
    if (!data?.id) return
    modalApi.lock()
    try {
      formData.value = await getApi(data.id)
      await formApi.setValues(formData.value)
    } finally {
      modalApi.unlock()
    }
  },
})

【模板部分】
<template>
  <Modal :title="getTitle" class="w-[600px]">
    <Form class="mx-4" />
  </Modal>
</template>
```

---

## 六、完整表单需求描述模板（直接发给 AI）

在实际使用时，按以下格式描述需求：

```
请按照【表单 Skill】规范，为"<业务名称>"生成表单代码。

【字段列表】
| 字段名(camelCase) | 中文 Label | 组件类型 | 是否必填 | 备注 |
|---|---|---|---|---|
| projectNo | 项目编号 | Input | 否 | 只读 |
| lesseeName | 承租人名称 | Input | 是 | |
| businessType | 业务类型 | Select | 是 | 选项：直租/回租 |
| signDate | 签约日期 | DatePicker | 是 | |
| isAutoContract | 是否自动出具 | RadioGroup | 是 | 是/否 |
| remark | 备注 | Textarea | 否 | 全宽 |

【布局】
- 3 列网格
- 分组：基本信息 / 风险信息

【联动规则】
- businessType = '直租' 时，显示 directField 字段

【生成文件】
- data.ts（schema + 类型 + 默认值）
- index.vue（页面容器 + Collapse + 操作栏）
```

---

## 七、常用字段片段库（直接复制）

### 金额输入
```ts
{
  fieldName: 'amount',
  label: '金额(元)',
  component: 'InputNumber',
  rules: 'required',
  componentProps: {
    placeholder: '请输入金额',
    precision: 2,
    min: 0,
    class: 'w-full',
    formatter: (v: number) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    parser: (v: string) => v.replace(/,/g, ''),
  },
}
```

### 日期范围
```ts
{
  fieldName: 'dateRange',
  label: '日期范围',
  component: 'RangePicker',
  componentProps: {
    class: 'w-full',
    valueFormat: 'YYYY-MM-DD',
    placeholder: ['开始日期', '结束日期'],
  },
}
```

### 联动显示
```ts
{
  fieldName: 'subField',
  label: '子字段',
  component: 'Input',
  dependencies: {
    triggerFields: ['parentField'],
    show: (values) => values.parentField === 'show',
  },
}
```

### 接口选项（ApiSelect）
```ts
{
  fieldName: 'deptId',
  label: '所属部门',
  component: 'ApiTreeSelect',
  rules: 'required',
  componentProps: {
    api: async () => { /* 调用接口 */ },
    labelField: 'name',
    valueField: 'id',
    childrenField: 'children',
    treeDefaultExpandAll: true,
    placeholder: '请选择部门',
  },
}
```

### 全宽 Textarea
```ts
{
  fieldName: 'remark',
  label: '备注',
  component: 'Textarea',
  formItemClass: 'col-span-12',
  componentProps: {
    placeholder: '请输入备注',
    rows: 3,
    maxlength: 500,
    showCount: true,
  },
}
```

### Divider 分组标题
```ts
{
  fieldName: '__divider_risk',
  label: '',
  component: 'Divider',
  formItemClass: 'col-span-12',
  renderComponentContent: () => '风险信息',
  componentProps: {
    orientation: 'left',
    style: { margin: '4px 0 8px', fontWeight: 600, fontSize: '13px' },
  },
}
```

---

## 八、BizFormPage 标准组件（0 CSS 生成页面）

这是最关键的规范：**业务页面无需写任何 CSS**，只需使用以下 4 个全局注册组件。

### 4 个组件

| 组件 | 职责 |
|---|---|
| `<BizFormPage>` | 页面容器：页头标题 + 右上角按钮栏 + 内容区 + 底部 sticky 操作栏 |
| `<BizFormGroup>` | 折叠分组：左侧主色边框、标题、展开/收起 |
| `<BizFormFooter>` | 底部 sticky 操作栏（单独使用时） |
| `<BizActionBar>` | 页头右侧按钮组（单独使用时） |

### BizFormPage Props

| Prop | 类型 | 默认 | 说明 |
|---|---|---|---|
| `title` | string | '' | 页面标题 |
| `loading` | boolean | false | 提交按钮 loading |
| `showBack` | boolean | false | 是否显示页头"返回"弱按钮 |
| `showReset` | boolean | false | 是否显示页头"重置"弱按钮 |
| `showHeaderSave` | boolean | false | 是否在页头显示"保存"按钮 |
| `showHeaderSubmit` | boolean | false | 是否在页头显示"提交"按钮 |
| `showFooter` | boolean | true | 是否显示底部操作栏 |
| `showFooterCancel` | boolean | true | 底部"取消"按钮 |
| `showFooterSave` | boolean | true | 底部"保存"按钮 |
| `showFooterSubmit` | boolean | true | 底部"提交"按钮 |
| `submitText` | string | '提交' | 提交按钮文案 |
| `saveText` | string | '保存' | 保存按钮文案 |

### BizFormPage Slots

| 插槽名 | 说明 |
|---|---|
| `header-prepend` | 页头左侧附加按钮（流程图等） |
| `header-extra` | 页头中央附加按钮（征求意见等） |
| `header-append` | 页头右侧危险操作（否决/作废） |
| `default` | 主内容（放 `<BizFormGroup>` 或直接放 `<Form>`） |
| `footer-start` | 底部左侧弱操作（退回修改等） |
| `footer` | 完全自定义底部按钮 |
| `footer-end` | 底部右侧附加按钮 |

### BizFormPage Events

| 事件 | 说明 |
|---|---|
| `@back` | 返回/取消 |
| `@reset` | 重置 |
| `@save` | 保存 |
| `@submit` | 提交 |

### 0 CSS 最小用法

```vue
<template>
  <BizFormPage
    title="项目授信流程"
    :loading="loading"
    :show-back="true"
    @back="handleBack"
    @save="handleSave"
    @submit="handleSubmit"
  >
    <BizFormGroup title="基本信息">
      <Form />
    </BizFormGroup>
  </BizFormPage>
</template>
```

### 完整用法（对应截图）

```vue
<template>
  <BizFormPage
    title="项目授信流程-江苏医疗器械有限公司"
    :loading="loading"
    :show-back="true"
    submit-text="提交"
    @back="handleBack"
    @save="handleSave"
    @submit="handleSubmit"
  >
    <!-- 页头：流程图 / 征求意见 / 转他人处理 -->
    <template #header-extra>
      <a-button>流程图</a-button>
      <a-button>征求他人意见</a-button>
      <a-button>转他人处理</a-button>
    </template>
    <!-- 页头危险操作 -->
    <template #header-append>
      <a-button danger>否决</a-button>
    </template>

    <!-- 多个折叠分组 -->
    <BizFormGroup title="基本信息">
      <BaseForm />
    </BizFormGroup>
    <BizFormGroup title="风险敞口信息" :default-open="false">
      <RiskForm />
    </BizFormGroup>

    <!-- 底部左侧弱操作 -->
    <template #footer-start>
      <a-button class="ant-btn-back">退回修改</a-button>
    </template>
  </BizFormPage>
</template>
```

### BizFormGroup Props

| Prop | 类型 | 默认 | 说明 |
|---|---|---|---|
| `title` | string | '' | 分组标题 |
| `defaultOpen` | boolean | true | 默认是否展开 |
| `extra` | boolean | false | 是否启用右上角插槽 |

---

## 九、AI 生成 Prompt（加入 Biz 组件后）

### index.vue 生成 Prompt（新版：0 CSS）

```
你是熟悉 Vben Admin 5.x 的前端工程师。
页面使用全局注册的 BizFormPage + BizFormGroup，无需写任何 CSS。

【模板】
<BizFormPage
  title="<页面标题>"
  :loading="loading"
  :show-back="true"
  submit-text="提交"
  @back="handleBack"
  @save="handleSave"
  @submit="handleSubmit"
>
  <!-- 页头附加按钮（可选） -->
  <template #header-extra>
    <a-button>流程图</a-button>
  </template>

  <!-- 一个或多个分组 -->
  <BizFormGroup title="基本信息">
    <Form />
  </BizFormGroup>

  <!-- 底部左侧弱操作（可选） -->
  <template #footer-start>
    <a-button class="ant-btn-back">退回</a-button>
  </template>
</BizFormPage>

【禁止】
- 不写任何 <style> 块
- 不写 padding、sticky、border 等布局样式
- 不手动写 <a-collapse>（用 BizFormGroup 替代）
- 不手动写底部 sticky div（BizFormPage 已内置）
```

## 十、Cursor Rule 配置（`.cursor/rules/form-skill.mdc`）

将以下内容保存为 `.cursor/rules/form-skill.mdc`，让 Cursor AI 在生成表单代码时自动遵守规范：

```markdown
---
description: 表单代码生成规范（Vben Admin 5.x + antd + Biz 组件）
globs:
  - src/views/**/data.ts
  - src/views/**/form.vue
  - src/views/**/index.vue
---

生成表单代码时，严格遵守以下规范：

【页面容器】
- 使用全局注册的 BizFormPage + BizFormGroup，不写任何 <style> 块
- 禁止手动写 padding/sticky/border 等布局类名
- <BizFormPage> 处理页头、内容区、底部 sticky 操作栏
- <BizFormGroup> 处理折叠分组（替代裸 <a-collapse>）

【Schema 规范】
- use<PageName>FormSchema()，导出自 data.ts
- 字段 component 只使用 adapter/component 已注册的类型
- 必填输入框：rules: 'required'，必填选择框：rules: 'selectRequired'
- 3 列布局：formItemClass 'col-span-4'，全宽 'col-span-12'
- 弹窗默认 2 列：formItemClass 'col-span-2'，labelWidth: 80
- 联动：dependencies: { triggerFields, show/rules }
- 枚举常量放 data.ts 顶部并 export
- API 调用写占位注释
- 类型 interface 放 data.ts 末尾

【通用】
- defineOptions({ name: 'XxxForm' })
- 所有处理函数命名 handle<Action>（如 handleSubmit、handleBack）
```
