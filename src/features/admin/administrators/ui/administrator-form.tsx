import { Administrator } from '@/src/generated/prisma'
import administratorsService from '@/src/shared/api/services/administrators.service'
import { Form, FormItem, Input } from '@/src/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

const administratorFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
})

type AdministratorFormSchema = z.infer<typeof administratorFormSchema>

interface AdministratorFormProps {
  formId: string
  record?: Administrator
  onLoading: (loading: boolean) => void
  onFinish: (id: number) => void
}

function AdministratorForm(props: AdministratorFormProps) {
  const { formId, record, onLoading, onFinish } = props

  const form = useForm<AdministratorFormSchema>({
    resolver: zodResolver(administratorFormSchema),
    defaultValues: record,
  })

  const handleSubmit = async (data: AdministratorFormSchema) => {
    const response = await administratorsService.createAdministrator({
      name: data.name,
      email: data.email,
      password: data.password,
    })
    console.log('🚀 ~ handleSubmit ~ response:', response)
  }

  return (
    <Form id={formId} form={form} onSubmit={handleSubmit} className="px-4">
      <FormItem name="name" label="이름">
        <Input />
      </FormItem>
      <FormItem name="email" label="이메일">
        <Input />
      </FormItem>
      <FormItem name="password" label="비밀번호">
        <Input />
      </FormItem>
    </Form>
  )
}

export { AdministratorForm }
