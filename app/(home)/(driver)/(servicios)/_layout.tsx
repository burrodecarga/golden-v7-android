import LogoutIconButton from '@/components/LogoutIconButton'
import { Stack } from 'expo-router'
import React from 'react'

const ServiciosLayout=() => {
    return (
        <Stack screenOptions={{ headerShown: false, headerRight: () => <LogoutIconButton />, }} />
    )
}

export default ServiciosLayout