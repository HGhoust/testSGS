<template>
  <div class="main relative h-screen">
    <div
      class="wrapper w-full h-full lg:h-[500px] lg:w-[300px] flex flex-col gap-5 justify-center items-center min-h-min absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 z-10"
    >
      <h2 class="text-center text-2xl">Результат</h2>
      <div class="p-5 flex justify-center items-center bg-slate-300 w-10/12 max-h-10 rounded-xl">
        <h3 class="text-center">{{ dataStore.$state.resultData?.city }}</h3>
      </div>
      <div class="p-5 flex justify-between items-center bg-slate-300 w-10/12 max-h-10 rounded-xl">
        <span>Цех</span>
        <span>{{ dataStore.$state.resultData?.workshop }}</span>
      </div>
      <div class="p-5 flex justify-between items-center bg-slate-300 w-10/12 max-h-10 rounded-xl">
        <span>Сотрудник</span>
        <span>{{ dataStore.$state.resultData?.employee }}</span>
      </div>
      <div class="p-5 flex justify-between items-center bg-slate-300 w-10/12 max-h-10 rounded-xl">
        <span>Бригада</span>
        <span>{{ dataStore.$state.resultData?.team }}</span>
      </div>
      <div class="p-5 flex justify-between items-center bg-slate-300 w-10/12 max-h-10 rounded-xl">
        <span>Смена</span>
        <span>{{ dataStore.$state.resultData?.shift }}</span>
      </div>
      <AppButton class="w-10/12" color="danger" text="Назад" @click="back" />
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/app/router'
import { useDataStore } from '@/entities/store/dataStore'
import AppButton from '@/shared/ui/AppButton.vue'

const dataStore = useDataStore()

const back = () => {
  dataStore.$state.city = ''
  dataStore.$state.employee = ''
  dataStore.$state.shift = ''
  dataStore.$state.team = ''
  dataStore.$state.workshop = ''

  router.push('/')
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
