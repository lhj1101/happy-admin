<script setup lang="ts">
import { ref } from 'vue'

import { useCounterStore } from '@/store'
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useCounterStore()
console.log(store);
console.log(store.count); //  count   10
console.log(store.double); // double  10*2=20

</script>

<template>
  123
  <div>
    {{ store.count }}
  </div>
  <div>
    {{store.double  }}
  </div>
  <div>
    <button @click="store.increment">按钮点击调用increment方法</button>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
