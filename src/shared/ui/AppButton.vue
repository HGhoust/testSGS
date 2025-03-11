<template>
  <div class="rounded-2xl">
    <button
      class="w-full h-14 px-2 rounded-2xl text-xl"
      :class="[color]"
      :disabled="disabled"
      :type="buttonType"
      @click="onClick"
    >
      {{ text }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'Кнопка',
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  buttonType: {
    type: String as PropType<'button' | 'submit'>,
    default: 'button',
  },
  modelValue: {
    type: Boolean,
    default: true,
    required: false,
  },
  color: {
    type: String,
    default: 'button',
  },
})

const emit = defineEmits(['click'])

const onClick = (): void => {
  if (!props.disabled) emit('click')
}
</script>

<style lang="sass" scoped>
@use '/src/shared/config/styles/variables.sass'

.danger
	background: #f23027
	color: variables.$bgWhite
	transition: all 0.5s
	&:hover
			font-size: 21px

.submit
	background: #14A444
	color: variables.$bgWhite
	transition: all 0.5s
	&:hover
			font-size: 21px

.button
	background: #14A444
	color: #fff
	transition: all 0.5s

	&:hover
		font-size: 21px

	&:disabled
		background: #f8fafc
		color: #64748b
		cursor: not-allowed
</style>
