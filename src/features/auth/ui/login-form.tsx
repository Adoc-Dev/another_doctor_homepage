'use client'

import LogoIcon from '@/public/icons/logo.svg'
import { useAlertDialog } from '@/src/shared/hooks/alert-dialog.hook'
import {
  Button,
  Card,
  CardContent,
  Form,
  FormItem,
  Input,
} from '@/src/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import z from 'zod'

const loginSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요.'),
  // .regex(emailRegex, '이메일 형식이 올바르지 않습니다.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
  // .regex(passwordRegex, '비밀번호 형식이 올바르지 않습니다.'),
})

type LoginFormValues = z.infer<typeof loginSchema>

function LoginForm() {
  const router = useRouter()
  const alertDialog = useAlertDialog()

  const [isPending, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = async (values: LoginFormValues) => {
    startTransition(async () => {
      try {
        const result = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
          callbackUrl: '/admin/dashboard',
        })

        if (result?.ok) {
          router.push('/admin/dashboard')
        } else {
          alertDialog.open({
            title: '로그인 실패',
            description: '아이디 또는 비밀번호가 올바르지 않습니다.',
          })
        }
      } catch (error) {
        console.error('로그인 중 오류 발생:', error)
        form.setError('root', { message: '로그인 중 오류가 발생했습니다.' })
      }
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden border-gray-200 p-0">
        <CardContent className="grid min-h-[500px] p-0 md:grid-cols-2">
          <div className="relative hidden items-center justify-center border-r border-gray-200 bg-gray-200 md:flex">
            <LogoIcon className="h-12" />
          </div>
          <Form
            form={form}
            onSubmit={handleSubmit}
            className="flex flex-col p-6"
          >
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-2xl font-bold">WELCOME</h1>
            </div>

            <FormItem
              name="email"
              className="gap-y-1"
              label="Email"
              labelClassName="mb-2"
            >
              <Input type="email" className="border-gray-200" />
            </FormItem>

            <FormItem
              name="password"
              className="gap-y-1"
              label="Password"
              labelClassName="mb-2"
            >
              <Input type="password" className="border-gray-200" />
            </FormItem>

            {form.formState.errors.root && (
              <div className="mt-2 rounded-md bg-red-50 p-2 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                {form.formState.errors.root.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              loading={isPending}
              className={`bg-foreground text-body-03 mt-auto w-full rounded-lg text-white ${
                form.formState.isSubmitting
                  ? 'cursor-not-allowed opacity-70'
                  : ''
              }`}
            >
              {form.formState.isSubmitting ? '로그인 중...' : '로그인'}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export { LoginForm }
