import Logo from '@/components/Logo'
import ThemedButton from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import ThemedTextInput from '@/components/ThemedTextInput'
import { logo, primary } from '@/constants/Colors'
import { useThemeColor } from '@/hooks/use-theme-color'
import { supabase } from '@/lib/supabase'
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native'

const RegisterScreen=() => {
  const { height }=useWindowDimensions()
  const backgroundColor=useThemeColor({}, 'background')
  const [loading, setLoading]=useState(false)
  const [username, setUsername]=useState('')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')


  const handleSignup=async (credentials: SignUpWithPasswordCredentials) => {
    if (!("email" in credentials)) return
    setLoading(true)
    const { email, password, options }=credentials
    const { error, data }=await supabase.auth.signUp({
      email,
      password,
      options,
    })

    if (error) Alert.alert(error.message)

    //console.log(data)
    setLoading(false)
    Alert.alert('Crear cuenta a empeado', 'Cuenta creada Correctamente')
    router.push('/')

  }


  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{
          paddingHorizontal: 40,
          backgroundColor: logo,
        }}
      >
        <View style={{ paddingTop: height*0.05 }}>
          <Logo />

          <ThemedText type='subtitle' style={{ borderWidth: 1, padding: 10, borderColor: primary, textAlign: 'center', marginBottom: 10, color: primary }}>GOLDEN RULE CARGO LLC</ThemedText>
          <ThemedText style={{ color: 'gray' }}>Para continuar, por favor ingrese sus datos</ThemedText>
        </View>
        <View
          style={{
            marginTop: 0
          }}
        >
          <ThemedText type="subtitle" style={{ color: primary, textAlign: 'center' }}>Crear cuenta a empleado</ThemedText>

        </View>

        {/* Email y Password */}
        <View style={{ marginTop: 0 }}>
          <ThemedTextInput
            placeholder="Nombre completo"
            autoCapitalize="words"
            icon="person-outline"
            value={username}
            onChangeText={setUsername}
          />

          <ThemedTextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            value={email}
            onChangeText={setEmail}
          />

          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Spacer */}
        <View style={{ marginTop: 10 }} />

        {/* Botón */}
        <ThemedButton icon="reader-outline"
          onPress={() => handleSignup({ email, password, options: { data: { username } } })}
        >Crear cuenta</ThemedButton>

        {/* Spacer */}
        <View style={{ marginTop: 10 }} />
        <ThemedButton icon="backspace-outline"
          onPress={() => router.back()}
        >Cancelar</ThemedButton>

        {/* Enlace a registro */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
export default RegisterScreen
