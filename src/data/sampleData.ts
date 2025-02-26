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
    tags: Array<Tag>
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
    ],
  },
}
