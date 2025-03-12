import { defineStore } from 'pinia'
import { computed, reactive, toRefs } from 'vue'
import { cities, type City } from '../data/data'

interface IData {
  city: string
  workshop: string
  employee: string
  team: string
  shift: string
}

interface IState {
  city: string
  workshop: string
  employee: string
  team: string
  shift: string
  resultData: IData | null
}

export const useDataStore = defineStore('data', () => {
  const state = reactive<IState>({
    city: '',
    workshop: '',
    employee: '',
    team: '',
    shift: '',
    resultData: null,
  })

  const filteredData = computed((): City[] => {
    const searchValue = (value: string): string => value?.toLowerCase().trim()

    return cities.filter((city) => {
      const coincidencesCity =
        !state.city || searchValue(city.cityName).includes(searchValue(state.city))

      const coincidencesWorkshop =
        !state.workshop ||
        city.workShops.some((workshop) =>
          searchValue(workshop.workshopName).includes(searchValue(state.workshop)),
        )

      const coincidencesEmployee =
        !state.employee ||
        city.workShops.some((workshop) =>
          workshop.teams.some((team) =>
            team.employees.some((employee) =>
              searchValue(employee.employeeName).includes(searchValue(state.employee)),
            ),
          ),
        )

      return coincidencesCity && coincidencesWorkshop && coincidencesEmployee
    })
  })

  return { ...toRefs(state), filteredData }
})
