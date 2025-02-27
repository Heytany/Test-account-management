<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { Eye, EyeOff } from 'lucide-vue-next'
import { useForwardPropsEmits } from 'radix-vue'
import { ref } from 'vue'

import { Button } from '../button'
import { Input } from '../input'

const props = defineProps<
  {
    modelValue?: string | number
    class?: HTMLAttributes['class']
    defaultValue?: string | number
  }
>()

const emit = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
  (e: 'blur', payload: Event): void
}>()

const modelValue = useVModel(props, 'modelValue', emit, {
  passive: true,
  defaultValue: props.defaultValue,
})

const showPassword = ref(false)

function toggleShowPassword() {
  showPassword.value = !showPassword.value
}

const forwardedProps = useForwardPropsEmits(props, emit)
</script>

<template>
  <div class="relative">
    <Input
      v-bind="forwardedProps"
      v-model="modelValue"
      :class="props.class"
      :type="showPassword ? 'text' : 'password'"
      class="hide-password-toggle pr-10"
    />

    <Button class="absolute right-0 top-0 h-full px-3 py-2" type="button" @click="toggleShowPassword">
      <Eye v-if="showPassword" class="size-4" />
      <EyeOff v-else class="size-4" />
      <span class="sr-only">{{ showPassword ? 'Hide password' : 'Show password' }}</span>
    </Button>
  </div>
</template>

<style>
.hide-password-toggle::-ms-reveal,
.hide-password-toggle::-ms-clear {
  visibility: hidden;
  pointer-events: none;
  display: none;
}
</style>
