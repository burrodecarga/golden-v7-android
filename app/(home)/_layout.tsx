import Loading from '@/components/Loading'
import { useUserInfo } from '@/lib/userContext'
import { Stack } from 'expo-router'
import React, { useEffect, useState } from 'react'

const HomeLayout=() => {
    const { session, profile, loading }=useUserInfo()
    const [isAdmin, setIsAdmin]=useState(false)

    //console.log(profile?.role)
    if (loading) {
        return <Loading />
    }

    useEffect(() => {
        if (profile?.role=='admin') {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }, [profile])

    console.log('ES ADMINISTRADO0', isAdmin)
    return (
        <Stack screenOptions={{
        }}>
            <Stack.Protected guard={!isAdmin}>
                <Stack.Screen name='(driver)' options={{ headerShown: false, headerTitleAlign: 'center', }} />
            </Stack.Protected>
            <Stack.Protected guard={isAdmin}>
                <Stack.Screen name='(admin)' options={{ headerShown: false, headerTitleAlign: 'center', }} />
            </Stack.Protected>
        </Stack>
    )
}

export default HomeLayout