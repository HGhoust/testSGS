import { ref } from 'vue'

interface IKeyboardNavigationOptions {
  length: number
  onEnter?: (index: number) => void
  onEscape?: () => void
  onArrowDown?: () => void
  onArrowUp?: () => void
}

export function useKeyboardNavigation(
  options: IKeyboardNavigationOptions,
  activeIndex = ref<number>(0),
  isActive = ref<boolean>(false),
) {
  // обработчик событий клавиш
  const handleKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (isActive.value) {
          activeIndex.value = (activeIndex.value + 1) % options.length
          options.onArrowDown?.()
        }
        break
      case 'ArrowUp':
        event.preventDefault()
        if (isActive.value) {
          activeIndex.value = (activeIndex.value - 1 + options.length) % options.length
          options.onArrowUp?.()
        }
        break
      case 'Enter':
        event.preventDefault()
        options.onEnter?.(activeIndex.value)
        break
      case 'Escape':
        options.onEscape?.()
        break
    }
  }

  return { handleKeyDown }
}
