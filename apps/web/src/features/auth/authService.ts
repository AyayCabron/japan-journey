import { supabase } from '../../services/supabaseClient'

interface SignUpInput {
  email: string
  password: string
  displayName: string
}

interface SignInInput {
  email: string
  password: string
}

export async function signUp({ email, password, displayName }: SignUpInput) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
      },
    },
  })
}

export async function signIn({ email, password }: SignInInput) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export async function signOut() {
  return supabase.auth.signOut()
}

export async function getSession() {
  return supabase.auth.getSession()
}
