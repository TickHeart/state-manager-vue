<script lang='ts' setup>
import { computed, onUnmounted, ref } from 'vue'
import { useDraggable } from '@vueuse/core'
import { } from 'ztshared'
const props = defineProps<{
  body?: string
  index: number
  id: number
  isShadow: boolean
}>()
const emit = defineEmits(['els-down'])
const els = ref<HTMLElement | null>()

const { position } = useDraggable(els, {
  exact: true,
})

const calculationStyle = ref({
  height: '300px',
  width: '300px'
})

const dynamicStyle = computed(() => {
  const { height, width } = calculationStyle.value
  const { index, isShadow } = props
  const style = {
    top: position.value.y + 'px',
    left: position.value.x + 'px',
    height: height,
    width: width,
    zIndex: index,
    boxShadow: isShadow ? '0 0 10px rgba(0,0,0,0.5)' : ''
  }
  if (position.value.y <= 0) {
    style.top = '0px'
  }
  return style
})

const isOk = ref(false)
const elsPosition = {
  x: 0,
  y: 0
}

function close() { }
function narrow() { }

function pointerdown() {
  const { left, top } = els.value!.getClientRects()[0]
  elsPosition.x = left
  elsPosition.y = top
  isOk.value = true
}
function pointerup() {
  isOk.value = false
}

function pointermove(e: PointerEvent) {
  if (!isOk.value) return
  console.log(1);

  const { clientX, clientY } = e
  calculationStyle.value.width = clientX - elsPosition.x + 'px'
  calculationStyle.value.height = clientY - elsPosition.y + 'px'
}

function pointerdownEls() {
  emit('els-down', props.id)
}

addEventListener('pointermove', pointermove)

addEventListener('pointerup', pointerup)

onUnmounted(() => {
  window.removeEventListener('pointermove', pointermove)
  window.removeEventListener('pointerup', pointerup)
})
</script>

<template>
  <div
    :style="dynamicStyle"
    class='min-h-300px min-w-300px bg-red-50 w-500px h-410px rounded-xl cursor-move  absolute overflow-auto pt-10'
    ref="els"
    @pointerdown="pointerdownEls"
  >
    <div class=" bg-blue-300 h-full flex items-center justify-center cursor-auto">
      <div class="text-center text-xl text-white">
        {{ props.body }}
      </div>
    </div>
    <div
      class="w-4 h-4 rounded-full bg-red-400 absolute top-3 left-3 cursor-pointer"
      @click="close"
    ></div>
    <div
      class="w-4 h-4 rounded-full bg-yellow-400 absolute top-3 left-9 cursor-pointer"
      @click="narrow"
    ></div>
    <div
      class="w-2 h-2 bg-blue-300 absolute bottom-0 right-0 cursor-[nwse-resize]"
      @pointerdown="pointerdown"
    ></div>
  </div>
</template>

<style lang='scss' scoped>
</style>
