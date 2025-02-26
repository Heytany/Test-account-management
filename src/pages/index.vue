<script setup lang="ts" generic="T extends any, O extends any">
import { useToast } from '@/components/ui/toast/use-toast'
import { useMainPageStore } from '@/stores/main'

defineOptions({
  name: 'IndexPage',
})

const { toast } = useToast()
const main = useMainPageStore()
const isRenderNewAccAdding = ref(false)

function deleteAccount(payload: string) {
  console.log(payload)
}

function RenderNewAccAdding() {
  if (isRenderNewAccAdding.value) {
    toast({
      title: 'You already added new account form panel',
    })
  }
  else {
    isRenderNewAccAdding.value = true
  }
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <h1 class="text-xl font-bold">
        Учетные записи
      </h1>
      <Button variant="outline" class="px-2" @click="RenderNewAccAdding">
        <i class="font-semibold not-italic text-base">➕</i>
      </Button>
    </div>
    <p class="flex items-center gap-2">
      <i class="font-semibold not-italic text-base">💡</i> Для указания нескольких меток для одной пары логин/пароль используйте разделитель ";"
    </p>

    <div class="flex flex-wrap gap-2">
      <AccountForm v-for="(account, index) in main.accounts" :key="index" :item="account" class="w-1/4" @delete="deleteAccount" />

      <div v-if="isRenderNewAccAdding" class="relative w-1/4">
        <Button variant="outline" class="px-2 absolute top-0 right-0" @click="isRenderNewAccAdding = false">
          <i class="font-semibold not-italic text-base">➖</i>
        </Button>
        <AccountForm @delete="deleteAccount" />
      </div>
    </div>
  </div>
</template>
