type Employee = {
  employeeName: string
}

type Team = {
  teamName: string
  shift: string
  employees: Employee[]
}

type Workshop = {
  workshopName: string
  teams: Team[]
}

export type City = {
  cityName: string
  workShops: Workshop[]
}

export const cities: City[] = [
  {
    cityName: 'Москва',
    workShops: [
      {
        workshopName: 'Цех 1',
        teams: [
          {
            teamName: 'Бригада 1',
            shift: 'Ночная',
            employees: [{ employeeName: 'Сергей' }],
          },
        ],
      },
    ],
  },
  {
    cityName: 'Санкт-Петербург',
    workShops: [
      {
        workshopName: 'Цех 2',
        teams: [
          {
            teamName: 'Бригада 2',
            shift: 'Дневная',
            employees: [{ employeeName: 'Алексей' }, { employeeName: 'Иван' }],
          },
        ],
      },
    ],
  },
  {
    cityName: 'Казань',
    workShops: [
      {
        workshopName: 'Цех 3',
        teams: [
          {
            teamName: 'Бригада 3',
            shift: 'Вечерняя',
            employees: [{ employeeName: 'Мария' }, { employeeName: 'Ольга' }],
          },
        ],
      },
    ],
  },
  {
    cityName: 'Новосибирск',
    workShops: [
      {
        workshopName: 'Цех 4',
        teams: [
          {
            teamName: 'Бригада 4',
            shift: 'Ночная',
            employees: [{ employeeName: 'Дмитрий' }, { employeeName: 'Анна' }],
          },
        ],
      },
    ],
  },
]
