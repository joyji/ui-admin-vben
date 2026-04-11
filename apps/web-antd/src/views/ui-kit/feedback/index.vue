<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import './ui-kit-demo.css';

defineOptions({ name: 'UiKitFeedback' });

const router = useRouter();
const progressVal = ref(60);

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
          <h1 class="ui-kit-page__title">反馈与展示</h1>
          <p class="ui-kit-page__sub">
            标签、徽标、进度、加载、空状态、气泡提示、统计数值与结果页。
          </p>
        </header>

        <div class="ui-kit-stack">
          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">Tag 标签</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-space wrap>
                <a-tag>默认</a-tag>
                <a-tag color="success">成功</a-tag>
                <a-tag color="processing">处理中</a-tag>
                <a-tag color="error">错误</a-tag>
                <a-tag color="warning">警告</a-tag>
                <a-tag color="blue">蓝色</a-tag>
                <a-tag color="cyan">青色</a-tag>
                <a-tag color="#f53f3f">自定义色</a-tag>
                <a-tag closable>可关闭</a-tag>
                <a-checkable-tag checked>可选（选中）</a-checkable-tag>
                <a-checkable-tag>可选（未选）</a-checkable-tag>
              </a-space>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">Badge 徽标</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-space size="large" wrap>
                <a-badge :count="5">
                  <div class="ui-kit-badge-box" />
                </a-badge>
                <a-badge :count="99" :overflow-count="99">
                  <div class="ui-kit-badge-box" />
                </a-badge>
                <a-badge dot>
                  <div class="ui-kit-badge-box" />
                </a-badge>
                <a-badge status="success" text="成功" />
                <a-badge status="error" text="错误" />
                <a-badge status="processing" text="处理中" />
                <a-badge status="warning" text="警告" />
              </a-space>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">Progress 进度条</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-space direction="vertical" style="width: 100%">
                <a-progress :percent="progressVal" />
                <a-progress :percent="progressVal" status="exception" />
                <a-progress :percent="100" />
                <a-row :gutter="24" align="middle">
                  <a-col>
                    <a-progress :percent="progressVal" type="circle" :width="80" />
                  </a-col>
                  <a-col>
                    <a-progress :percent="progressVal" type="dashboard" :width="80" />
                  </a-col>
                  <a-col :flex="1" style="min-width: 200px">
                    <a-slider v-model:value="progressVal" />
                    <span class="ui-kit-muted" style="display: block; margin-top: 4px">
                      拖动调整进度值
                    </span>
                  </a-col>
                </a-row>
              </a-space>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">Spin 加载</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-space size="large" wrap align="start">
                <a-spin size="small" />
                <a-spin />
                <a-spin size="large" />
                <a-spin tip="加载中...">
                  <div class="ui-kit-spin-target">被遮罩的内容区域</div>
                </a-spin>
              </a-space>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">Empty 空状态</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-row :gutter="24">
                <a-col :xs="24" :md="12">
                  <a-empty description="暂无数据" />
                </a-col>
                <a-col :xs="24" :md="12">
                  <a-empty :image="null" description="自定义描述与操作">
                    <a-button type="primary">立即创建</a-button>
                  </a-empty>
                </a-col>
              </a-row>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">Tooltip / Popover</h2>
            </header>
            <div class="ui-kit-section__body">
              <div class="ui-kit-row">
                <a-tooltip title="这是一段提示文字" placement="top">
                  <a-button>Tooltip（顶部）</a-button>
                </a-tooltip>
                <a-tooltip title="底部提示" placement="bottom">
                  <a-button>Tooltip（底部）</a-button>
                </a-tooltip>
                <a-popover title="气泡卡片标题" placement="right">
                  <template #content>
                    <p style="margin: 0 0 8px">这是气泡卡片的内容区域。</p>
                    <p style="margin: 0">可放置更丰富的交互内容。</p>
                  </template>
                  <a-button>Popover</a-button>
                </a-popover>
              </div>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">Statistic 统计数值</h2>
            </header>
            <div class="ui-kit-section__body">
              <a-row :gutter="[16, 16]">
                <a-col :xs="12" :sm="6">
                  <a-statistic title="客户总数" :value="207" />
                </a-col>
                <a-col :xs="12" :sm="6">
                  <a-statistic title="合同金额（万元）" :value="112893" :precision="2" />
                </a-col>
                <a-col :xs="12" :sm="6">
                  <a-statistic
                    title="增长率"
                    :value="11.28"
                    suffix="%"
                    :value-style="{ color: '#00b42a' }"
                  />
                </a-col>
                <a-col :xs="12" :sm="6">
                  <a-statistic
                    title="逾期率"
                    :value="3.72"
                    suffix="%"
                    :value-style="{ color: '#f53f3f' }"
                  />
                </a-col>
              </a-row>
            </div>
          </section>

          <section class="ui-kit-section">
            <header class="ui-kit-section__head">
              <h2 class="ui-kit-section__title">Result 结果页</h2>
            </header>
            <div class="ui-kit-section__body">
              <div class="ui-kit-result-wrap">
                <a-result
                  status="success"
                  title="操作成功"
                  sub-title="数据已保存，可前往列表查看。"
                >
                  <template #extra>
                    <a-button type="primary">返回列表</a-button>
                    <a-button>继续操作</a-button>
                  </template>
                </a-result>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </Page>
</template>

<style scoped>
.ui-kit-badge-box {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(15, 86, 213, 0.15) 0%, rgba(15, 86, 213, 0.05) 100%);
}
.ui-kit-spin-target {
  width: 240px;
  min-height: 88px;
  padding: 16px;
  border-radius: 8px;
  background: #f5f7fa;
  border: 1px dashed rgba(0, 0, 0, 0.08);
}
.ui-kit-result-wrap {
  padding: 8px 16px 16px;
  border-radius: 8px;
  background: linear-gradient(180deg, #fafbfc 0%, #f5f7fa 100%);
  border: 1px solid rgba(0, 0, 0, 0.04);
}
</style>
