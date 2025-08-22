// src/shared/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
console.log('🚀 ~ supabaseUrl:', supabaseUrl)
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
console.log('🚀 ~ supabaseAnonKey:', supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
