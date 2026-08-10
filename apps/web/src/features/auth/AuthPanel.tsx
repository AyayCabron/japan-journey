import { useState } from 'react'
import { signIn, signOut, signUp } from './authService'
import { useAuth } from './useAuth'

export function AuthPanel() {
  const { user, isLoading } = useAuth()

  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    setIsSubmitting(true)
    setMessage('')

    try {
      const result =
        mode === 'login'
          ? await signIn({ email, password })
          : await signUp({
              email,
              password,
              displayName,
            })

      if (result.error) {
        setMessage(result.error.message)
        return
      }

      setMessage(
        mode === 'login'
          ? 'Login realizado com sucesso.'
          : 'Cadastro realizado. Verifique seu e-mail se a confirmação estiver habilitada.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleSignOut() {
    await signOut()
  }

  if (isLoading) {
    return <p>Carregando sessão...</p>
  }

  if (user) {
    return (
      <section className="auth-panel">
        <span className="card-label">Sessão</span>
        <h3>Usuário autenticado</h3>
        <p>{user.email}</p>

        <button type="button" onClick={handleSignOut}>
          Sair
        </button>
      </section>
    )
  }

  return (
    <section className="auth-panel">
      <span className="card-label">Conta</span>

      <h3>{mode === 'login' ? 'Entrar' : 'Criar conta'}</h3>

      <form onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <label>
            Nome
            <input
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              required
            />
          </label>
        )}

        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
          Senha
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={6}
            required
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Processando...' : mode === 'login' ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setMode((current) => (current === 'login' ? 'signup' : 'login'))}
      >
        {mode === 'login' ? 'Ainda não tenho conta' : 'Já tenho conta'}
      </button>

      {message && <p>{message}</p>}
    </section>
  )
}
