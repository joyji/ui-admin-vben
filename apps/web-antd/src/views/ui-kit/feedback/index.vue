<script lang="ts" setup>
import { ref } from 'vue';

defineOptions({ name: 'UiKitFeedback' });

const progressVal = ref(60);
const spinVisible = ref(false);
</script>

<template>
  <RoFormPage title="反馈 / 展示类组件" :show-footer="false">
    <RoFormGroup title="Tag 标签">
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
        <a-checkable-tag checked>可选标签（选中）</a-checkable-tag>
        <a-checkable-tag>可选标签（未选）</a-checkable-tag>
      </a-space>
    </RoFormGroup>

    <RoFormGroup title="Badge 徽标">
      <a-space size="large">
        <a-badge :count="5">
          <div style="width: 40px; height: 40px; background: #e6f0ff; border-radius: 2px" />
        </a-badge>
        <a-badge :count="99" :overflow-count="99">
          <div style="width: 40px; height: 40px; background: #e6f0ff; border-radius: 2px" />
        </a-badge>
        <a-badge dot>
          <div style="width: 40px; height: 40px; background: #e6f0ff; border-radius: 2px" />
        </a-badge>
        <a-badge status="success" text="成功" />
        <a-badge status="error" text="错误" />
        <a-badge status="processing" text="处理中" />
        <a-badge status="warning" text="警告" />
      </a-space>
    </RoFormGroup>

    <RoFormGroup title="Progress 进度条">
      <a-space direction="vertical" style="width: 100%">
        <a-progress :percent="progressVal" />
        <a-progress :percent="progressVal" status="exception" />
        <a-progress :percent="100" />
        <a-progress :percent="progressVal" type="circle" :width="80" />
        <a-progress :percent="progressVal" type="dashboard" :width="80" />
        <div>
          <a-slider v-model:value="progressVal" style="max-width: 300px" />
          <span style="font-size: 12px; color: rgba(0,0,0,0.45)">拖动调整进度值</span>
        </div>
      </a-space>
    </RoFormGroup>

    <RoFormGroup title="Spin 加载中">
      <a-space size="large">
        <a-spin size="small" />
        <a-spin />
        <a-spin size="large" />
        <a-spin tip="加载中...">
          <div style="width: 240px; height: 80px; background: #f5f7fa; border-radius: 2px; padding: 16px">
            被遮罩的内容区域
          </div>
        </a-spin>
      </a-space>
    </RoFormGroup>

    <RoFormGroup title="Empty 空状态">
      <a-space size="large" align="start">
        <a-empty description="暂无数据" />
        <a-empty :image="null" description="自定义描述">
          <a-button type="primary">立即创建</a-button>
        </a-empty>
      </a-space>
    </RoFormGroup>

    <RoFormGroup title="Tooltip / Popover 气泡">
      <a-space>
        <a-tooltip title="这是一段提示文字" placement="top">
          <a-button>Tooltip（顶部）</a-button>
        </a-tooltip>
        <a-tooltip title="底部提示" placement="bottom">
          <a-button>Tooltip（底部）</a-button>
        </a-tooltip>
        <a-popover title="气泡卡片标题" placement="right">
          <template #content>
            <p>这是气泡卡片的内容区域。</p>
            <p>可以放任意元素，比按钮更丰富。</p>
          </template>
          <a-button>Popover</a-button>
        </a-popover>
      </a-space>
    </RoFormGroup>

    <RoFormGroup title="Statistic 统计数值">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-statistic title="客户总数" :value="207" />
        </a-col>
        <a-col :span="6">
          <a-statistic title="合同金额（万元）" :value="112893" :precision="2" />
        </a-col>
        <a-col :span="6">
          <a-statistic title="增长率" :value="11.28" suffix="%" :value-style="{ color: '#00b42a' }" />
        </a-col>
        <a-col :span="6">
          <a-statistic title="逾期率" :value="3.72" suffix="%" :value-style="{ color: '#f53f3f' }" />
        </a-col>
      </a-row>
    </RoFormGroup>

    <RoFormGroup title="Result 结果页">
      <a-space direction="vertical" style="width: 100%" align="center">
        <a-result status="success" title="操作成功" sub-title="数据已保存，可前往列表查看。">
          <template #extra>
            <a-button type="primary">返回列表</a-button>
            <a-button>继续操作</a-button>
          </template>
        </a-result>
      </a-space>
    </RoFormGroup>
  </RoFormPage>
</template>
