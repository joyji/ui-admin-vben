<script lang="ts" setup>
defineOptions({ name: 'UiKitLayout' });
</script>

<template>
  <RoFormPage title="布局类组件" :show-footer="false">
    <RoFormGroup title="分割线 Divider">
      <div>
        <p>段落一：上方内容</p>
        <a-divider />
        <p>段落二：默认分割线</p>
        <a-divider dashed />
        <p>段落三：虚线分割线</p>
        <a-divider orientation="left">带文字（左对齐）</a-divider>
        <p>段落四</p>
        <a-divider orientation="center">带文字（居中）</a-divider>
        <p>段落五</p>
      </div>
    </RoFormGroup>

    <RoFormGroup title="间距 Space">
      <div>
        <div style="margin-bottom: 8px">水平间距：</div>
        <a-space>
          <a-button>按钮 1</a-button>
          <a-button>按钮 2</a-button>
          <a-button>按钮 3</a-button>
        </a-space>
        <div style="margin: 12px 0 8px">垂直间距：</div>
        <a-space direction="vertical" style="width: 100%">
          <a-input placeholder="输入框 1" />
          <a-input placeholder="输入框 2" />
          <a-input placeholder="输入框 3" />
        </a-space>
      </div>
    </RoFormGroup>

    <RoFormGroup title="卡片 Card">
      <a-row :gutter="12">
        <a-col :span="8">
          <a-card title="标准卡片" :bordered="true">
            <p>卡片内容区域，可放表格、图表、描述等。</p>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card title="带操作" :bordered="true">
            <template #extra><a>更多</a></template>
            <p>带右上角操作的卡片。</p>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card :bordered="false" style="background: #f5f7fa">
            <p>无边框卡片（灰底）</p>
          </a-card>
        </a-col>
      </a-row>
    </RoFormGroup>

    <RoFormGroup title="栅格 Grid">
      <a-row :gutter="8" style="margin-bottom: 8px">
        <a-col :span="6" v-for="i in 4" :key="i">
          <div style="background: #e6f0ff; text-align: center; padding: 8px; border-radius: 2px">
            col-6（{{ i }}）
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :span="8"><div style="background: #f0f5e6; text-align:center; padding:8px; border-radius:2px">col-8</div></a-col>
        <a-col :span="8"><div style="background: #f0f5e6; text-align:center; padding:8px; border-radius:2px">col-8</div></a-col>
        <a-col :span="8"><div style="background: #f0f5e6; text-align:center; padding:8px; border-radius:2px">col-8</div></a-col>
      </a-row>
    </RoFormGroup>

    <RoFormGroup title="Tabs 标签页">
      <a-tabs>
        <a-tab-pane key="1" tab="基本信息">
          <p style="padding: 8px 0">基本信息面板内容。</p>
        </a-tab-pane>
        <a-tab-pane key="2" tab="风险信息">
          <p style="padding: 8px 0">风险信息面板内容。</p>
        </a-tab-pane>
        <a-tab-pane key="3" tab="附件材料">
          <p style="padding: 8px 0">附件材料面板内容。</p>
        </a-tab-pane>
        <a-tab-pane key="4" tab="禁用" disabled>
          <p style="padding: 8px 0">禁用面板。</p>
        </a-tab-pane>
      </a-tabs>
    </RoFormGroup>

    <RoFormGroup title="折叠面板 Collapse">
      <a-collapse>
        <a-collapse-panel key="1" header="折叠项一（默认展开）">
          <p>折叠项一的内容。</p>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="折叠项二">
          <p>折叠项二的内容。</p>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="折叠项三（禁用）" disabled>
          <p>禁用项。</p>
        </a-collapse-panel>
      </a-collapse>
    </RoFormGroup>

    <RoFormGroup title="描述列表 Descriptions">
      <a-descriptions bordered :column="3" size="small">
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
    </RoFormGroup>

    <RoFormGroup title="步骤条 Steps">
      <a-steps :current="1" size="small" style="margin-bottom: 16px">
        <a-step title="提交申请" description="已完成" />
        <a-step title="审核中" description="当前步骤" />
        <a-step title="审批完成" />
        <a-step title="放款" />
      </a-steps>
      <a-steps :current="2" direction="vertical" size="small" style="max-width: 360px">
        <a-step title="提交申请" description="2024-01-01 09:00" status="finish" />
        <a-step title="部门审核" description="2024-01-02 10:30" status="finish" />
        <a-step title="风控审批" description="进行中..." status="process" />
        <a-step title="总裁审批" status="wait" />
      </a-steps>
    </RoFormGroup>
  </RoFormPage>
</template>
