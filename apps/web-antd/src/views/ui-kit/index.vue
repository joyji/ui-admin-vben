<script lang="ts" setup>
import { useRouter } from 'vue-router';

defineOptions({ name: 'UiKitIndex' });

const router = useRouter();

interface Category {
  key: string;
  title: string;
  desc: string;
  icon: string;
  path: string;
  items: string[];
}

const categories: Category[] = [
  {
    key: 'button',
    title: '按钮类组件',
    desc: '各类按钮形态、尺寸、图标、加载、分组等用法规范',
    icon: '🖱️',
    path: '/ui-kit/button',
    items: ['类型：主/次/虚线/文本/链接/危险', '尺寸：大/中/小', '图标按钮', 'Loading 状态', '按钮组', '工具栏按钮形态'],
  },
  {
    key: 'form-input',
    title: '文本录入类',
    desc: '输入框、数字框、密码框、搜索框、多行文本及校验状态',
    icon: '✏️',
    path: '/ui-kit/form-input',
    items: ['Input 输入框', '前后缀', '密码/搜索', 'InputNumber 数字框', 'Textarea 多行', '校验状态（成功/错误/校验中）'],
  },
  {
    key: 'form-select',
    title: '选择类组件',
    desc: '下拉选择、级联、单选框、多选框、开关、滑块、评分',
    icon: '🔽',
    path: '/ui-kit/form-select',
    items: ['Select 单/多选', '可搜索 Select', 'Cascader 级联', 'Radio 单选组', 'Checkbox 多选组', 'Switch / Slider / Rate'],
  },
  {
    key: 'datetime',
    title: '时间类组件',
    desc: '日期、时间、日期范围等各类时间选择器',
    icon: '📅',
    path: '/ui-kit/datetime',
    items: ['DatePicker 日期', '月/年/周 选择', '日期 + 时间', 'RangePicker 范围', 'TimePicker 时间', '时间范围'],
  },
  {
    key: 'table',
    title: '表格类组件',
    desc: '列表表格、排序筛选、行选择、展开子表等',
    icon: '📊',
    path: '/ui-kit/table',
    items: ['基础表格', '排序与列筛选', '多选 / 单选行', '固定列 / 横向滚动', '展开子表格', '空数据 / Loading'],
  },
  {
    key: 'dialog',
    title: '弹窗 / 反馈类',
    desc: 'Modal、Drawer、Message、Notification、Alert、Popconfirm',
    icon: '💬',
    path: '/ui-kit/dialog',
    items: ['Modal 普通弹窗', '表单弹窗（新增）', 'Drawer 抽屉', 'Message 全局提示', 'Notification 通知', 'Alert 警告 / Popconfirm'],
  },
  {
    key: 'tree',
    title: '树组件',
    desc: '树形展示、勾选、搜索过滤及树形下拉选择',
    icon: '🌲',
    path: '/ui-kit/tree',
    items: ['Tree 基础树', '可勾选', '搜索过滤', 'TreeSelect 下拉', '多选 / 可勾选 TreeSelect', 'DirectoryTree'],
  },
  {
    key: 'upload',
    title: '上传 / 下载',
    desc: '文件上传、拖拽上传、图片卡片、限制类型、下载触发',
    icon: '📁',
    path: '/ui-kit/upload',
    items: ['Upload 基础上传', '拖拽上传', '图片卡片上传', '限制类型', '禁用状态', '下载按钮示例'],
  },
  {
    key: 'layout',
    title: '布局类组件',
    desc: '栅格、卡片、分割线、间距、Tabs、折叠面板、描述、步骤条',
    icon: '🗂️',
    path: '/ui-kit/layout',
    items: ['Grid 栅格', 'Card 卡片', 'Divider 分割线', 'Space 间距', 'Tabs 标签页', 'Collapse 折叠 / Descriptions / Steps'],
  },
  {
    key: 'feedback',
    title: '反馈 / 展示类',
    desc: '标签、徽标、进度条、加载、空状态、气泡、统计、结果页',
    icon: '📣',
    path: '/ui-kit/feedback',
    items: ['Tag / Badge', 'Progress 进度条', 'Spin 加载', 'Empty 空状态', 'Tooltip / Popover', 'Statistic / Result'],
  },
];

function goDemo(path: string) {
  router.push(path);
}
</script>

<template>
  <Page auto-content-height>
    <div class="ui-kit-home">
      <div class="ui-kit-home__header">
        <h2 class="ui-kit-home__title">基础组件库</h2>
        <p class="ui-kit-home__desc">
          涵盖 10 大类基础组件，可基于这些组件进一步封装业务 Ro 组件。
          点击分类卡片进入对应 Demo 页面。
        </p>
      </div>

      <div class="ui-kit-home__grid">
        <div
          v-for="cat in categories"
          :key="cat.key"
          class="ui-kit-card"
          @click="goDemo(cat.path)"
        >
          <div class="ui-kit-card__icon">{{ cat.icon }}</div>
          <div class="ui-kit-card__content">
            <div class="ui-kit-card__title">{{ cat.title }}</div>
            <div class="ui-kit-card__desc">{{ cat.desc }}</div>
            <ul class="ui-kit-card__items">
              <li v-for="item in cat.items" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div class="ui-kit-card__arrow">›</div>
        </div>
      </div>
    </div>
  </Page>
</template>

<style>
.ui-kit-home {
  padding: 16px;
}

.ui-kit-home__header {
  margin-bottom: 20px;
}

.ui-kit-home__title {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.9);
}

.ui-kit-home__desc {
  margin: 0;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.45);
}

.ui-kit-home__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 12px;
}

.ui-kit-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 2px;
  cursor: pointer;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.ui-kit-card:hover {
  border-color: #0f56d5;
  box-shadow: 0 2px 8px rgba(15, 86, 213, 0.12);
}

.ui-kit-card__icon {
  font-size: 28px;
  line-height: 1;
  flex-shrink: 0;
  padding-top: 2px;
}

.ui-kit-card__content {
  flex: 1;
  min-width: 0;
}

.ui-kit-card__title {
  font-size: 14px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.9);
  margin-bottom: 4px;
}

.ui-kit-card__desc {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  margin-bottom: 8px;
  line-height: 1.6;
}

.ui-kit-card__items {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.ui-kit-card__items li {
  font-size: 11px;
  color: rgba(0, 0, 0, 0.55);
  background: #f5f7fa;
  border-radius: 2px;
  padding: 1px 6px;
  white-space: nowrap;
}

.ui-kit-card__arrow {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
  align-self: center;
  transition: color 0.2s;
}

.ui-kit-card:hover .ui-kit-card__arrow {
  color: #0f56d5;
}
</style>
