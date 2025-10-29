import { Database } from "@/db_types"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"

//const supabaseUrl = Constants?.expoConfig?.extra?.supabaseUrl
//const supabaseAnonKey = Constants?.expoConfig?.extra?.supabaseAnonKey

//const supabaseUrl = 'https://wyyoipavdekpuclixquw.supabase.co'
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5eW9pcGF2ZGVrcHVjbGl4cXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzODM1NTgsImV4cCI6MjAxOTk1OTU1OH0.-qfRh6hZDFwbLvOmL5qWCVIlr7d03LfJunUroCQiMpM'
//const supabaseUrl='https://zpavrsuppzjaekvfchmk.supabase.co'
//const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwYXZyc3VwcHpqYWVrdmZjaG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxNzkxMjcsImV4cCI6MjAzMDc1NTEyN30.a7TRrdIT8e02vD2Z7BdnWMUPsPuGUDTitwilHYIv2qY'

//const supabaseUrl='https://smdhzhtgcttikzruyqtm.supabase.co'
//const supabaseAnonKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtZGh6aHRnY3R0aWt6cnV5cXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNjE3NzMsImV4cCI6MjA2NzYzNzc3M30.qygJtdr8tRzhaRjRcue-FVok9KJ4HXiGbm0mZMucH_o'


const supabaseUrl='https://stxsnrianylaldkorlgy.supabase.co'
const supabaseAnonKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0eHNucmlhbnlsYWxka29ybGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTI1MjAsImV4cCI6MjA2Nzk4ODUyMH0.cTJaqsFWDT5jbfvQjjXrE3-Rd_NSgy-6AffE0b1Vg4U'

export const supabase=createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
