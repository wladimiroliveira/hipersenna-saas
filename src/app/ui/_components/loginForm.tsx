'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components//form'
import { clsx } from 'clsx'

import { authClient } from '@/lib/authClients'


const loginSchema = z.object({
  username: z.string({ message: 'Usuário inválido' }),
  password: z.string().min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(formData: LoginFormValues) {
    await authClient.signIn.username({
      username: formData.username,
      password: formData.password,
      callbackURL: '/dashboard',
    }, {
      onRequest: (ctx) => {},
      onSuccess: (ctx) => {
        router.replace('/dashboard')
      },
      onError: (ctx) => {
        if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
          alert('Email ou Senha incorretos')
        }
      }
    })

  }

  async function handleSignInWithGitHub () {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Seu nome de usuário' {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    placeholder='••••••••'
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                    disabled={isLoading}
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4 text-muted-foreground' />
                    ) : (
                      <Eye className='h-4 w-4 text-muted-foreground' />
                    )}
                    <span className='sr-only'>{showPassword ? 'Esconder senha' : 'Mostrar senha'}</span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Entrando...
            </>
          ) : (
            'Entrar'
          )}
        </Button>
      </form>
    </Form>
  )
}
