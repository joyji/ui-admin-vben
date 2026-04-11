<script lang="ts" setup>
defineOptions({ name: 'UiKitButton' });
</script>

<template>
  <RoFormPage title="按钮类组件" :show-footer="false">
    <RoFormGroup title="按钮类型">
      <div class="demo-row">
        <a-button type="primary">主按钮</a-button>
        <a-button>次级按钮</a-button>
        <a-button type="dashed">虚线按钮</a-button>
        <a-button type="text">文本按钮</a-button>
        <a-button type="link">链接按钮</a-button>
        <a-button danger>危险按钮</a-button>
        <a-button disabled>禁用按钮</a-button>
      </div>
    </RoFormGroup>

    <RoFormGroup title="按钮尺寸">
      <div class="demo-row">
        <a-button type="primary" size="large">大号</a-button>
        <a-button type="primary">中号（默认）</a-button>
        <a-button type="primary" size="small">小号</a-button>
      </div>
    </RoFormGroup>

    <RoFormGroup title="带图标按钮">
      <div class="demo-row">
        <a-button type="primary">
          <template #icon><span class="anticon">＋</span></template>
          新增
        </a-button>
        <a-button>
          <template #icon><span class="anticon">✎</span></template>
          编辑
        </a-button>
        <a-button danger>
          <template #icon><span class="anticon">✕</span></template>
          删除
        </a-button>
      </div>
    </RoFormGroup>

    <RoFormGroup title="Loading 状态">
      <div class="demo-row">
        <a-button type="primary" loading>提交中...</a-button>
        <a-button loading>加载中...</a-button>
      </div>
    </RoFormGroup>

    <RoFormGroup title="按钮组">
      <div class="demo-row">
        <a-button-group>
          <a-button>左</a-button>
          <a-button>中</a-button>
          <a-button>右</a-button>
        </a-button-group>
        <a-button-group>
          <a-button type="primary">保存</a-button>
          <a-button>取消</a-button>
        </a-button-group>
      </div>
    </RoFormGroup>

    <RoFormGroup title="工具栏按钮示例（RoListToolbar 形态预留）">
      <div class="demo-row">
        <a-button type="primary">新增</a-button>
        <a-button>修改</a-button>
        <a-button>权限申请</a-button>
        <a-button>权限移交</a-button>
        <a-button danger>删除</a-button>
        <a-button class="ant-btn-back">特殊事项</a-button>
      </div>
    </RoFormGroup>
  </RoFormPage>
</template>

<style>
.demo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 4px 0 8px;
}
</style>
