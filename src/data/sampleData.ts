// Структура данных для отображения в вёрстке (статичные данные)
declare global {
  interface Window {
    globalData: SampleData
  }

  interface SampleData {
    mainPage: MainPage
  }

  interface MainPage {
    accounts: Array<Account>
  }

  interface Account {
    login: string
    password: string
    type: string
    tags: Array<Tag> | ''
  }

  interface TypeItem {
    name: string
    value: string
  }

  interface Tag {
    text: string
  }
}

export default {
  mainPage: {
    accounts: [
      {
        login: 'string',
        password: 'string',
        type: 'string',
        tags: [{ text: 'odin' }],
      },
      {
        login: 'string2',
        password: 'string2',
        type: 'string2',
        tags: [{ text: 'odin' }],
      },
      {
        login: 'string3',
        password: 'string3',
        type: 'string3',
        tags: [{ text: 'odin' }],
      },
    ],
  },
}
