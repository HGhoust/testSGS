<template>
  <div class="main relative h-screen">
    <div
      class="wrapper w-full h-full lg:h-[700px] lg:w-[700px] flex flex-col justify-center min-h-min absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 z-10"
    >
      <form
        action=""
        class="px-7 py-9 flex flex-col justify-center gap-5"
        @submit.prevent="submitForm()"
        @keydown.enter="submitForm()"
      >
        <h1 class="text-center text-2xl">Ввод данных</h1>
        <AppInput
          class="flex-1"
          v-model="dataStore.$state.city"
          :options="cities"
          placeholder="Введите город"
          input-type="text"
        />
        <AppInput
          class="flex-1"
          v-model="dataStore.$state.workshop"
          :options="workshops"
          placeholder="Введите Цех"
          input-type="text"
        />
        <AppInput
          class="flex-1"
          v-model="dataStore.$state.employee"
          :options="employee"
          placeholder="Введите сотрудника"
          input-type="text"
        />
        <AppInput
          class="flex-1"
          v-model="dataStore.$state.shift"
          :options="filteredShifts"
          placeholder="Введите смену"
          input-type="text"
        />
        <AppInput
          class="flex-1"
          v-model="dataStore.$state.team"
          :options="filteredTeams"
          placeholder="Введите бригаду"
          input-type="text"
        />
        <AppButton button-type="submit" text="Сохранить данные" :disabled="isFilled" />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cities as citiesData } from '@/entities/data/data'
import { useDataStore } from '@/entities/store/dataStore'
import AppButton from '@/shared/ui/AppButton.vue'
import AppInput from '@/shared/ui/AppInput.vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const dataStore = useDataStore()

const cities = computed(() => dataStore.filteredData?.map((city) => city.cityName))

const workshops = computed(() =>
  dataStore.filteredData?.flatMap(
    (city) => city.workShops?.map((workshop) => workshop.workshopName) || [],
  ),
)

const employee = computed(
  () =>
    dataStore.filteredData?.flatMap(
      (city) =>
        city.workShops?.flatMap(
          (workshop) =>
            workshop.teams?.flatMap(
              (team) => team.employees?.map((employee) => employee.employeeName) || [],
            ) || [],
        ) || [],
    ) || [],
)

const shifts = computed(() => [
  ...new Set(
    citiesData?.flatMap((city) =>
      city.workShops?.flatMap((workshop) => workshop?.teams?.map((team) => team.shift)),
    ),
  ),
])

const filteredShifts = computed(() =>
  shifts.value.filter((shift) =>
    shift.toLowerCase().includes(dataStore.$state.shift.toLowerCase()),
  ),
)

const teams = computed(() =>
  citiesData?.flatMap((city) =>
    city.workShops?.flatMap((workshop) => workshop.teams?.map((team) => team.teamName)),
  ),
)

const filteredTeams = computed(() =>
  teams.value.filter((team) => team.toLowerCase().includes(dataStore.$state.team.toLowerCase())),
)

const isFilled = computed(() => {
  return (
    dataStore.$state.city.length < 2 ||
    dataStore.$state.employee.length < 2 ||
    dataStore.$state.shift.length < 2 ||
    dataStore.$state.team.length < 2 ||
    dataStore.$state.workshop.length < 2
  )
})

const submitForm = () => {
  dataStore.resultData = {
    city: dataStore.$state.city,
    employee: dataStore.$state.employee,
    shift: dataStore.$state.shift,
    team: dataStore.$state.team,
    workshop: dataStore.$state.workshop,
  }
  router.push('/result')
}
</script>

<style scoped lang="sass">
@use '/src/shared/config/styles/variables.sass'

.main
	background-color: variables.$bgWhite

.wrapper
	background-color: variables.$bgCardWhite

@media (min-width: 500px)
.wrapper
	border-radius: 10px
	box-shadow: 5px 5px 20px 1px #9a9999
</style>
