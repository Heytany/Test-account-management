<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/toast/use-toast'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'

const props = withDefaults(defineProps<Props>(), {
  types: () => [{ name: 'Локальная', value: 'local' }, { name: 'LDAP', value: 'LDAP' }],
})

const emit = defineEmits({
  delete(payload) {
    return payload
  },
})

const savedType = 'LDAP'

interface Props {
  types?: Array<{ name: string, value: string }>
}

const { toast } = useToast()

const zObj = z.object({
  tags: z.string().min(3).max(50).optional(),
  login: z.string({
    required_error: 'Please fill out login field.',
  }).min(3).max(100),
  password: z.string({
    required_error: 'Please fill out password field.',
  }).min(3).max(100),
  type: z.string({
    required_error: 'Please select an type to display.',
  }),
})

const zObjLDAP = z.object({
  tags: z.string().min(3).max(50).optional(),
  login: z.string({
    required_error: 'Please fill out login field.',
  }).min(3).max(100),
  password: z.string().min(3).max(100).optional(),
  type: z.literal(savedType),
})

const formSchema = toTypedSchema(zObj.or(zObjLDAP))

const selectedType: Ref<string> = ref('')

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: 'You deleted the following account:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
})
</script>

<template>
  <form class="w-1/4 space-y-4 px-3 py-3 rounded-lg border border-black-600" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="tags" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormControl>
          <Input type="text" placeholder="Tag list" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="type" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <Select v-model="selectedType" v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a type of account to display" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="(type, index) in props.types" :key="index" :value="type.value">
                {{ type.name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="login" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormControl>
          <Input type="text" placeholder="Login" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-if="selectedType !== savedType" v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormControl>
          <PasswordInput type="password" placeholder="Password" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button class="w-full" type="submit">
      Submit
    </Button>
    <Button class="w-full" type="button" @click="emit('delete', 'lox')">
      Delete
    </Button>
  </form>
</template>
