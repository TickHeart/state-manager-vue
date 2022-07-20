<script lang='ts' setup>
import { ref } from 'vue'
import Window from './components/Window.vue';
import { arrayItemToBottom } from './utils/array';

const windows = ref([
  {
    id: 1,
    body: 'qq音乐'
  },
  {
    id: 2,
    body: '网易云音乐'
  }
]);


function elsDown(id: number) {
  arrayItemToBottom(windows, 'id', id)
}

</script>

<template>
  <div class='w-screen h-screen bg-gray-500 bg relative overflow-hidden'>
    <Window
      v-for="(item, index) in windows"
      :body="item.body"
      :key="item.id"
      :index="index"
      :id="item.id"
      @els-down="elsDown"
      :is-shadow="index === windows.length - 1"
    />
  </div>
</template>

<style lang='scss' scoped>
.bg {
  background-image: url(./assets/jd.png);
  background-size: 100vw 100vh;
}
</style>

