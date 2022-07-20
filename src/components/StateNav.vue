<script lang='ts' setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { StateNavStore } from '../pinia/stateNavStore';
const stateNavStore = StateNavStore()

const navEl = ref<null | HTMLDivElement>(null)

onMounted(() => {
  watch(() => stateNavStore.navList, (val) => {
    nextTick(() => {
      for (let i = 0; i < navEl.value!.children.length; i++) {
        const element = navEl.value!.children[i];
        stateNavStore.navList[i].el = element as HTMLDivElement;
      }
    })
  }, { immediate: true, deep: true })
})
</script>

<template>
  <div
    class='absolute left-0 w-200px h-screen flex flex-wrap flex-col py-10 gap-14 items-center rounded-xl justify-center'
    ref="navEl"
  >
    <div
      class="w-150px h-150px  rounded-xl p-3 hover:scale-105 transition-all"
      v-for="item in stateNavStore.navList"
      :key="item.id"
    >
    </div>
  </div>
</template>

<style lang='scss' scoped>
</style>
