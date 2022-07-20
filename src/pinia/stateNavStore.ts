import { defineStore } from 'pinia'

interface NavList {
  id: number
  type: string
  el: null | HTMLDivElement
  loadEl: null | HTMLDivElement
  loadPos?: { top: number, left: number } | null
}

export const StateNavStore = defineStore('StateNavStore', {
  state: () => {
    return {
      navList: [
        {
          id: 0,
          type: 'default',
          el: null,
          loadEl: null,
          loadPos: null
        },
      ] as NavList[],
    }
  },
})