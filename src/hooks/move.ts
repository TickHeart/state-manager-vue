import { StateNavStore } from "../pinia/stateNavStore";
import animejs from 'animejs'
import { nextTick, Ref } from "vue";
import anime from "animejs";

export function moveWindowToNav(
  el: HTMLElement,
  item: {
    id: number;
    type: string;
    body: string;
  },
  po: Ref<{ left: string; top: string }>
) {
  const stateNavStore = StateNavStore()
  const findIndex = stateNavStore.navList.findIndex(it => it.type === item.type)

  if (findIndex !== -1) return

  if (stateNavStore.navList.length === 1 && stateNavStore.navList[0].type === 'default') {
    stateNavStore.navList[0].type = item.type
    stateNavStore.navList[0].loadEl = el as HTMLDivElement

  } else {
    stateNavStore.navList.push({
      id: item.id,
      type: item.type,
      el: null,
      loadEl: el as HTMLDivElement,
    })
  }

  function moveEl(item: any) {
    const nav = stateNavStore.navList.find(it => it.type === item.type)!
    const { left, top } = nav.el!.getBoundingClientRect()
    const toPosition = {
      left: left + 10,
      top: top + 10
    }

    console.log(nav.loadPos ? [nav.loadPos.top, toPosition.top] : toPosition.top);


    anime({
      targets: nav.loadEl,
      top: nav.loadPos ? [nav.loadPos.top, toPosition.top] : toPosition.top,
      left: nav.loadPos ? [nav.loadPos.left, toPosition.left] : toPosition.left,
      scale: '0.4',
      rotateY: '-45deg',
      duration: 600,
      easing: 'cubicBezier(.5, .05, .1, .3)',
      complete() {
        nav.loadPos = toPosition
        po.value.left = toPosition.left + 'px'
        po.value.top = toPosition.top + 'px'
      }
    });
  }

  setTimeout(() => {
    stateNavStore.navList.forEach(item => {
      moveEl(item)
    })
  }, 0)




}