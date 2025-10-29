import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { primary } from '../constants/Colors'
import { supabase } from '../lib/supabase'
const LogoutIconButton=() => {



  return (
    <TouchableOpacity style={{ marginRight: 8 }} onPress={() => supabase.auth.signOut()}>
      <Ionicons name="log-out-outline" size={24} color={primary} />
    </TouchableOpacity>
  )
}
export default LogoutIconButton
