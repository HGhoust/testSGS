<template>
  <div class="relative" tabindex="0">
    <input
      class="input w-full h-14 px-7 focus:outline-none rounded-xl text-xl"
      ref="selectRef"
      type="text"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
      @click="toggle"
      @keydown="localOptions.handleKeyDown"
      @blur="handleBlur"
    />
    <span class="input--clear" @click="deleteInputValue" v-if="modelValue && isActive"
      >&times;</span
    >
    <ul
      class="list absolute w-full max-h-96 overflow-y-scroll z-10 mt-2 rounded-t-2xl rounded-b-2xl"
      ref="ulElement"
      v-if="isActive && localOptions.options.length"
    >
      <li
        class="h-14 p-2 content-center cursor-pointer rounded-2xl text-xl pl-5"
        :class="{
          keyboard: activeIndex === id && !isHovered,
        }"
        v-for="(item, id) in localOptions.options"
        :key="id"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        @click="(selectOption(id), (selectedItemIndex = id))"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useKeyboardNavigation } from '@/shared/lib/composables/useKeyboardNavigation'
import type { PropType } from 'vue'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Преподаватель',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  options: {
    type: Array as PropType<string[] | number[]>,
    default: () => [],
  },
  inputType: {
    type: String,
    default: 'text',
  },
  password: {
    type: Boolean,
    default: false,
    required: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const activeIndex = ref<number>(0)
const selectedItemIndex = ref<number>(0)
const selectRef = ref<null | HTMLInputElement>(null)
const ulElement = ref<null | HTMLUListElement>(null)
const isActive = ref<boolean>(false)
const isHovered = ref<boolean>(false)

const localOptions = computed(() => {
  const { handleKeyDown } = useKeyboardNavigation(
    {
      length: props.options.length,
      onEnter(index: number) {
        if (props.options.length) {
          !isActive.value ? toggle() : selectOption(index)
        }
      },
      onEscape() {
        isActive.value = false
        activeIndex.value = 0
      },
      onArrowDown() {
        scrollToActiveOption()
      },
      onArrowUp() {
        scrollToActiveOption()
      },
    },
    activeIndex,
    isActive,
  )

  return {
    options: props.options,
    handleKeyDown,
  }
})

const handleBlur = (): void => {
  //что-бы клик успел сработать при закрытии листа при отмене фокуса с элемента
  setTimeout(() => {
    activeIndex.value = 0
    isActive.value = false
  }, 100)
}

// для прокрутки элемента в видимую область при переключении
const scrollToActiveOption = (): void => {
  const activeItem = ulElement.value?.children[activeIndex.value] as HTMLElement
  removeKeyboardClass()

  if (activeItem) {
    activeItem.classList.add('keyboard')
    activeItem.scrollIntoView({
      block: 'nearest',
    })
  }
}

const removeKeyboardClass = (): void => {
  ulElement.value?.querySelectorAll('li').forEach((item) => {
    item.classList.remove('keyboard')
  })
}

const selectOption = (index: number): void => {
  const selectedItem = localOptions.value.options[index]

  emit('update:modelValue', selectedItem)
  isActive.value = false
  activeIndex.value = index
  selectedItemIndex.value = activeIndex.value
}

const deleteInputValue = (): void => {
  emit('update:modelValue', '')
  activeIndex.value = 0
}

const updateValue = (): void => {
  if (selectRef.value) {
    emit('update:modelValue', selectRef.value.value)
  }
}

const toggle = async (): Promise<void> => {
  isActive.value = !isActive.value
  removeKeyboardClass()
  // ожидание следующего обновления DOM
  await nextTick()
  // для scroll и назначения класса исходя из данных в input
  const targetIndex = props.modelValue ? selectedItemIndex.value : activeIndex.value
  const targetItem = ulElement.value?.children[targetIndex]

  targetItem?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
  })
  targetItem?.classList.add('keyboard')
}

const handleClickOutside = (event: MouseEvent): void => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isActive.value = false
  }
}

onMounted((): void => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted((): void => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="sass" scoped>
@use '/src/shared/config/styles/variables.sass'

ul
  background-color: variables.$bgCardWhite
  box-shadow: 5px 5px 20px 0px #CACACC
  color: black

  &::-webkit-scrollbar
    width: 0
    height: 0

li
  &:hover
    background: variables.$bgButtonWhite
    color: black
    border-color: variables.$textDarkBlue

.input
  background-color: variables.$bgInputWhite

  &::-webkit-search-cancel-button
    -webkit-appearance: none

  &--clear
    position: absolute
    cursor: pointer
    font-size: 20px
    top: 50%
    right: 15px
    transform: translateY(-50%)
    background: none
</style>
