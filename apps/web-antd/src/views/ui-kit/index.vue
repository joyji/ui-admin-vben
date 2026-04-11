<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';
import { useRouter } from 'vue-router';

import './ui-kit-demo.css';

defineOptions({ name: 'UiKitIndex' });

const router = useRouter();

interface Category {
  key: string;
  title: string;
  desc: string;
  path: string;
  icon: string;
  accent: string;
  items: string[];
}

const categories: Category[] = [
  {
    key: 'button',
    title: '按钮类组件',
    desc: '类型、尺寸、图标、Loading、按钮组与列表工具栏形态',
    path: '/ui-kit/button',
    icon: 'ant-design:interaction-outlined',
    accent: 'linear-gradient(135deg, #0f56d5 0%, #3d7eef 100%)',
    items: ['主/次/虚线/文本/链接', '尺寸与禁用', '图标按钮', 'Loading', '按钮组', '工具栏'],
  },
  {
    key: 'form-input',
    title: '文本录入类',
    desc: '输入框、数字、密码、搜索、多行文本与校验态',
    path: '/ui-kit/form-input',
    icon: 'ant-design:edit-outlined',
    accent: 'linear-gradient(135deg, #08979c 0%, #14c9c9 100%)',
    items: ['Input', '前后缀', '密码/搜索', '数字', 'Textarea', '校验态'],
  },
  {
    key: 'form-select',
    title: '选择类组件',
    desc: '下拉、级联、单选/多选、开关、滑块与评分',
    path: '/ui-kit/form-select',
    icon: 'ant-design:unordered-list-outlined',
    accent: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)',
    items: ['Select', 'Cascader', 'Radio', 'Checkbox', 'Switch', 'Slider / Rate'],
  },
  {
    key: 'datetime',
    title: '时间类组件',
    desc: '日期、时间、范围选择与各粒度 Picker',
    path: '/ui-kit/datetime',
    icon: 'ant-design:calendar-outlined',
    accent: 'linear-gradient(135deg, #d46b08 0%, #fa8c16 100%)',
    items: ['DatePicker', '月/年/周', '日期时间', 'RangePicker', 'TimePicker', '时间范围'],
  },
  {
    key: 'table',
    title: '表格类组件',
    desc: '排序、筛选、行选择、固定列、展开子表与空态',
    path: '/ui-kit/table',
    icon: 'ant-design:table-outlined',
    accent: 'linear-gradient(135deg, #006d75 0%, #08979c 100%)',
    items: ['排序筛选', '行选择', '固定列', '展开子表', '分页', 'Loading'],
  },
  {
    key: 'dialog',
    title: '弹窗 / 反馈类',
    desc: 'Modal、Drawer、Message、Notification、Popconfirm、Alert',
    path: '/ui-kit/dialog',
    icon: 'ant-design:message-outlined',
    accent: 'linear-gradient(135deg, #c41d7f 0%, #eb2f96 100%)',
    items: ['Modal', '表单弹窗', 'Drawer', 'Message', 'Notification', 'Alert'],
  },
  {
    key: 'tree',
    title: '树组件',
    desc: 'Tree、勾选、过滤、TreeSelect、DirectoryTree',
    path: '/ui-kit/tree',
    icon: 'ant-design:apartment-outlined',
    accent: 'linear-gradient(135deg, #237804 0%, #52c41a 100%)',
    items: ['基础树', '勾选', '过滤', 'TreeSelect', '多选', 'DirectoryTree'],
  },
  {
    key: 'upload',
    title: '上传 / 下载',
    desc: '点击上传、拖拽、图片卡片、类型限制与下载触发',
    path: '/ui-kit/upload',
    icon: 'ant-design:upload-outlined',
    accent: 'linear-gradient(135deg, #10239e 0%, #2f54eb 100%)',
    items: ['基础上传', '拖拽', '图片卡片', '限制类型', '禁用', '下载'],
  },
  {
    key: 'layout',
    title: '布局类组件',
    desc: '栅格、卡片、分割线、间距、Tabs、折叠、描述、步骤条',
    path: '/ui-kit/layout',
    icon: 'ant-design:layout-outlined',
    accent: 'linear-gradient(135deg, #434343 0%, #8c8c8c 100%)',
    items: ['Grid', 'Card', 'Divider', 'Space', 'Tabs', 'Collapse / Steps'],
  },
  {
    key: 'feedback',
    title: '反馈 / 展示类',
    desc: 'Tag、Badge、Progress、Spin、Empty、Tooltip、Statistic、Result',
    path: '/ui-kit/feedback',
    icon: 'ant-design:bell-outlined',
    accent: 'linear-gradient(135deg, #ad4e00 0%, #fa8c16 100%)',
    items: ['Tag', 'Badge', 'Progress', 'Spin', 'Empty', 'Tooltip / Result'],
  },
];

function goDemo(path: string) {
  router.push(path);
}
</script>

<template>
  <Page auto-content-height>
    <div class="ui-kit-page ui-kit-page--home">
      <div class="ui-kit-page__inner">
        <header class="ui-kit-home-hero">
          <div class="ui-kit-home-hero__badge">
            <IconifyIcon icon="ant-design:appstore-outlined" />
            <span>组件演示</span>
          </div>
          <h1 class="ui-kit-home-hero__title">基础组件库</h1>
          <p class="ui-kit-home-hero__desc">
            共 10 个分类，每类独立 Demo 页。可在此基础上封装业务 Ro 组件。
          </p>
          <div class="ui-kit-home-hero__meta">
            <span class="ui-kit-home-hero__pill">Ant Design Vue</span>
            <span class="ui-kit-home-hero__pill">展示优先</span>
            <span class="ui-kit-home-hero__pill">无业务接口</span>
          </div>
        </header>

        <div class="ui-kit-home-grid">
          <button
            v-for="cat in categories"
            :key="cat.key"
            type="button"
            class="ui-kit-home-card"
            @click="goDemo(cat.path)"
          >
            <div class="ui-kit-home-card__accent" :style="{ background: cat.accent }" />
            <div class="ui-kit-home-card__icon-wrap">
              <IconifyIcon :icon="cat.icon" class="ui-kit-home-card__icon" />
            </div>
            <div class="ui-kit-home-card__body">
              <h2 class="ui-kit-home-card__title">{{ cat.title }}</h2>
              <p class="ui-kit-home-card__desc">{{ cat.desc }}</p>
              <ul class="ui-kit-home-card__tags">
                <li v-for="item in cat.items" :key="item">{{ item }}</li>
              </ul>
            </div>
            <IconifyIcon icon="lucide:chevron-right" class="ui-kit-home-card__chevron" />
          </button>
        </div>
      </div>
    </div>
  </Page>
</template>

<style scoped>
.ui-kit-page--home {
  padding-bottom: 48px;
}

.ui-kit-home-hero {
  padding: 28px 0 28px;
  text-align: center;
  max-width: 640px;
  margin: 0 auto 8px;
}

.ui-kit-home-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12px;
  color: #0f56d5;
  background: rgba(15, 86, 213, 0.08);
  border: 1px solid rgba(15, 86, 213, 0.15);
  margin-bottom: 16px;
}

.ui-kit-home-hero__title {
  margin: 0 0 10px;
  font-size: 28px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.88);
  letter-spacing: -0.03em;
}

.ui-kit-home-hero__desc {
  margin: 0 0 16px;
  font-size: 14px;
  line-height: 1.65;
  color: rgba(0, 0, 0, 0.45);
}

.ui-kit-home-hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.ui-kit-home-hero__pill {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.04);
  color: rgba(0, 0, 0, 0.55);
}

.ui-kit-home-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.ui-kit-home-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px 18px 18px 16px;
  text-align: left;
  border: none;
  border-radius: 12px;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 32px rgba(15, 86, 213, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.ui-kit-home-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 16px 40px rgba(15, 86, 213, 0.12);
}

.ui-kit-home-card__accent {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  border-radius: 12px 0 0 12px;
}

.ui-kit-home-card__icon-wrap {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: linear-gradient(145deg, #f0f4fb 0%, #e8eef8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
}

.ui-kit-home-card__icon {
  font-size: 22px;
  color: #0f56d5;
}

.ui-kit-home-card__body {
  flex: 1;
  min-width: 0;
}

.ui-kit-home-card__title {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.88);
}

.ui-kit-home-card__desc {
  margin: 0 0 10px;
  font-size: 12px;
  line-height: 1.55;
  color: rgba(0, 0, 0, 0.45);
}

.ui-kit-home-card__tags {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.ui-kit-home-card__tags li {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(15, 86, 213, 0.06);
  color: rgba(0, 0, 0, 0.55);
}

.ui-kit-home-card__chevron {
  flex-shrink: 0;
  align-self: center;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.2);
  transition: color 0.2s, transform 0.2s;
}

.ui-kit-home-card:hover .ui-kit-home-card__chevron {
  color: #0f56d5;
  transform: translateX(2px);
}
</style>
