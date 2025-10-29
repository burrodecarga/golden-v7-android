import Logo from '@/components/Logo'
import ThemedButton from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import ThemedTextInput from '@/components/ThemedTextInput'
import { useThemeColor } from '@/hooks/use-theme-color'
import { supabase } from '@/lib/supabase'
import { SignInWithPasswordCredentials } from '@supabase/supabase-js'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, StyleSheet, useWindowDimensions, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const LoginScreen=() => {
    const { height }=useWindowDimensions()
    const [loading, setLoading]=useState(false)
    const [form, setForm]=useState({
        email: 'chofer1@gmail.com',
        password: '12345678'
    })

    const primary=useThemeColor({}, 'primary')


    const handleLogin=async (credentials: SignInWithPasswordCredentials) => {
        if (!("email" in credentials)) return
        setLoading(true)
        const { email, password }=credentials
        const { error, data }=await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            Alert.alert(error.message)
            setLoading(false)
            return
        }
        if (data.session) {
            console.log('DATA', data)
            router.replace("/")
            setLoading(false)
        }
    }


    const onLogin=async () => {
        const { email, password }=form
        //console.log({ email, password })
        if (email.length===0||password.length===0) {
            return
        }

        setLoading(true)
        handleLogin({ email, password })
        setLoading(false)
    }

    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={{ flex: 1 }}>
            <ScrollView style={{ paddingHorizontal: 40 }}>
                <View style={{ paddingTop: height*0.05 }}>
                    <Logo />

                    <ThemedText type='subtitle' style={{ borderWidth: 1, borderRadius: 5, padding: 10, borderColor: primary, textAlign: 'center', marginBottom: 10, color: primary }}>GOLDEN RULE CARGO LLC</ThemedText>
                    <ThemedText style={{ color: primary }}>Para continuar, por favor ingrese sus datos</ThemedText>
                </View>
                <View style={{ marginTop: 0 }} />
                <ThemedTextInput
                    placeholder='correo electrónico'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    icon='mail-outline'
                    value={form.email}
                    onChangeText={(value) => setForm({ ...form, email: value })}
                />

                <ThemedTextInput
                    placeholder='contraseña'
                    autoCapitalize='none'
                    //secureTextEntry
                    icon='lock-closed-outline'
                    value={form.password}
                    onChangeText={(value) => setForm({ ...form, password: value })}
                />
                <View style={{ marginTop: 10 }} />
                <ThemedButton icon='arrow-forward-circle-outline' onPress={onLogin} >Ingresar</ThemedButton>


                <View style={{ marginTop: 10 }} />

                <ThemedText style={{ fontSize: 11, color: primary, fontWeight: 'bold' }}>ATENCIÓN</ThemedText>
                <ThemedText style={{ fontSize: 11, color: primary }}>Esta aplicación pertenece al Ing. Saro Di Frisco Durant </ThemedText>
                <ThemedText style={{ fontSize: 11, color: primary }}>Esta diseñada para ser usada única y exclusivamente por las personas que el Ing. Saro Di Frisco Durant autorice </ThemedText>
                <View style={{ marginTop: 10 }} />

                <ThemedText style={{ fontSize: 10, color: primary, marginBottom: 10 }}>Desarrollo: Edwin Henriquez, edwinhenriquezh@gmail.com</ThemedText>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen


const styles=StyleSheet.create({})