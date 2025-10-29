import LogoutIconButton from '@/components/LogoutIconButton'
import { Tabs, useSegments } from 'expo-router'
import React from 'react'

const AdminLayout=() => {
    const segment=useSegments()
    return (
        <Tabs screenOptions={{ headerShown: true }}>
            <Tabs.Screen name='(servicios)' options={{ headerShown: true, }} />
            <Tabs.Screen name='(ajustes)' options={{ headerShown: true, }} />
            <Tabs.Screen name='(add)' options={{ headerShown: true }} />
            <Tabs.Screen name='(semanas)' options={{ headerShown: true, headerRight: () => <LogoutIconButton />, }} />

        </Tabs>
    )
}

export default AdminLayout