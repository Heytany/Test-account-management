<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})

const name = ref('')

function go() {
  console.log(name.value)
}
</script>

<template>
  <div class="flex flex-col items-center justify-items-center gap-1">
    <p>
      <a rel="noreferrer" href="https://github.com/antfu-collective/vitesse-lite" target="_blank">
        Vitesse Lite
      </a>
    </p>
    <p>
      <em class="text-sm">Opinionated Vite Starter Template</em>
    </p>

    <div class="py-4" />

    <Input
      v-model="name"
      placeholder="What's your name?"
      autocomplete="false"
      @keydown.enter="go"
    />

    <div>
      <Button
        :disabled="!name"
        @click="go"
      >
        Click me
      </Button>
    </div>
  </div>
</template>
