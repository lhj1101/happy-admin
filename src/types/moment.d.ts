// 导入 Vue 的类型定义
import { ComponentCustomProperties } from 'vue'
// 导入 moment 类型
import moment from 'moment'

// 扩展 Vue 的类型定义
declare module '@vue/runtime-core' {
  // 扩展 ComponentCustomProperties 接口
  // 这个接口用于定义 Vue 组件实例上可用的全局属性
  interface ComponentCustomProperties {
    // 声明 $moment 全局属性
    // typeof moment 表示 $moment 具有与 moment 相同的类型
    // 这样在组件中使用 this.$moment 时就能获得正确的类型提示
    $moment: typeof moment
  }
} 