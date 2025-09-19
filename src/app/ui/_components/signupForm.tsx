'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/form'

/* Shadcn */

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { authClient } from '@/lib/authClients'

const signupSchema = z
  .object({
    name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
    email: z.string().email({ message: 'Email inválido' }),
    username: z.string(),
    matriculation: z.string(),
    branch_id: z.string(),
    access_level: z.string(),
    password: z.string().min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
    confirmPassword: z.string().min(8, { message: 'A confirmação de senha deve ter pelo menos 8 caracteres' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type SignupFormValues = z.infer<typeof signupSchema>

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      username: '',
      matriculation: '',
      branch_id: '',
      access_level: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(formData: SignupFormValues) {

    const branch_id = parseInt(formData.branch_id)
    const access_level = parseInt(formData.access_level)
    const matriculation = parseInt(formData.matriculation)

    const { data, error } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      username: formData.username,
      name: formData.name,
      branch_id: branch_id,
      access_level: access_level,
      matriculation: matriculation,
      callbackURL: '/home',
    }, {
      onRequest: (ctx) => {
        // Show loading
      },
      onSuccess: (ctx) => {
        router.replace('/dashboard')
      },
      onError: (ctx) => {
        alert(ctx.error.message)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
        className='space-y-6 bg-primaria max-w-[377px] rounded-sm border-1 border-secundaria p-4'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder='Seu nome completo' {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='seu@email.com' type='email' {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
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
          name='matriculation'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matrícula</FormLabel>
              <FormControl>
                <Input placeholder='Sua matrícula' type='number' {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className='flex flex-col gap-4 items-center'>
          <FormField
            control={form.control}
            name='branch_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filial</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className='w-[180px] bg-terciaria border-0'>
                      <SelectValue placeholder='Filial'/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='1'>Matriz</SelectItem>
                      <SelectItem value='2'>Faruk</SelectItem>
                      <SelectItem value='3'>Carajás</SelectItem>
                      <SelectItem value='4'>VS10</SelectItem>
                      <SelectItem value='5'>Xinguara</SelectItem>
                      <SelectItem value='6'>DP6</SelectItem>
                      <SelectItem value='7'>Cidade Jardim</SelectItem>
                      <SelectItem value='8'>Canaã</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name='access_level'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nível de Acesso</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className='w-[180px] bg-terciaria border-0'>
                      <SelectValue placeholder='Nível de acesso'/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='1'>Admin</SelectItem>
                      <SelectItem value='2'>TI</SelectItem>
                      <SelectItem value='3'>Gerente</SelectItem>
                      <SelectItem value='4'>Encarregado</SelectItem>
                      <SelectItem value='5'>Fiscal de Caixa</SelectItem>
                      <SelectItem value='6'>Operador(a) de Caixa</SelectItem>
                      <SelectItem value='7'>Estoquista</SelectItem>
                      <SelectItem value='8'>Repositor</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    placeholder='••••••••'
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...field}
                    disabled={isLoading}
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='h-4 w-4 text-muted-foreground' />
                    ) : (
                      <Eye className='h-4 w-4 text-muted-foreground' />
                    )}
                    <span className='sr-only'>{showConfirmPassword ? 'Esconder senha' : 'Mostrar senha'}</span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={isLoading}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Cadastrando...
            </>
          ) : (
            'Cadastrar'
          )}
        </Button>
      </form>
    </Form>
  )
}
