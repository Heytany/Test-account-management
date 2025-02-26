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
    id?: string
    login: string
    password: string | null
    type: string
    tags: Array<Tag> | string
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
        id: 'a1',
        login: 'string',
        password: 'string',
        type: 'local',
        tags: [{ text: 'odin' }],
      },
      {
        id: 'a2',
        login: 'string2',
        password: null,
        type: 'LDAP',
        tags: [{ text: 'odin' }, { text: 'odin2' }],
      },
      {
        id: 'a3',
        login: 'string3',
        password: 'string3',
        type: 'local',
        tags: [{ text: 'odin' }],
      },
    ],
  },
}
