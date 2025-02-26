import { defineStore } from 'pinia'

export const useMainPageStore = defineStore('main-page', () => {
  const account = ref(<Account>{})

  function initMainPage(this: any, dataObj: MainPage) {
    for (const key in dataObj) {
      const currentVal = dataObj[key as keyof MainPage]
      this[key] = currentVal
    }
  }

  return {
    initMainPage,
    account,
  }
})
