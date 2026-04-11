<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';
import { useRouter } from 'vue-router';

import './ui-kit-demo.css';

defineOptions({ name: 'UiKitLayout' });

const router = useRouter();

function goBack() {
  router.push('/ui-kit/index');
}
</script>

<template>
  <Page auto-content-height>
    <div class="ui-kit-page">
      <div class="ui-kit-page__inner">
        <header class="ui-kit-page__hero">
          <a-button type="link" class="ui-kit-page__back" @click="goBack">
            <IconifyIcon class="mr-1" icon="lucide:arrow-left" />
            返回组件导航
          </a-button>
          <h1 class="ui-kit-page__title">布局类组件</h1>
          <p class="ui-kit-page__sub">
            栅格、卡片、分割线、间距、Tabs、折叠、描述列表与步骤条等页面结构能力。
          </p>
        </header>

        <div class="ui-kit-stack">
          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">分割线 Divider</h2>
            </header>
            <div class="ui-kit-section__body">
              <p class="ui-kit-muted" style="margin-top: 0">段落一：上方内容</p>
              <a-divider />
              <p class="ui-kit-muted">段落二：默认分割线</p>
              <a-divider dashed />
              <p class="ui-kit-muted">段落三：虚线分割线</p>
              <a-divider orientation="left">带文字（左对齐）</a-divider>
              <p class="ui-kit-muted">段落四</p>
              <a-divider orientation="center">带文字（居中）</a-divider>
              <p class="ui-kit-muted" style="margin-bottom: 0">段落五</p>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">间距 Space</h2>
            </header>
            <div class="ui-kit-section__body">
              <p class="ui-kit-muted" style="margin-top: 0">水平排列</p>
              <a-space>
                <a-button>按钮 1</a-button>
                <a-button>按钮 2</a-button>
                <a-button>按钮 3</a-button>
              </a-space>
              <p class="ui-kit-muted" style="margin-top: 16px">垂直排列</p>
              <a-space direction="vertical" style="width: 100%; max-width: 360px">
                <a-input placeholder="输入框 1" />
                <a-input placeholder="输入框 2" />
                <a-input placeholder="输入框 3" />
              </a-space>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">卡片 Card</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-row :gutter="[16, 16]">
                <a-col :xs="24" :md="8">
                  <a-card title="标准卡片" :bordered="true">
                    <p style="margin: 0; color: rgba(0, 0, 0, 0.65)">卡片内容区域，可放表格、图表、描述等。</p>
                  </a-card>
                </a-col>
                <a-col :xs="24" :md="8">
                  <a-card title="带操作" :bordered="true">
                    <template #extra><a>更多</a></template>
                    <p style="margin: 0; color: rgba(0, 0, 0, 0.65)">带右上角操作的卡片。</p>
                  </a-card>
                </a-col>
                <a-col :xs="24" :md="8">
                  <a-card :bordered="false" style="background: linear-gradient(135deg, #f5f7fa 0%, #eef2f8 100%)">
                    <p style="margin: 0; color: rgba(0, 0, 0, 0.65)">无边框卡片（浅灰底）</p>
                  </a-card>
                </a-col>
              </a-row>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">栅格 Grid</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-row :gutter="8" style="margin-bottom: 8px">
                <a-col v-for="i in 4" :key="i" :span="6">
                  <div class="ui-kit-grid-cell ui-kit-grid-cell--primary">col-6（{{ i }}）</div>
                </a-col>
              </a-row>
              <a-row :gutter="8">
                <a-col v-for="i in 3" :key="i" :span="8">
                  <div class="ui-kit-grid-cell ui-kit-grid-cell--muted">col-8</div>
                </a-col>
              </a-row>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">Tabs 标签页</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-tabs>
                <a-tab-pane key="1" tab="基本信息">
                  <p style="margin: 8px 0 0; color: rgba(0, 0, 0, 0.65)">基本信息面板内容。</p>
                </a-tab-pane>
                <a-tab-pane key="2" tab="风险信息">
                  <p style="margin: 8px 0 0; color: rgba(0, 0, 0, 0.65)">风险信息面板内容。</p>
                </a-tab-pane>
                <a-tab-pane key="3" tab="附件材料">
                  <p style="margin: 8px 0 0; color: rgba(0, 0, 0, 0.65)">附件材料面板内容。</p>
                </a-tab-pane>
                <a-tab-pane key="4" tab="禁用" disabled>
                  <p style="margin: 8px 0 0">禁用面板。</p>
                </a-tab-pane>
              </a-tabs>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">折叠面板 Collapse</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-collapse>
                <a-collapse-panel key="1" header="折叠项一（默认展开）">
                  <p style="margin: 0">折叠项一的内容。</p>
                </a-collapse-panel>
                <a-collapse-panel key="2" header="折叠项二">
                  <p style="margin: 0">折叠项二的内容。</p>
                </a-collapse-panel>
                <a-collapse-panel key="3" header="折叠项三（禁用）" disabled>
                  <p style="margin: 0">禁用项。</p>
                </a-collapse-panel>
              </a-collapse>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">描述列表 Descriptions</h2>
            </header>
            <div class="ui-kit-section__body ui-kit-section__body--flush">
              <div class="ui-kit-pad" style="padding-bottom: 0">
                <a-descriptions bordered :column="{ xs: 1, sm: 2, md: 3 }" size="small">
                  <a-descriptions-item label="客户名称">浙江立泰复合材料股份有限公司</a-descriptions-item>
                  <a-descriptions-item label="证件类型">统一社会信用代码</a-descriptions-item>
                  <a-descriptions-item label="证件号码">91330500751150915T</a-descriptions-item>
                  <a-descriptions-item label="客户类别">承租人</a-descriptions-item>
                  <a-descriptions-item label="所属部门">智造业务部/东南区</a-descriptions-item>
                  <a-descriptions-item label="归属人">陈璐</a-descriptions-item>
                  <a-descriptions-item label="备注" :span="3">
                    这是一段较长的备注说明，用于展示跨列的描述项效果。
                  </a-descriptions-item>
                </a-descriptions>
              </div>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">步骤条 Steps</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-steps :current="1" size="small" style="margin-bottom: 24px">
                <a-step title="提交申请" description="已完成" />
                <a-step title="审核中" description="当前步骤" />
                <a-step title="审批完成" />
                <a-step title="放款" />
              </a-steps>
              <a-steps :current="2" direction="vertical" size="small" style="max-width: 400px">
                <a-step title="提交申请" description="2024-01-01 09:00" status="finish" />
                <a-step title="部门审核" description="2024-01-02 10:30" status="finish" />
                <a-step title="风控审批" description="进行中..." status="process" />
                <a-step title="总裁审批" status="wait" />
              </a-steps>
            </div>
          </section>
        </div>
      </div>
    </div>
  </Page>
</template>

<style scoped>
.ui-kit-grid-cell {
  text-align: center;
  padding: 10px 8px;
  border-radius: 6px;
  font-size: 13px;
}
.ui-kit-grid-cell--primary {
  background: linear-gradient(135deg, rgba(15, 86, 213, 0.12) 0%, rgba(15, 86, 213, 0.06) 100%);
  color: #0f56d5;
  font-weight: 500;
}
.ui-kit-grid-cell--muted {
  background: #f5f7fa;
  color: rgba(0, 0, 0, 0.65);
}
</style>
