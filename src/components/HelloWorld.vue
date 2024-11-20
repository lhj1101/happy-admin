<template>
  <div class="hello">
    123
    <div class="count colorblue">
      {{ store.count }}
    </div>
    <div>
      {{store.double  }}
    </div>
    <div>
      <button @click="store.increment">按钮点击调用increment方法</button>
    </div>

    <div class="l-size content">
      123456
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '@/store'
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useCounterStore()
console.log(store);
console.log(store.count); //  count   10
console.log(store.double); // double  10*2=20

</script>


<style scoped lang="scss">
.content{
  // color: $color-red;
  @include font-color;//设置字体颜色
}
.hello{
  // background-color: $color-red;
}
.count{
  @include font-color;//设置字体颜色
  color: blue !important;
}
</style>
