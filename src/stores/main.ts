import { defineStore } from 'pinia'

export const useMainPageStore = defineStore('main-page', () => {
  const accounts = ref<Account[]>([])
  const { toast } = useToast()

  function initMainPage(this: any, dataObj: MainPage) {
    for (const key in dataObj) {
      const currentVal = dataObj[key as keyof MainPage]
      this[key] = currentVal
    }
  }

  function manageAccountData(payload: Account) {
    const index = accounts.value.findIndex((account: Account) => account.id === payload?.id)

    if (index !== -1) {
      saveAccount(index, payload)
    }
    else {
      addAccount(payload)
    }
  }

  function saveAccount(index: number, payload: Account) {
    accounts.value.splice(index, 1, payload)
  }

  function addAccount(payload: Account) {
    accounts.value.splice(accounts.value.length, 0, payload)
  }

  function deleteAccount(payload: string) {
    const index = accounts.value.findIndex((account: Account) => account.id === payload)

    if (index !== -1) {
      accounts.value.splice(index, 1)
    }
    else {
      toast({
        title: 'You are trying to delete an account that has not yet been created',
      })
    }
  }

  return {
    initMainPage,
    manageAccountData,
    deleteAccount,
    accounts,
  }
})
