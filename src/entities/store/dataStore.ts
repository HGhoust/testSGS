import { defineStore } from 'pinia'
import { computed, reactive, toRefs } from 'vue'
import { cities } from '../data/data'

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
  resultData: IData | undefined
}

export const useDataStore = defineStore('data', () => {
  const state = reactive<IState>({
    city: '',
    workshop: '',
    employee: '',
    team: '',
    shift: '',
    resultData: undefined,
  })

  const filteredData = computed(() => {
    return cities.filter((city) => {
      const coincidencesCity =
        !state.city || city.cityName.toLowerCase().includes(state.city.toLowerCase())

      const coincidencesWorkshop =
        !state.workshop ||
        city.workShops.some((workshop) =>
          workshop.workshopName.toLowerCase().includes(state.workshop.toLowerCase()),
        )

      const coincidencesEmployee =
        !state.employee ||
        city.workShops.some((workshop) =>
          workshop.teams.some((team) =>
            team.employees.some((employee) =>
              employee.employeeName.toLowerCase().includes(state.employee.toLowerCase()),
            ),
          ),
        )

      return coincidencesCity && coincidencesWorkshop && coincidencesEmployee
    })
  })

  return { ...toRefs(state), filteredData }
})
