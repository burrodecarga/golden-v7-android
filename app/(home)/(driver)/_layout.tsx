import LogoutIconButton from '@/components/LogoutIconButton'
import { Tabs } from 'expo-router'
import React from 'react'

const DriverLayout=() => {
    return (
        <Tabs screenOptions={{ headerShown: true, headerRight: () => <LogoutIconButton />, }} />

    )
}

export default DriverLayout