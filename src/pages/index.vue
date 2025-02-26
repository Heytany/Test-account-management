<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <h1 class="text-xl font-bold">
        Учетные записи
      </h1>
      <Button variant="outline" class="px-2">
        <i class="font-semibold not-italic text-base">➕</i>
      </Button>
    </div>
    <p class="flex items-center gap-2">
      <i class="font-semibold not-italic text-base">💡</i> Для указания нескольких меток для одной пары логин/пароль используйте разделитель ";"
    </p>
    <AccountForm />
  </div>
</template>
