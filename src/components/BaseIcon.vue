<script setup lang="ts">
import { useAttrs } from 'vue'
import { ICONS } from '../icons'
import type { IconName } from '../types'

defineProps<{ name: IconName }>()
// const props = defineProps<{
//   name: IconName
//   class?: string // classプロパティが文字列であることを明示
// }>()

const attrs = useAttrs()
// class属性が文字列の場合、明示的に型を指定
const className: string = (attrs.class as string) || 'h-8'
</script>

<template>
  <component :is="ICONS[name]" :class="className" />
</template>

<!-- <component :is="ICONS[name]" :class="$attrs.class || 'h-8'" /> -->
