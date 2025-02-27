// Структура данных для отображения в вёрстке (статичные данные)
declare global {
  interface Window {
    globalData: SampleData
  }

  interface SampleData {
    mainPage: MainPage
  }

  interface MainPage {
    accounts: Account[]
  }

  interface Account {
    id?: string
    login: string
    password: string | null
    type: string
    tags: Tag[] | string
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
        login: 'IgorHunterXXX',
        password: 'qwerty',
        type: 'local',
        tags: [{ text: 'odin' }],
      },
      {
        id: 'a2',
        login: 'Darius',
        password: null,
        type: 'LDAP',
        tags: [{ text: 'odin' }, { text: 'dva' }],
      },
      {
        id: 'a3',
        login: 'Garen',
        password: 'Spin2Win',
        type: 'local',
        tags: [{ text: 'tri' }, { text: 'dva' }, { text: 'odin' }],
      },
      {
        id: 'a4',
        login: 'Katarina',
        password: 'R2Win',
        type: 'local',
        tags: '',
      },
    ],
  },
}
