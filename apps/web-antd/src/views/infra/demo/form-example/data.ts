/**
 * 项目授信信息 — 表单字段定义
 * 对应截图：表单页详情页布局，3 列网格，分组折叠
 *
 * 用法：
 *   import { useProjectCreditFormSchema } from './data';
 *   const [Form, formApi] = useVbenForm({ schema: useProjectCreditFormSchema() })
 */

import type { VbenFormSchema } from '#/adapter/form';

import { z } from '#/adapter/form';

// ─────────────────────────────────────────────
// 枚举常量（实际项目接替换为从字典/接口获取）
// ─────────────────────────────────────────────
export const BUSINESS_DIRECTION_OPTIONS = [
  { label: '医疗', value: 'medical' },
  { label: '创新', value: 'innovation' },
];

export const BUSINESS_TYPE_OPTIONS = [
  { label: '直租', value: 'direct' },
  { label: '回租', value: 'leaseback' },
];

export const BUSINESS_CLASS_OPTIONS = [
  { label: '设备租赁', value: 'equipment' },
  { label: '经营性租赁', value: 'operating' },
];

export const BUSINESS_SUBCLASS_OPTIONS = [
  { label: '医疗器械', value: 'device' },
  { label: '医疗服务', value: 'service' },
];

export const BUSINESS_DETAIL_OPTIONS = [
  { label: 'CT/MRI', value: 'ct' },
  { label: '手术机器人', value: 'robot' },
];

export const FINANCIAL_PRODUCT_OPTIONS = [
  { label: '融资租赁A', value: 'fa' },
  { label: '融资租赁B', value: 'fb' },
];

export const FUND_PURPOSE_OPTIONS = [
  { label: '设备购置', value: 'purchase' },
  { label: '流动资金', value: 'working' },
];

export const RESOLUTION_DOC_OPTIONS = [
  { label: '股东会决议', value: 'shareholder' },
  { label: '董事会决议', value: 'board' },
];

export const SIGN_TYPE_OPTIONS = [
  { label: '线下签约', value: 'offline' },
  { label: '电子签约', value: 'esign' },
];

// ─────────────────────────────────────────────
// 表单 Schema 定义
// 布局规则：
//   - 整体 layout: 'horizontal'，labelWidth: 100
//   - 3 列网格：formItemClass: 'col-span-4'（12 列基准）
//   - 2 列：'col-span-6'，1 列全宽：'col-span-12'
//   - 必填字段：rules: 'required' 或 z.string()...
//   - 只读字段：componentProps: { disabled: true }
//   - 分组标题：component: 'Divider'
// ─────────────────────────────────────────────

/** 基本信息组 */
function baseInfoSchema(): VbenFormSchema[] {
  return [
    // ── 只读字段 ──
    {
      fieldName: 'projectNo',
      label: '项目编号',
      component: 'Input',
      componentProps: {
        disabled: true,
        placeholder: 'XM20231212',
      },
    },
    {
      fieldName: 'projectName',
      label: '项目名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入项目名称',
      },
    },
    // 第三列：项目授信 / 客户用信 Radio
    {
      fieldName: 'creditType',
      label: '项目编号内容区域编',
      component: 'RadioGroup',
      rules: 'required',
      componentProps: {
        options: [
          { label: '项目授信', value: 'project' },
          { label: '客户用信', value: 'customer' },
        ],
      },
    },

    // ── 必填字段 ──
    {
      fieldName: 'lesseeName',
      label: '承租人名称',
      component: 'Input',
      rules: 'required',
      componentProps: {
        placeholder: '请输入承租人名称',
      },
    },
    {
      fieldName: 'lesseeIdNo',
      label: '承租人证件号码',
      component: 'Input',
      rules: 'required',
      componentProps: {
        placeholder: '请输入证件号码',
      },
    },
    {
      fieldName: 'actualController',
      label: '实际控制人',
      component: 'Input',
      rules: 'required',
      componentProps: {
        placeholder: '请输入实际控制人',
      },
    },

    {
      fieldName: 'actualControllerIdNo',
      label: '实际控制人身份证号',
      component: 'Input',
      rules: 'required',
      componentProps: {
        placeholder: '请输入身份证号',
      },
    },
    {
      fieldName: 'evaluationSubject',
      label: '评估主体',
      component: 'Input',
      rules: 'required',
      componentProps: {
        placeholder: '请输入评估主体',
      },
    },
    {
      fieldName: 'evaluationSubjectIdNo',
      label: '评估主体证件号码',
      component: 'Input',
      rules: 'required',
      componentProps: {
        placeholder: '请输入评估主体证件号码',
      },
    },

    {
      fieldName: 'financialProduct',
      label: '金融产品',
      component: 'Select',
      rules: 'required',
      componentProps: {
        options: FINANCIAL_PRODUCT_OPTIONS,
        placeholder: '请选择金融产品',
      },
    },
    {
      fieldName: 'businessType',
      label: '业务类型',
      component: 'Select',
      rules: 'required',
      componentProps: {
        options: BUSINESS_TYPE_OPTIONS,
        placeholder: '请选择业务类型',
      },
    },
    {
      fieldName: 'businessDirectionLarge',
      label: '业务方向(大类)',
      component: 'RadioGroup',
      rules: 'required',
      componentProps: {
        options: BUSINESS_DIRECTION_OPTIONS,
      },
    },

    {
      fieldName: 'businessDirectionSmall',
      label: '业务方向(小类)',
      component: 'Select',
      rules: 'required',
      componentProps: {
        options: BUSINESS_CLASS_OPTIONS,
        placeholder: '请选择业务方向(小类)',
      },
    },
    {
      fieldName: 'projectTotalAmount',
      label: '项目总额(元)',
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入项目总额',
        precision: 2,
        min: 0,
        class: 'w-full',
        formatter: (v: number) =>
          `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      },
    },
    {
      fieldName: 'businessDirectionDetail',
      label: '业务方向(细分)',
      component: 'Select',
      rules: 'required',
      componentProps: {
        options: BUSINESS_DETAIL_OPTIONS,
        placeholder: '请选择业务方向(细分)',
      },
    },

    {
      fieldName: 'fundPurpose',
      label: '资金用途',
      component: 'Select',
      rules: 'required',
      componentProps: {
        options: FUND_PURPOSE_OPTIONS,
        placeholder: '请选择资金用途',
      },
    },
    {
      fieldName: 'medicalLicense',
      label: '医疗机构许可证',
      component: 'RadioGroup',
      rules: 'required',
      componentProps: {
        options: [
          { label: '已获取', value: true },
          { label: '未获取', value: false },
        ],
      },
    },
    {
      fieldName: 'licenseExpireDate',
      label: '许可证到期日',
      component: 'DatePicker',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        valueFormat: 'YYYY-MM-DD',
      },
    },

    {
      fieldName: 'projectSource',
      label: '项目来源',
      component: 'RadioGroup',
      rules: 'required',
      componentProps: {
        options: [
          { label: '自行开发', value: 'self' },
          { label: '渠道推荐', value: 'channel' },
        ],
      },
    },
    {
      fieldName: 'isBusinessSupport',
      label: '是否业务支持项目',
      component: 'RadioGroup',
      rules: 'required',
      componentProps: {
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
    },
    {
      fieldName: 'isAutoContract',
      label: '是否自动出具合同',
      component: 'RadioGroup',
      rules: 'required',
      componentProps: {
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
    },

    {
      fieldName: 'resolutionDocLessee',
      label: '决议类文件-承租人',
      component: 'Select',
      rules: 'required',
      componentProps: {
        options: RESOLUTION_DOC_OPTIONS,
        placeholder: '请选择决议类文件-承租人',
      },
    },
    {
      fieldName: 'signType',
      label: '决议文件签约类型',
      component: 'RadioGroup',
      rules: 'required',
      componentProps: {
        options: SIGN_TYPE_OPTIONS,
      },
    },
    // 占位，保持 3 列对齐
    {
      fieldName: '__placeholder1',
      label: '',
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
  ];
}

/** 风险敞口信息组 */
function riskInfoSchema(): VbenFormSchema[] {
  return [
    // 分组标题
    {
      fieldName: '__divider_risk',
      label: '',
      component: 'Divider',
      formItemClass: 'col-span-12',
      componentProps: {
        orientation: 'left',
        style: { margin: '0 0 8px 0', fontWeight: 600, fontSize: '13px' },
      },
      renderComponentContent: () => '风险敞口信息',
    },

    {
      fieldName: 'projectRisk',
      label: '本项目风险敞口',
      component: 'Input',
      componentProps: {
        placeholder: '敞口内容',
        disabled: true,
      },
    },
    {
      fieldName: 'guaranteeRisk',
      label: '担保风险敞口',
      component: 'Input',
      componentProps: {
        placeholder: '敞口内容',
        disabled: true,
      },
    },
    {
      fieldName: 'creditRisk',
      label: '信审提交时,本项目风险敞口',
      component: 'Input',
      componentProps: {
        placeholder: '敞口内容',
        disabled: true,
      },
    },

    {
      fieldName: 'cumulativeRisk',
      label: '累计风险敞口',
      component: 'Input',
      componentProps: {
        placeholder: '敞口内容',
        disabled: true,
      },
    },
    {
      fieldName: 'remainingRisk',
      label: '剩余风险敞口',
      component: 'Input',
      componentProps: {
        placeholder: '敞口内容',
        disabled: true,
      },
    },
    {
      fieldName: '__placeholder2',
      label: '',
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
  ];
}

/** 完整 schema：将所有分组合并 */
export function useProjectCreditFormSchema(): VbenFormSchema[] {
  return [
    ...baseInfoSchema(),
    ...riskInfoSchema(),
  ];
}

/** 表单默认值（新增时） */
export function getDefaultFormValues() {
  return {
    creditType: 'project',
    projectSource: 'self',
    isBusinessSupport: false,
    isAutoContract: false,
    medicalLicense: false,
    businessDirectionLarge: 'medical',
    signType: 'offline',
  };
}

/** 表单数据类型 */
export interface ProjectCreditForm {
  actualController: string;
  actualControllerIdNo: string;
  businessDirectionDetail: string;
  businessDirectionLarge: string;
  businessDirectionSmall: string;
  businessType: string;
  creditType: 'customer' | 'project';
  cumulativeRisk: string;
  evaluationSubject: string;
  evaluationSubjectIdNo: string;
  financialProduct: string;
  fundPurpose: string;
  guaranteeRisk: string;
  id?: number;
  isAutoContract: boolean;
  isBusinessSupport: boolean;
  lesseeIdNo: string;
  lesseeName: string;
  licenseExpireDate: string;
  medicalLicense: boolean;
  projectName: string;
  projectNo: string;
  projectRisk: string;
  projectSource: string;
  projectTotalAmount: number;
  remainingRisk: string;
  resolutionDocLessee: string;
  signType: string;
}
