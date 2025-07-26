
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          id: string
          creator: string
          wager: number
          side: 'light' | 'dark'
          status: 'waiting' | 'active' | 'completed'
          opponent: string | null
          result: 'win' | 'lose' | null
          flip_result: 'light' | 'dark' | null
          created_at: string
          completed_at: string | null
          transaction_hash: string | null
        }
        Insert: {
          id?: string
          creator: string
          wager: number
          side: 'light' | 'dark'
          status?: 'waiting' | 'active' | 'completed'
          opponent?: string | null
          result?: 'win' | 'lose' | null
          flip_result?: 'light' | 'dark' | null
          created_at?: string
          completed_at?: string | null
          transaction_hash?: string | null
        }
        Update: {
          id?: string
          creator?: string
          wager?: number
          side?: 'light' | 'dark'
          status?: 'waiting' | 'active' | 'completed'
          opponent?: string | null
          result?: 'win' | 'lose' | null
          flip_result?: 'light' | 'dark' | null
          created_at?: string
          completed_at?: string | null
          transaction_hash?: string | null
        }
      }
    }
  }
}
