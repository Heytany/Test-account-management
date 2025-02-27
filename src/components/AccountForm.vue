<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast'
import { useMainPageStore } from '@/stores/main'
import { toTypedSchema } from '@vee-validate/zod'
import { Field as FormField, useForm } from 'vee-validate'

import { h } from 'vue'

import * as z from 'zod'

const props = withDefaults(defineProps<Props>(), {
  types: () => [{ name: 'Локальная', value: 'local' }, { name: 'LDAP', value: 'LDAP' }],
  item: () => {
    return { id: '', login: '', password: '', tags: '', type: '' }
  },
})

const emit = defineEmits({
  delete(payload: string | undefined) {
    return payload
  },
  new: null,
})

const savedType = 'LDAP'

interface Props {
  types?: Array<TypeItem>
  item?: Account
}

const { toast } = useToast()

const zObj = z.object({
  tags: z.string().min(3).max(50).optional(),
  login: z.string({
    required_error: 'Please fill out login field.',
  }).min(3).max(100),
  password: z.string({
    required_error: 'Please fill out password field.',
  }).min(3).max(100).nullable(),
  type: z.string().nonempty({ message: 'Please select an type to display.' }),
})

const zObjLDAP = z.object({
  tags: z.string().min(3).max(50).optional(),
  login: z.string({
    required_error: 'Please fill out login field.',
  }).min(3).max(100),
  password: z.string().min(3).max(100).optional().nullable(),
  type: z.literal(savedType, {
    errorMap: () => ({ message: 'You must enter password field to continue' }),
  }),
})

const formSchema = toTypedSchema(zObj.or(zObjLDAP))
const hidePassword: Ref<boolean> = ref(false)

const { isFieldDirty, handleSubmit, setFieldValue, validate } = useForm({
  validationSchema: formSchema,
})

setFieldValue('login', props.item.login)
setFieldValue('password', props.item.password)
setFieldValue('type', props.item.type)
hidePassword.value = props.item.type !== savedType
setFieldValue('tags', props.item.tags?.length
  ? `${(props.item.tags as Tag[]).map((tag: Tag) => {
    return tag.text
  }).join('; ')};`
  : '')

const onSubmit = handleSubmit((values: any) => {
  let id = props.item.id
  const buffer = structuredClone(values)

  if (id === '') {
    id = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    emit('new')
  }

  buffer.id = id

  let tagsBuffer = structuredClone(buffer.tags)

  tagsBuffer = buffer.tags.split(';')

  if (tagsBuffer?.length) {
    buffer.tags
    = tagsBuffer.flatMap((tag: string) => { return tag ? { text: tag } : [] })
  }
  else {
    buffer.tags = ''
  }

  if (buffer.type === savedType) {
    buffer.password = null
  }

  useMainPageStore().saveOrAddAccount(buffer)

  toast({
    title: 'You saved the following account data:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(buffer, null, 2))),
  })
})

async function startSubmit() {
  const { valid } = await validate()

  if (valid) {
    onSubmit()
  }
}

function handleValue(value: any) {
  hidePassword.value = value !== savedType
  startSubmit()
}
</script>

<template>
  <form class="flex-col flex justify-between gap-4 px-3 pt-10 pb-3 rounded-lg border border-black-600" @submit="onSubmit">
    <div class=" space-y-4">
      <FormField v-slot="{ componentField }" name="tags" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <FormControl>
            <Input type="text" placeholder="Tag list" v-bind="componentField" @blur="startSubmit" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="type" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <Select v-bind="componentField" @update:model-value="handleValue" @change="startSubmit">
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
            <Input type="text" placeholder="Login" v-bind="componentField" @blur="startSubmit" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-if="hidePassword" v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <FormControl>
            <PasswordInput type="password" placeholder="Password" v-bind="componentField" @blur="startSubmit" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <div class="space-y-4">
      <Button class="w-full" type="button" @click="emit('delete', item.id)">
        Delete
      </Button>
    </div>
  </form>
</template>
